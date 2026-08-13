import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * Letvægts-i18n: en sprogkontekst med DA/EN. `useT()` giver en `t(da, en)`
 * hjælper, så tekst kan oversættes inline uden en central nøgle-ordbog.
 *
 * SSR-sikkert: standard er "da" på serveren og ved første klient-render, så
 * hydration matcher. localStorage læses i en effect og opdaterer bagefter.
 */

export type Lang = "da" | "en";

const STORAGE_KEY = "sv-lang";

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LangContextValue>({
  lang: "da",
  setLang: () => {},
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("da");

  // Læs gemt sprog efter mount (undgår hydration-mismatch).
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "da") setLangState(stored);
    } catch {
      /* ignore */
    }
  }, []);

  // Hold <html lang> synkroniseret.
  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  };

  const toggle = () => setLang(lang === "da" ? "en" : "da");

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

/** Returnerer en oversætter: t("Dansk", "English"). */
export function useT() {
  const { lang } = useContext(LanguageContext);
  return (da: string, en: string) => (lang === "en" ? en : da);
}
