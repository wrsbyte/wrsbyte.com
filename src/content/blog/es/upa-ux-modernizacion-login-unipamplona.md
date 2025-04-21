---
title: "UPA UX: Modernización del Login en el Vortal Unipamplona"
date: 2025-04-20
views: 1245
translations:
  en: upa-ux-modernization-login-unipamplona
  es: upa-ux-modernizacion-login-unipamplona
---

## **Introducción**

La transformación de [sistemas heredados](https://wikipedia.org/wiki/Sistema_heredado) es uno de los desafíos más recurrentes en ingeniería de software y que regularmente encamina a tres soluciones por parte de los usuarios: la primera es dejar de usar el sistema ([Ver ley de Jakobs](https://lawsofux.com/jakobs-law/)) (en este caso no es posible, ya que no hay una web alternativa); la segunda, en la que el usuario se resigna en su uso; y la tercera, que es la más interesante, es la de modernizar el sistema. En este artículo, me enfocaré en la tercera opción, que es la que elegí para el **Vortal de la Universidad de Pamplona**.

El [Vortal de la Universidad de Pamplona](https://hermesoft.unipamplona.edu.co/unipamplona/hermesoft/vortal/iniciarSesion.jsp), basado en tecnologías Web Java como [JSP](https://www.ibm.com/docs/es/dmrt/9.5.0?topic=files-javaserver-pages-jsp-technology), continúa en producción pese a sus limitaciones en usabilidad y mantenimiento.

En este artículo describo cómo diseñé e implementé **[UPA UX](https://chromewebstore.google.com/detail/upa-ux/cbkhjckelimkbkmofdjjoekoimhgkkne)**, una extensión de código abierto para Google Chrome, que moderniza el proceso de autenticación sin modificar el backend.

A lo largo del blog encontrará enlaces a recursos externos ([MDN Web Docs](https://developer.mozilla.org), [Guía de Extensiones de Chrome](https://developer.chrome.com/docs/extensions/), [React](https://reactjs.org/) y [TypeScript](https://www.typescriptlang.org/)) y snippets de código que ilustran cada fase.

- [Problemática](#problemática)
- [Prototipo con Vanilla JavaScript](#prototipo-con-vanilla-javascript)
- [Arquitectura React y modularización](#arquitectura-react-y-modularización)
- [Despliegue en producción](#despliegue-en-producción)
- [Conclusiones y próximos pasos](#conclusiones-y-próximos-pasos)

---

## Problemática

El entorno académico de la [Universidad de Pamplona](https://www.unipamplona.edu.co/) depende de un portal antiguo (Hermesoft/Academusoft) construido con JavaServer Pages (JSP), de renderizado de multi página con la etiqueta [`<frame>`](https://developer.mozilla.org/en/docs/Web/HTML/Reference/Elements/frame) y [`<frameset>`](https://developer.mozilla.org/en/docs/Web/HTML/Reference/Elements/frameset) y que cuenta con una experiencia de usuario (UX) que deja mucho que desear.

> **Nota**: Los frame y frameset's eran útiles para segregar el contenido de una página web en diferentes secciones, pero hoy en día son considerados obsoletos y no recomendados para su uso. [Ver la siguiente discusión](https://stackoverflow.com/questions/25554594/do-web-developers-still-use-framesets).

Este sistema implementa un teclado virtual con 37 celdas donde las letras se mapean a números aleatorios en cada sesión. El usuario debe ingresar su contraseña con el teclado virtual reemplazando cada letra por su número correspondiente.

![Vortal original de Unipamplona](/images/blog/unipamplona-vortal-original.png)

Aun cuando este mecanismo ofrece protección contra [keyloggers](https://wikipedia.org/wiki/Keylogger) de bajo nivel, genera una **experiencia de usuario deficiente** y dificulta la adopción de gestores de contraseñas modernos.

Además, la ausencia de atributos como [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete) impide la integración con extensiones de gestión de credenciales. El mantenimiento del código JSP resulta costoso y propenso a errores al intentar incorporar mejoras visuales.

De este modo, el reto técnico consistía en:

1. **Mantener el backend inalterado**.
2. **Preservar la codificación dinámica** de caracteres a números.
3. **Mejorar la usabilidad** sin sacrificar seguridad.
4. **No interferir con el normal funcionamiento del sistema**.

---

## Prototipo con Vanilla JavaScript

La [primera versión](https://github.com/wrsbyte/Extension-Login-Unipamplona) era simple: un popup que pedía usuario y contraseña, y luego inyectaba los números correspondientes en los campos del formulario JSP.

Mantenía la web original y el teclado virtual, pero daba la posibilidad de ingresar la contraseña en texto plano a través del formulario de la extensión. No era necesario inyectar contenido en el [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model).

Para lograr esto, empleé tecnologías web fundamentales como JavaScript, junto con HTML y CSS para construir la interfaz de un popup simple activado por el usuario.

La interacción con la página del Vortal la realicé a través de las [APIs de extensiones de Chrome](https://developer.chrome.com/docs/extensions/reference/api?hl=es-419), con manifiestos v2.

Por un lado, cargué un script de fondo que se encargaba de escuchar los eventos de instalación y activación de la extensión. Al detectar que el usuario accedía a la página del Vortal, se activaba la extensión y se mostraba el popup. Este script de fondo también gestionaba la configuración de las páginas a las que tenía acceso la extensión.

`js/background.js`

```javascript
/**
 * El script de fondo sirve como oyente de eventos en segundo plano.
 * Permite configurar las páginas a las cuales tiene acceso la extensión.
 */
chrome.runtime.onInstalled.addListener(function () {
    // Elige cuando se debe activar la extension
     chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'hermesoft.unipamplona.edu.co' },
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
     }); 

}); 
```

Y por otro lado, implementé un script de contenido que se inyectaba en la página del Vortal para interactuar con el DOM. Este [Content Script](https://developer.chrome.com/docs/extensions/reference/manifest/content-scripts?hl=es-419) era el encargado de realizar el análisis del DOM para extraer el mapeo letra-número, traducir la contraseña proporcionada por el usuario desde el popup, y finalmente simular los eventos click necesarios sobre los elementos del teclado numérico virtual original para poblar el campo de contraseña.

`js/contentScript.js`

```javascript
/**
 * Determina las claves y valores correspondientes a cada letra de la tabla.
 * @returns {*} dicc: Diccionario con las claves y valores.
 */
function search() {
    const itemsCount = 37;
    var dicc = [];
    for (var i = 0; i < itemsCount; i++) {
        textInput = mainFrame.document.getElementsByClassName("fondo_celda_5 text_letras")[i].innerHTML;
        numberImput = mainFrame.document.getElementsByClassName("fondo_celda_3 text_num")[i].innerHTML;
        dicc[textInput] = numberImput;
    }
    return dicc;
}

...
```

Los resultados de esta fase demostraron la factibilidad técnica de la automatización, eliminando la necesidad de la interacción manual del usuario con el teclado numérico. Sin embargo, esta aproximación presentó limitaciones significativas. La principal fue su fragilidad, ya que dependía estrictamente de la estructura específica del DOM del Vortal; cualquier cambio en las clases CSS o la disposición de los elementos HTML del teclado virtual podría inutilizar la extensión.

Además, la experiencia de usuario seguía siendo parcial, pues al mantener la entrada de contraseña en un popup desacoplado, no se resolvía la incompatibilidad con los gestores de contraseñas que requieren campos de entrada estándar directamente en la página. Finalmente, la interfaz del popup era rudimentaria y no ofrecía una experiencia integrada. El código fuente de esta versión se encuentra [disponible en GitHub](https://github.com/wrsbyte/Extension-Login-Unipamplona).

---

## Arquitectura React y modularización

Ante las limitaciones identificadas en la v1, opté por un rediseño completo con el objetivo de reemplazar integralmente la interfaz de usuario del login original por una solución moderna, manteniendo la compatibilidad con el backend existente del Vortal.

Mi objetivo técnico fue implementar una interfaz de usuario basada en React que capturara las credenciales en campos estándar, ocultara la interfaz original, y gestionara la traducción y envío de las credenciales de forma transparente, habilitando así el uso nativo de gestores de contraseñas.

Aproveché para incorporar una arquitectura de software basada en monorepos. Un paquete para el API y otro para la extensión web. La estructura del proyecto la organicé de la siguiente manera:

```bash
├───apps
│   ├───api
│   │   ├───api
│   │   └───src
│   │       ├───config
│   │       └───routes
│   └───web-extension
│       ├───public
│       │   └───icons
│       └───src
│           └───contexts
│               ├───authentication
│               │   ├───application
│               │   │   └───useCases
│               │   ├───infrastructure
│               │   │   ├───api
│               │   │   └───web
│               │   └───presentation
│               │       ├───components
│               │       ├───pages
│               │       └───types
│               └───home
│                   ├───application
│                   └───infrastructure
│                       └───web
├───README.md
├───package.json
├───tsconfig.json
```

Las tecnologías que seleccioné para esta fase incluyeron [React](https://react.dev)/[Typescript](https://www.typescriptlang.org/) como librerías principales para construir una interfaz de usuario declarativa, componentizada y eficiente, facilitando un desarrollo más ágil y mantenible. El estilizado de la interfaz React lo implementé mediante [tailwindcss](https://tailwindcss.com/). Las APIs de Extensiones de Chrome, fundamentalmente los [Content Script](https://developer.chrome.com/docs/extensions/reference/manifest/content-scripts?hl=es-419), con manifiestos v3, fueron cruciales para la interacción con el DOM y la modificación del comportamiento de la página.

`Main.ts`

```typescript
import LoadingTargetCreator from '../infrastructure/web/LoadingTargetCreator'
import UnipamplonaVortalLoadListener from '../infrastructure/web/UnipamplonaVortalLoadListener'
import CreateReactApp from '../presentation/CreateReactApp'

export default class Main {
  private readonly _unipamplonaVortalLoadListener: UnipamplonaVortalLoadListener
  private readonly _createReactApp: CreateReactApp
  private readonly _loadingTargetCreator: LoadingTargetCreator

  constructor () {
    this._unipamplonaVortalLoadListener = new UnipamplonaVortalLoadListener()
    this._createReactApp = new CreateReactApp()
    this._loadingTargetCreator = new LoadingTargetCreator()
  }

  async start () {
    const loadingPageId = 'unipamplona-vortal-loading-page'
    const loadingBodyId = `${loadingPageId}-body`
    const loginPageId = 'unipamplona-vortal-login-page'

    const document = this._loadingTargetCreator.create({
      appId: loadingBodyId
    })

    this._createReactApp.render({
      targetDocument: document,
      page: 'loading',
      appId: loadingPageId
    })

    const frames = await this._unipamplonaVortalLoadListener.getWindowFrames()
    if (frames == null) {
      return
    }

    this._createReactApp.render({
      targetDocument: frames.documentFrame,
      page: 'login',
      appId: loginPageId
    })

    this._loadingTargetCreator.remove({ appId: loadingBodyId })
  }
}
```

Dicho código, transpilado a JS, es cargado como un [Content Script](https://developer.chrome.com/docs/extensions/reference/manifest/content-scripts?hl=es-419) en el Vortal. Una vez cargado renderiza una página de carga que oculta el contenido original y espera a que el DOM esté completamente cargado. Luego, inyecta la interfaz de usuario de React en el DOM del Vortal, reemplazando la interfaz original del login. La página de carga se elimina una vez que la interfaz de React está lista.

> Para más detalles técnicos recomiendo revisar el [repositorio de GitHub](https://github.com/wrsbyte/upa-ux) de la extensión, en el cual encontrará la documentación completa de la arquitectura y el código fuente.

Desde la perspectiva de la seguridad, es fundamental destacar que **todo el procesamiento, incluyendo la decodificación de la contraseña y la manipulación del DOM, ocurre exclusivamente en el navegador del cliente**. Las credenciales en su formato original **no son transmitidas a ningún servidor externo** por la extensión, preservando la privacidad del usuario. Adicionalmente, al facilitar el uso de gestores de contraseñas, UPA UX fomenta indirectamente **el uso de contraseñas más robustas y únicas**, mejorando la postura de seguridad general de la cuenta del usuario en comparación con la dependencia de contraseñas débiles o reutilizadas.

Como funcionalidad adicional, implementé también un acceso directo al Vortal desde la página principal de la universidad, inyectado mediante un Content Script similar.

![Resultado final UPA UX](/images/blog/unipamplona-vortal-extension-v2.png)

### Despliegue en producción

La versión 2 la publiqué en la **Chrome Web Store** bajo el nombre _UPA UX_, disponible [aquí](https://chromewebstore.google.com/detail/upa-ux/cbkhjckelimkbkmofdjjoekoimhgkkne). Siéntase libre de instalarla y probarla. La extensión está diseñada para funcionar exclusivamente en el dominio del Vortal de la Universidad de Pamplona, garantizando que no interfiera con otros sitios web.

![Resultado final UPA UX en Store](/images/blog/unipamplona-vortal-extension-store.png)

La implementación final consiguió una mejora sustancial de la experiencia de usuario, reemplazando una interfaz obsoleta por una moderna, intuitiva y alineada con los estándares web actuales.

Esto se tradujo directamente en una reducción significativa del tiempo y la [fricción cognitiva](https://cosasdigitales.com/usabilidad-ux/que-es-la-carga-cognitiva-y-como-afecta-al-usuario/) asociados al acceso al Vortal, al eliminar el proceso manual de traducción numérica.

Quizás el logro más importante fue la habilitación completa del uso de **[gestores de contraseñas](https://wikipedia.org/wiki/Password_manager)**, restaurando la compatibilidad con herramientas esenciales para la seguridad y conveniencia en la gestión de credenciales online. Desde el punto de vista del desarrollo, el uso de React y una arquitectura basada en componentes resultó en una mayor mantenibilidad del código, facilitando futuras actualizaciones.

Finalmente, la decisión de mantener el proyecto como [código abierto](https://wikipedia.org/wiki/Open_source) permite la auditoría por parte de la comunidad, fomenta la transparencia y posibilita la colaboración.

---

## Conclusiones y próximos pasos

UPA UX muestra que es viable modernizar un sistema legacy sin modificar el backend, aprovechando las capacidades de las extensiones de navegador, React y TypeScript. El enfoque modular y basado en observadores de DOM ofrece flexibilidad para futuras mejoras.

**Próximos retos técnicos**:

- **Multi-navegador**: adaptar la extensión a Firefox y Edge siguiendo sus [APIs específicas](https://extensionworkshop.com/).
- **Internacionalización**: implementar i18n con `react-intl`.
- **Telemetría anónima**: recoger métricas de uso respetando la privacidad.
- **Soporte a más páginas**: extender la funcionalidad a otros portales de la universidad.
