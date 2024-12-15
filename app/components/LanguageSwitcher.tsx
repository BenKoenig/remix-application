import { useEffect } from 'react'
import { useSearchParams } from '@remix-run/react'
import { useTranslation } from 'react-i18next'

const languages = {
  de: 'Deutsch',
  en: 'English',
  fr: 'Français',
  zh: '中文',
  es: 'Español',
  hi: 'हिंदी',
}

export const LanguageSwitcher = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const lng = searchParams.get('lng') || 'en'
  const { i18n } = useTranslation()

  useEffect(() => {
    if (lng) {
      i18n.changeLanguage(lng)
    }
  }, [lng, i18n])

  const handleLanguageChange = (lng: string) => {
    document.cookie = `NEXT_LOCALE=${lng}; path=/;`

    setSearchParams((s) => {
      s.set('lng', lng)
      return s
    })
  }

  return (
    <div style={{ margin: '10px 0 0 10px', textAlign: 'left' }}>
      <select value={lng} onChange={(e) => handleLanguageChange(e.target.value)}>
        {Object.entries(languages).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
}
