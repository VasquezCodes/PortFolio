"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../utils/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('es') // Default to Spanish

    // Optional: Persist language preference
    useEffect(() => {
        const savedLanguage = localStorage.getItem('language')
        if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
            setLanguage(savedLanguage)
        }
    }, [])

    const toggleLanguage = (lang) => {
        if (lang === 'es' || lang === 'en') {
            setLanguage(lang)
            localStorage.setItem('language', lang)
        }
    }

    const t = translations[language]

    return (
        <LanguageContext.Provider value={{ language, setLanguage: toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    return useContext(LanguageContext)
}
