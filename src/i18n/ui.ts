export const languages = {
  en: "English",
  es: "Spanish",
};

export const defaultLang = "es";

export const ui = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.experience": "home.Experience",
    "nav.blog": "Blog",
    "nav.sitemap": "Sitemap",
    "nav.contact": "Contact",
    "nav.theme.light": "Toggle light theme",
    "nav.theme.dark": "Toggle dark theme",
    "nav.lang.en": "English",
    "nav.lang.es": "Spanish",
    "nav.social.github": "Link to my GitHub profile",
    "nav.social.linkedin": "Link to my LinkedIn profile",

    // Blog
    "blog.table.date": "Date",
    "blog.table.title": "Title",
    "blog.title": "Blog",
    "blog.post.detail.back": "Back to blog",

    // Footer
    "footer.copyright": "Wilmer Rodríguez Sánchez. All rights reserved.",

    // home
    "home.presentation.experience_description":
      "years of experience as a Software Engineer. Design and creation of scalable and maintainable software, user-centered. Looking for the most optimal solutions to big problems, aware of the context. Lover of software engineering, data science, and intelligent systems.",
    "home.presentation.from": "From",
    "home.game_of_life.title": "Conway's Game of Life",
    "home.game_of_life.generations": "Generations",
    "home.game_of_life.tip":
      "Left click or drag to add cells. Right click to remove cells.",
    "home.game_of_life.pause": "Pause",
    "home.game_of_life.play": "Play",
    "home.game_of_life.reset": "Reset",
    "home.game_of_life.randomize": "Randomize",

    // modals
    "availability_to_work.badge": "Available to work",
    "availability_to_work.modal.close": "Close",
    "availability_to_work.modal.description":
      "I'm currently available for new opportunities. Here are the details of my availability",
    "availability_to_work.modal.title": "Work Availability",
    "availability_to_work.modal.remote_title": "Remote Work",
    "availability_to_work.modal.remote_description":
      "Available for remote work globally, with flexible hours to accommodate different time zones.",
    "availability_to_work.modal.local_title": "On-site / Hybrid",
    "availability_to_work.modal.local_description":
      "Available for on-site or hybrid work in Guadalajara, Mexico or surrounding areas.",
    "availability_to_work.modal.time_title": "Working Hours",
    "availability_to_work.modal.time_description":
      "Flexible schedule with availability during standard business hours in CST/EST time zones.",
    "availability_to_work.modal.type_title": "Employment Type",
    "availability_to_work.modal.type_description":
      "Open to full-time positions, contract work, and freelance projects.",

    "gameOfLife.modal.rules.button": "Game of Life Rules",
    "gameOfLife.modal.rules.title": "Conway's Game of Life",
    "gameOfLife.modal.description":
      "Conway's Game of Life is a cellular automaton devised by mathematician John Conway in 1970. It's a zero-player game, meaning its evolution is determined by its initial state, with no further input from humans.",
    "gameOfLife.modal.rules": "Rules",
    "gameOfLife.modal.rule1":
      "Any live cell with fewer than two live neighbors dies (underpopulation)",
    "gameOfLife.modal.rule2":
      "Any live cell with two or three live neighbors lives on",
    "gameOfLife.modal.rule3":
      "Any live cell with more than three live neighbors dies (overpopulation)",
    "gameOfLife.modal.rule4":
      "Any dead cell with exactly three live neighbors becomes alive (reproduction)",

    // skills
    "home.skills.title": "Skills",
    "home.skills.problem_solving": "Problem Solving",
    "home.skills.team_player": "Team Player",
    "home.skills.analytical_and_pragmatic": "Analytical and Pragmatic",
    "home.skills.agile_principles": "Agile Principles",
    "home.skills.logical_and_critical_thinking":
      "Logical and Critical Thinking",
    "home.skills.object_oriented_programming": "Object-Oriented Programming",
    "home.skills.software_design_patterns_and_principles":
      "Software Design Patterns and Principles",
    "home.skills.machine_learning": "Machine Learning",
    "home.skills.supervised_predictive_models": "Supervised Predictive Models",
    "home.skills.feature_engineering": "Feature Engineering",
    "home.skills.git_github": "Git / GitHub",
    "home.skills.rest_api": "REST API",
    "home.skills.javascript": "JavaScript",
    "home.skills.typescript": "TypeScript",
    "home.skills.nodejs": "Node.js",
    "home.skills.python": "Python",
    "home.skills.sql": "SQL",
    "home.skills.linux": "Linux",
    "home.skills.angular": "Angular",
    "home.skills.django": "Django",

    // experience
    "home.experience.title": "Experience",
    "home.experience.years": "y",
    "home.experience.company.shf.title": "Software Engineer",
    "home.experience.company.shf.company": "SHF S.A.S.",
    "home.experience.company.shf.period": "January 2022 - Present",
    "home.experience.company.shf.description":
      "Achieved an 80% improvement in response times for key endpoints in B2B services. Developed complex state management and rendering systems on the frontend, utilizing design patterns and optimized hybrid data structures. Proposed and implemented complex systematic business rules that enabled the digitalization of internal processes and those of our clients, reducing manual tasks. Managed systems, set up, and configured new servers.",
    "home.experience.company.citix.title": "Software Engineer",
    "home.experience.company.citix.company": "Citix",
    "home.experience.company.citix.period": "June 2022 - Present",
    "home.experience.company.citix.description":
      "Proposed and created CI pipelines from scratch for services and Android/iOS mobile applications, improving delivery times to clients and reducing manual tasks. Dockerized backend services and deployed them to AWS, streamlining the onboarding process for the company. Designed and developed microservices, decoupling the use of third-party services and abstracting common internal functionalities. Developed accessible and high-performance web and mobile frontends.",
    "home.experience.company.iieg.title": "Data Science Intern",
    "home.experience.company.iieg.company": "IIEG Mexico",
    "home.experience.company.iieg.period": "June 2023 - August 2023",
    "home.experience.company.iieg.description":
      "Developed a predictive model for assessing the severity of cyclist accident risks. Performed real-time traffic inference in geographic areas with a history of accidents. Managed servers, scheduled tasks, and deployed to production.",
    "home.experience.company.delfin.title": "Data Science Intern",
    "home.experience.company.delfin.company": "Delfín México",
    "home.experience.company.delfin.period": "June 2022 - August 2022",
    "home.experience.company.delfin.description":
      "Developed a predictive model to validate the presence of a STEM profile in undergraduate applicants using EEG and EyeTracking. Applied feature engineering techniques, including variable selection and extraction, to raw data. Conducted data behavior analysis, presented results, and provided study conclusions.",
    "home.experience.company.wtredata.title": "FullStack Developer",
    "home.experience.company.wtredata.company": "WTreData",
    "home.experience.company.wtredata.period": "May 2021 - January 2022",
    "home.experience.company.wtredata.description":
      "Developed third-party solutions using agile methodologies and rapid delivery practices. Participated in the entire software lifecycle, including client communication, requirements gathering, and business understanding.",
  },
  es: {
    // Navbar
    "nav.home": "Inicio",
    "nav.experience": "Experiencia",
    "nav.blog": "Blog",
    "nav.sitemap": "Mapa del sitio",
    "nav.contact": "Contacto",
    "nav.theme.light": "Cambiar a tema claro",
    "nav.theme.dark": "Cambiar a tema oscuro",
    "nav.lang.en": "Inglés",
    "nav.lang.es": "Español",
    "nav.social.github": "Enlace a mi perfil de GitHub",
    "nav.social.linkedin": "Enlace a mi perfil de LinkedIn",

    // Blog
    "blog.table.date": "Fecha",
    "blog.table.title": "Título",
    "blog.title": "Blog",
    "blog.post.detail.back": "Volver al blog",

    // Footer
    "footer.copyright":
      "Wilmer Rodríguez Sánchez. Todos los derechos reservados.",

    // home
    "home.presentation.experience_description":
      "años de experiencia como Ingeniero de Software. Diseño y creación de software escalable y mantenible, centrado en el usuario. Buscando las soluciones más óptimas a grandes problemas, consciente del contexto. Amante de la ingeniería de software, ciencia de datos y sistemas inteligentes.",
    "home.presentation.from": "Desde",
    "home.game_of_life.title": "Juego de la vida de Conway",
    "home.game_of_life.generations": "Generaciones",
    "home.game_of_life.tip":
      "Clic izquierdo o arrastrar para añadir células. Clic derecho para eliminar células.",
    "home.game_of_life.pause": "Pausar",
    "home.game_of_life.play": "Iniciar",
    "home.game_of_life.reset": "Reiniciar",
    "home.game_of_life.randomize": "Random",

    // modals
    "availability_to_work.badge": "Disponible para trabajar",
    "availability_to_work.modal.close": "Cerrar",
    "availability_to_work.modal.title": "Disponibilidad para trabajar",
    "availability_to_work.modal.description":
      "Actualmente estoy disponible para nuevas oportunidades. Aquí están los detalles de mi disponibilidad",
    "availability_to_work.modal.remote_title": "Trabajo Remoto",
    "availability_to_work.modal.remote_description":
      "Disponible para trabajo remoto a nivel global, con horarios flexibles para adaptarse a diferentes zonas horarias.",
    "availability_to_work.modal.local_title": "Presencial / Híbrido",
    "availability_to_work.modal.local_description":
      "Disponible para trabajo presencial o híbrido en Guadalajara, México o áreas circundantes.",
    "availability_to_work.modal.time_title": "Horario de trabajo",
    "availability_to_work.modal.time_description":
      "Horario flexible con disponibilidad durante el horario laboral estándar en las zonas horarias CST/EST.",
    "availability_to_work.modal.type_title": "Tipo de empleo",
    "availability_to_work.modal.type_description":
      "Abierto a posiciones de tiempo completo, trabajo por contrato y proyectos freelance.",

    "gameOfLife.modal.rules.button": "Reglas del Juego de la Vida",
    "gameOfLife.modal.rules.title": "Juego de la Vida de Conway",
    "gameOfLife.modal.description":
      "El Juego de la Vida de Conway es un autómata celular diseñado por el matemático John Conway en 1970. Es un juego de cero jugadores, lo que significa que su evolución está determinada por su estado inicial, sin más intervención humana.",
    "gameOfLife.modal.rules": "Reglas",
    "gameOfLife.modal.rule1":
      "Cualquier célula viva con menos de dos vecinos vivos muere (subpoblación)",
    "gameOfLife.modal.rule2":
      "Cualquier célula viva con dos o tres vecinos vivos vive",
    "gameOfLife.modal.rule3":
      "Cualquier célula viva con más de tres vecinos vivos muere (sobrepoblación)",
    "gameOfLife.modal.rule4":
      "Cualquier célula muerta con exactamente tres vecinos vivos se convierte en viva (reproducción)",

    // skills
    "home.skills.title": "Habilidades",
    "home.skills.problem_solving": "Resolución de Problemas",
    "home.skills.team_player": "Trabajo en Equipo",
    "home.skills.analytical_and_pragmatic": "Analítico y Pragmático",
    "home.skills.agile_principles": "Principios Ágiles",
    "home.skills.logical_and_critical_thinking": "Pensamiento Lógico y Crítico",
    "home.skills.object_oriented_programming":
      "Programación Orientada a Objetos",
    "home.skills.software_design_patterns_and_principles":
      "Patrones y Principios de Diseño de Software",
    "home.skills.machine_learning": "Aprendizaje Automático",
    "home.skills.supervised_predictive_models":
      "Modelos Predictivos Supervisados",
    "home.skills.feature_engineering": "Ingeniería de Características",
    "home.skills.git_github": "Git / GitHub",
    "home.skills.rest_api": "API REST",
    "home.skills.javascript": "JavaScript",
    "home.skills.typescript": "TypeScript",
    "home.skills.nodejs": "Node.js",
    "home.skills.python": "Python",
    "home.skills.sql": "SQL",
    "home.skills.linux": "Linux",
    "home.skills.angular": "Angular",
    "home.skills.django": "Django",

    // experience
    "home.experience.title": "Experiencia",
    "home.experience.years": "a",
    "home.experience.company.shf.title": "Ingeniero de Software",
    "home.experience.company.shf.company": "SHF S.A.S.",
    "home.experience.company.shf.period": "Enero 2022 - Presente",
    "home.experience.company.shf.description":
      "Logré una mejora del 80% en los tiempos de respuesta para endpoints clave en servicios B2B. Desarrollé sistemas complejos de gestión de estado y renderizado en el frontend, utilizando patrones de diseño y estructuras de datos híbridas optimizadas. Propuse e implementé reglas de negocio sistemáticas complejas que permitieron la digitalización de procesos internos y de nuestros clientes, reduciendo tareas manuales. Gestioné sistemas, configuré y configuré nuevos servidores.",

    "home.experience.company.citix.title": "Ingeniero de Software",
    "home.experience.company.citix.company": "Citix",
    "home.experience.company.citix.period": "Junio 2022 - Presente",
    "home.experience.company.citix.description":
      "Propuse y creé pipelines de CI desde cero para servicios y aplicaciones móviles Android/iOS, mejorando los tiempos de entrega a los clientes y reduciendo tareas manuales. Dockericé servicios backend y los desplegué en AWS, agilizando el proceso de incorporación para la empresa. Diseñé y desarrollé microservicios, desacoplando el uso de servicios de terceros y abstrayendo funcionalidades internas comunes.  desacoplando el uso de servicios de terceros y abstrayendo funcionalidades internas comunes. Desarrollé frontends web y móviles accesibles y de alto rendimiento.",

    "home.experience.company.iieg.title": "Pasante de Ciencia de Datos",
    "home.experience.company.iieg.company": "IIEG México",
    "home.experience.company.iieg.period": "Junio 2023 - Agosto 2023",
    "home.experience.company.iieg.description":
      "Desarrollé un modelo predictivo para evaluar la gravedad de los riesgos de accidentes de ciclistas. Realicé inferencia de tráfico en tiempo real en áreas geográficas con historial de accidentes. Gestioné servidores, programé tareas y desplegué a producción.",

    "home.experience.company.delfin.title": "Pasante de Ciencia de Datos",
    "home.experience.company.delfin.company": "Delfín México",
    "home.experience.company.delfin.period": "Junio 2022 - Agosto 2022",
    "home.experience.company.delfin.description":
      "Desarrollé un modelo predictivo para validar la presencia de un perfil STEM en solicitantes de pregrado utilizando EEG y EyeTracking. Apliqué técnicas de ingeniería de características, incluida la selección y extracción de variables, a datos sin procesar. Realicé análisis de comportamiento de datos, presenté resultados y proporcioné conclusiones del estudio.",

    "home.experience.company.wtredata.title": "Desarrollador FullStack",
    "home.experience.company.wtredata.company": "WTreData",
    "home.experience.company.wtredata.period": "Mayo 2021 - Enero 2022",
    "home.experience.company.wtredata.description":
      "Desarrollé soluciones de terceros utilizando metodologías ágiles y prácticas de entrega rápida. Participé en todo el ciclo de vida del software, incluida la comunicación con el cliente, la recopilación de requisitos y la comprensión del negocio.",
  },
} as const;
