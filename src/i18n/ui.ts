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
    "nav.contact": "Contact",
    "nav.theme.light": "Toggle light theme",
    "nav.theme.dark": "Toggle dark theme",
    "nav.lang.en": "English",
    "nav.lang.es": "Spanish",

    // Blog
    "blog.table.date": "Date",
    "blog.table.title": "Title",
    "blog.title": "Blog",
    "blog.post.detail.back": "Back to blog",
  },
  es: {
    // Navbar
    "nav.home": "Inicio",
    "nav.experience": "Experiencia",
    "nav.blog": "Blog",
    "nav.contact": "Contacto",
    "nav.theme.light": "Cambiar a tema claro",
    "nav.theme.dark": "Cambiar a tema oscuro",
    "nav.lang.en": "Inglés",
    "nav.lang.es": "Español",

    // Blog
    "blog.table.date": "Fecha",
    "blog.table.title": "Título",
    "blog.title": "Blog",
    "blog.post.detail.back": "Volver al blog",
  },
} as const;
