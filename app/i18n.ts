import { serverOnly$ } from "vite-env-only/macros";


export const supportedLngs = ["en", "fr", "de", "zh", "es", "hi"];
export const fallbackLng = "de";

export const defaultNS = "translation";

export const resources = serverOnly$({
  en: { 
    translation: { 
      notFound: "No flights found",
      chronological: "Chronological",
      alphabetical: "Alphabetical",
      search: "search by title...",
      readArticle: "Read Article",
      publishedAt: "Published on",
      source: "Source"
    } 
  },
  fr: { 
    translation: { 
      notFound: "Aucun vol trouvé",
      chronological: "Chronologique",
      alphabetical: "Alphabétique",
      search: "Rechercher par titre...",
      readArticle: "Lire l'article",
      publishedAt: "Publié le",
      source: "Source"
    } 
  },
  de: { 
    translation: { 
      notFound: "Keine Flüge gefunden",
      chronological: "Chronologisch",
      alphabetical: "Alphabetisch",
      search: "Suche nach Titel...",
      readArticle: "Artikel lesen",
      publishedAt: "Veröffentlicht am",
      source: "Quelle"
    } 
  },
  zh: { 
    translation: { 
      notFound: "找不到航班",
      chronological: "按时间顺序",
      alphabetical: "按字母顺序",
      search: "按标题搜索...",
      readArticle: "阅读文章",
      publishedAt: "发布于",
      source: "来源"
    } 
  },
  es: { 
    translation: { 
      notFound: "No se encontraron vuelos",
      chronological: "Cronológico",
      alphabetical: "Alfabético",
      search: "buscar por título...",
      readArticle: "Leer artículo",
      publishedAt: "Publicado el",
      source: "Fuente"
    } 
  },
  hi: { 
    translation: { 
      notFound: "कोई उड़ान नहीं मिली",
      chronological: "कालानुक्रमिक",
      alphabetical: "वर्णानुक्रम",
      search: "शीर्षक द्वारा खोजें...",
      readArticle: "लेख पढ़ें",
      publishedAt: "प्रकाशित किया गया",
      source: "स्रोत"
    } 
  },
});
