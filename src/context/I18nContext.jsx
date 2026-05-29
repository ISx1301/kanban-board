/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  translations,
} from '../constants/kanban'

const LANGUAGE_STORAGE_KEY = 'kanban_language'

const I18nContext = createContext(null)

function getInitialLanguage() {
  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY)

  return SUPPORTED_LANGUAGES.includes(savedLanguage)
    ? savedLanguage
    : DEFAULT_LANGUAGE
}

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)
  const value = useMemo(() => {
    const t = translations[language]

    function toggleLanguage() {
      setLanguage((currentLanguage) => {
        const nextLanguage = currentLanguage === 'uk' ? 'en' : 'uk'

        localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)

        return nextLanguage
      })
    }

    return {
      language,
      t,
      toggleLanguage,
    }
  }, [language])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }

  return context
}
