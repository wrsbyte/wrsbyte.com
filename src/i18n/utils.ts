import { defaultLang, ui } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return key in ui[lang] ? (ui[lang] as any)[key] : ui[defaultLang][key];
  };
}

export function getLanguages() {
  return Object.keys(ui);
}

export function formatDate(date: string | Date, lang: string) {
  const dateObj = (
    date instanceof Date ? date : new Date(date)
  )
  return new Intl.DateTimeFormat(lang).format(dateObj);
}