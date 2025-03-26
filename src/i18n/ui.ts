export const languages = {
  en: "English",
  es: "Spanish",
};

export const defaultLang = "es";

export const ui = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.experience": "Experience",
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
  },
} as const;
