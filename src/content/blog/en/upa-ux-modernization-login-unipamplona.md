---
title: "UPA UX: Modernization of the Login in the Unipamplona Vortal"
date: 2025-04-20
views: 1245
translations:
  en: upa-ux-modernization-login-unipamplona
  es: upa-ux-modernizacion-login-unipamplona
---

## **Introduction**

The transformation of [legacy systems](https://wikipedia.org/wiki/Sistema_heredado) is one of the most recurring challenges in software engineering and regularly drives users to three solutions: the first is to stop using the system ([See Jakob’s Law](https://lawsofux.com/jakobs-law/)) (in this case not possible, as there is no alternative website); the second, in which the user resigns themselves to its use; and the third, which is the most interesting, is to modernize the system. In this article, I focus on the third option, which is the one I chose for the **University of Pamplona Vortal**.

The [University of Pamplona Vortal](https://hermesoft.unipamplona.edu.co/unipamplona/hermesoft/vortal/iniciarSesion.jsp), based on Java web technologies such as [JSP](https://www.ibm.com/docs/es/dmrt/9.5.0?topic=files-javaserver-pages-jsp-technology), remains in production despite its usability and maintenance limitations.

In this article I describe how I designed and implemented **[UPA UX](https://chromewebstore.google.com/detail/upa-ux/cbkhjckelimkbkmofdjjoekoimhgkkne)**, an open‑source Google Chrome extension that modernizes the authentication process without modifying the backend.

Throughout the blog you will find links to external resources ([MDN Web Docs](https://developer.mozilla.org), [Chrome Extension Guide](https://developer.chrome.com/docs/extensions/), [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)) and code snippets illustrating each phase.

- [Problem Statement](#problem-statement)  
- [Prototype with Vanilla JavaScript](#prototype-with-vanilla-javascript)  
- [React Architecture and Modularization](#react-architecture-and-modularization)  
- [Production Deployment](#production-deployment)  
- [Conclusions and Next Steps](#conclusions-and-next-steps)  

---

## Problem Statement

The academic environment of the University of Pamplona relies on an old portal (Hermesoft/Academusoft) built with JavaServer Pages (JSP), using multi‑page rendering with the [`<frame>`](https://developer.mozilla.org/en/docs/Web/HTML/Reference/Elements/frame) and [`<frameset>`](https://developer.mozilla.org/en/docs/Web/HTML/Reference/Elements/frameset) tags, and featuring a user experience (UX) that leaves much to be desired.

> **Note**: Frames and framesets were useful to segregate the content of a web page into different sections, but today they are considered obsolete and not recommended for use. [See the following discussion](https://stackoverflow.com/questions/25554594/do-web-developers-still-use-framesets).

This system implements a virtual keyboard with 37 keys where letters are mapped to random numbers in each session. The user must enter their password using the virtual keyboard, replacing each letter with its corresponding number.

![Original Unipamplona Vortal](/images/blog/unipamplona-vortal-original.png)

Although this mechanism offers protection against [low‑level keyloggers](https://wikipedia.org/wiki/Keylogger), it creates a **poor user experience** and hinders the adoption of modern password managers.

Furthermore, the absence of attributes such as [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete) prevents integration with credential management extensions. Maintaining the JSP code proves costly and error‑prone when trying to incorporate visual improvements.

Thus, the technical challenge consisted of:

1. **Keep the backend unchanged**.  
2. **Preserve the dynamic encoding** of characters to numbers.  
3. **Improve usability** without sacrificing security.  
4. **Not interfere with the normal operation of the system**.  

---

## Prototype with Vanilla JavaScript

The [first version](https://github.com/wrsbyte/Extension-Login-Unipamplona) was simple: a popup that requested a username and password, and then injected the corresponding numbers into the JSP form fields.

It kept the original website and virtual keyboard, but allowed entering the password in plain text through the extension’s form. It was not necessary to inject content into the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model).

To achieve this, I employed fundamental web technologies such as JavaScript, along with HTML and CSS to build a simple user‑activated popup interface.

I interacted with the Vortal page through the [Chrome Extension APIs](https://developer.chrome.com/docs/extensions/reference/api?hl=es-419), using v2 manifests.

On one hand, I loaded a background script responsible for listening to the extension’s installation and activation events. Upon detecting that the user accessed the Vortal page, the extension was activated and the popup was displayed. This background script also managed the configuration of the pages to which the extension had access.

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

And on the other hand, I implemented a content script that was injected into the Vortal page to interact with the DOM. This [Content Script](https://developer.chrome.com/docs/extensions/reference/manifest/content-scripts?hl=es-419) was responsible for analyzing the DOM to extract the letter‑to‑number mapping, translate the password provided by the user from the popup, and finally simulate the necessary click events on the original virtual numeric keyboard elements to populate the password field.

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

The results of this phase demonstrated the technical feasibility of the automation, removing the need for manual user interaction with the numeric keyboard. However, this approach presented significant limitations. The main one was its fragility, since it depended strictly on the specific DOM structure of the Vortal; any change in the CSS classes or the arrangement of the virtual keyboard’s HTML elements could render the extension useless.

Moreover, the user experience remained partial, since by keeping the password input in a decoupled popup, the incompatibility with password managers that require standard input fields directly on the page was not resolved. Finally, the popup interface was rudimentary and did not offer an integrated experience. The source code of this version is [available on GitHub](https://github.com/wrsbyte/Extension-Login-Unipamplona).

---

## React Architecture and Modularization

Given the limitations identified in v1, I opted for a complete redesign aiming to fully replace the original login user interface with a modern solution, while maintaining compatibility with the Vortal’s existing backend.

My technical goal was to implement a React‑based user interface that captured credentials in standard fields, hid the original interface, and managed the translation and submission of credentials transparently, thus enabling native use of password managers.

I took the opportunity to incorporate a software architecture based on monorepos: one package for the API and another for the web extension. I organized the project structure as follows:

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

The technologies I selected for this phase included [React](https://react.dev)/[TypeScript](https://www.typescriptlang.org/) as the main libraries for building a declarative, component‑based, and efficient user interface, facilitating more agile and maintainable development. I implemented the styling of the React interface using [Tailwind CSS](https://tailwindcss.com/). The Chrome Extension APIs, fundamentally the [Content Scripts](https://developer.chrome.com/docs/extensions/reference/manifest/content-scripts?hl=es-419), with v3 manifests, were crucial for interacting with the DOM and modifying the page’s behavior.

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

This code, transpiled to JS, is loaded as a Content Script in the Vortal. Once loaded, it renders a loading page that hides the original content and waits for the DOM to be fully loaded. Then, it injects the React user interface into the Vortal’s DOM, replacing the original login interface. The loading page is removed once the React interface is ready.

> For more technical details, I recommend reviewing the extension’s [GitHub repository](https://github.com/wrsbyte/upa-ux), where you will find the complete architecture documentation and source code.

From a security perspective, it is important to highlight that **all processing, including password decoding and DOM manipulation, occurs exclusively in the client browser**. Credentials in their original format **are not transmitted to any external server** by the extension, preserving the user’s privacy. Additionally, by facilitating the use of password managers, UPA UX indirectly encourages **the use of stronger, unique passwords**, improving the overall security posture of the user’s account compared to relying on weak or reused passwords.

As an additional feature, I also implemented a shortcut to the Vortal from the university’s main page, injected via a similar Content Script.

![Final result UPA UX](/images/blog/unipamplona-vortal-extension-v2.png)

### Production Deployment

I published version 2 in the **Chrome Web Store** under the name _UPA UX_, available [here](https://chromewebstore.google.com/detail/upa-ux/cbkhjckelimkbkmofdjjoekoimhgkkne). Feel free to install and try it. The extension is designed to work exclusively on the University of Pamplona Vortal domain, ensuring that it does not interfere with other websites.

![UPA UX final result in the Store](/images/blog/unipamplona-vortal-extension-store.png)

The final implementation achieved a substantial improvement in user experience, replacing an obsolete interface with a modern, intuitive one aligned with current web standards.

This translated directly into a significant reduction in time and [cognitive friction](https://cosasdigitales.com/usabilidad-ux/que-es-la-carga-cognitiva-y-como-afecta-al-usuario/) associated with accessing the Vortal, by eliminating the manual numeric translation process.

Perhaps the most important achievement was the full enablement of [password managers](https://wikipedia.org/wiki/Password_manager), restoring compatibility with essential tools for security and convenience in managing online credentials. From a development standpoint, using React and a component‑based architecture resulted in greater code maintainability, facilitating future updates.

Finally, the decision to keep the project as [open source](https://wikipedia.org/wiki/Open_source) allows for community auditing, fosters transparency, and enables collaboration.

---

## Conclusions and Next Steps

UPA UX demonstrates that it is feasible to modernize a legacy system without modifying the backend, leveraging the capabilities of browser extensions, React, and TypeScript. The modular approach based on DOM observers offers flexibility for future enhancements.

**Next technical challenges**:

- **Multi‑browser**: adapt the extension to Firefox and Edge following their [specific APIs](https://extensionworkshop.com/).  
- **Internationalization**: implement i18n with `react-intl`.  
- **Anonymous telemetry**: collect usage metrics while respecting privacy.  
- **Support for more pages**: extend functionality to other university portals.  
