// Weather API utilities using Open-Meteo (free, no API key required)

const WEATHER_API_BASE = 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';

// Weather code translations for all languages
const WEATHER_TRANSLATIONS = {
  0: { // Clear sky
    ru: 'Ясно', en: 'Clear', uk: 'Ясно', ka: 'ნათელი',
    de: 'Klar', es: 'Despejado', fr: 'Dégagé', zh: '晴朗', ja: '晴れ', ko: '맑음'
  },
  1: { // Mainly clear
    ru: 'Преимущественно ясно', en: 'Mostly clear', uk: 'Переважно ясно', ka: 'უმეტესად ნათელი',
    de: 'Überwiegend klar', es: 'Mayormente despejado', fr: 'Généralement dégagé', zh: '大部晴朗', ja: 'おおむね晴れ', ko: '대체로 맑음'
  },
  2: { // Partly cloudy
    ru: 'Переменная облачность', en: 'Partly cloudy', uk: 'Мінлива хмарність', ka: 'ნაწილობრივ ღრუბლიანი',
    de: 'Teilweise bewölkt', es: 'Parcialmente nublado', fr: 'Partiellement nuageux', zh: '多云', ja: '晴れ時々曇り', ko: '부분적으로 흐림'
  },
  3: { // Overcast
    ru: 'Облачно', en: 'Cloudy', uk: 'Хмарно', ka: 'ღრუბლიანი',
    de: 'Bewölkt', es: 'Nublado', fr: 'Nuageux', zh: '阴天', ja: '曇り', ko: '흐림'
  },
  45: { // Fog
    ru: 'Туман', en: 'Fog', uk: 'Туман', ka: 'ნისლი',
    de: 'Nebel', es: 'Niebla', fr: 'Brouillard', zh: '雾', ja: '霧', ko: '안개'
  },
  48: { // Rime fog
    ru: 'Изморозь', en: 'Freezing fog', uk: 'Іній', ka: 'მოყინვა',
    de: 'Eisnebel', es: 'Niebla helada', fr: 'Brouillard givrant', zh: '冻雾', ja: '霧氷', ko: '서리 안개'
  },
  51: { // Light drizzle
    ru: 'Легкая морось', en: 'Light drizzle', uk: 'Легка мряка', ka: 'მსუბუქი ბურუსი',
    de: 'Leichter Nieselregen', es: 'Llovizna ligera', fr: 'Bruine légère', zh: '小雨', ja: '小雨', ko: '가랑비'
  },
  53: { // Moderate drizzle
    ru: 'Морось', en: 'Drizzle', uk: 'Мряка', ka: 'ბურუსი',
    de: 'Nieselregen', es: 'Llovizna', fr: 'Bruine', zh: '毛毛雨', ja: '霧雨', ko: '이슬비'
  },
  55: { // Dense drizzle
    ru: 'Сильная морось', en: 'Heavy drizzle', uk: 'Сильна мряка', ka: 'ძლიერი ბურუსი',
    de: 'Starker Nieselregen', es: 'Llovizna intensa', fr: 'Bruine dense', zh: '大毛毛雨', ja: '強い霧雨', ko: '강한 이슬비'
  },
  56: { // Freezing drizzle
    ru: 'Ледяная морось', en: 'Freezing drizzle', uk: 'Крижана мряка', ka: 'მოყინვა ბურუსი',
    de: 'Gefrierender Niesel', es: 'Llovizna helada', fr: 'Bruine verglaçante', zh: '冻毛毛雨', ja: '凍える霧雨', ko: '어는 이슬비'
  },
  57: { // Dense freezing drizzle
    ru: 'Сильная ледяная морось', en: 'Heavy freezing drizzle', uk: 'Сильна крижана мряка', ka: 'ძლიერი მოყინვა ბურუსი',
    de: 'Starker gefrierender Niesel', es: 'Llovizna helada intensa', fr: 'Bruine verglaçante dense', zh: '强冻毛毛雨', ja: '強い凍える霧雨', ko: '강한 어는 이슬비'
  },
  61: { // Slight rain
    ru: 'Небольшой дождь', en: 'Light rain', uk: 'Невеликий дощ', ka: 'მსუბუქი წვიმა',
    de: 'Leichter Regen', es: 'Lluvia ligera', fr: 'Pluie légère', zh: '小雨', ja: '小雨', ko: '약한 비'
  },
  63: { // Moderate rain
    ru: 'Дождь', en: 'Rain', uk: 'Дощ', ka: 'წვიმა',
    de: 'Regen', es: 'Lluvia', fr: 'Pluie', zh: '雨', ja: '雨', ko: '비'
  },
  65: { // Heavy rain
    ru: 'Сильный дождь', en: 'Heavy rain', uk: 'Сильний дощ', ka: 'ძლიერი წვიმა',
    de: 'Starker Regen', es: 'Lluvia intensa', fr: 'Forte pluie', zh: '大雨', ja: '大雨', ko: '폭우'
  },
  66: { // Freezing rain
    ru: 'Ледяной дождь', en: 'Freezing rain', uk: 'Крижаний дощ', ka: 'მოყინვა წვიმა',
    de: 'Gefrierender Regen', es: 'Lluvia helada', fr: 'Pluie verglaçante', zh: '冻雨', ja: '凍える雨', ko: '어는 비'
  },
  67: { // Heavy freezing rain
    ru: 'Сильный ледяной дождь', en: 'Heavy freezing rain', uk: 'Сильний крижаний дощ', ka: 'ძლიერი მოყინვა წვიმა',
    de: 'Starker gefrierender Regen', es: 'Lluvia helada intensa', fr: 'Forte pluie verglaçante', zh: '强冻雨', ja: '強い凍える雨', ko: '강한 어는 비'
  },
  71: { // Slight snow
    ru: 'Небольшой снег', en: 'Light snow', uk: 'Невеликий сніг', ka: 'მსუბუქი თოვლი',
    de: 'Leichter Schnee', es: 'Nieve ligera', fr: 'Neige légère', zh: '小雪', ja: '小雪', ko: '약한 눈'
  },
  73: { // Moderate snow
    ru: 'Снег', en: 'Snow', uk: 'Сніг', ka: 'თოვლი',
    de: 'Schnee', es: 'Nieve', fr: 'Neige', zh: '雪', ja: '雪', ko: '눈'
  },
  75: { // Heavy snow
    ru: 'Сильный снег', en: 'Heavy snow', uk: 'Сильний сніг', ka: 'ძლიერი თოვლი',
    de: 'Starker Schnee', es: 'Nevada intensa', fr: 'Forte neige', zh: '大雪', ja: '大雪', ko: '폭설'
  },
  77: { // Snow grains
    ru: 'Снежная крупа', en: 'Snow grains', uk: 'Сніжна крупа', ka: 'თოვლის მარცვლები',
    de: 'Schneekörner', es: 'Granizo de nieve', fr: 'Grains de neige', zh: '雪粒', ja: '雪あられ', ko: '눈알'
  },
  80: { // Slight rain showers
    ru: 'Небольшой ливень', en: 'Light showers', uk: 'Невелика злива', ka: 'მსუბუქი ზღვა',
    de: 'Leichte Schauer', es: 'Chubascos ligeros', fr: 'Averses légères', zh: '小阵雨', ja: '小雨のにわか雨', ko: '약한 소나기'
  },
  81: { // Moderate showers
    ru: 'Ливень', en: 'Showers', uk: 'Злива', ka: 'თქვენი',
    de: 'Schauer', es: 'Chubascos', fr: 'Averses', zh: '阵雨', ja: 'にわか雨', ko: '소나기'
  },
  82: { // Violent showers
    ru: 'Сильный ливень', en: 'Heavy showers', uk: 'Сильна злива', ka: 'ძლიერი ზღვა',
    de: 'Starke Schauer', es: 'Chubascos fuertes', fr: 'Fortes averses', zh: '强阵雨', ja: '強いにわか雨', ko: '강한 소나기'
  },
  85: { // Slight snow showers
    ru: 'Небольшой снегопад', en: 'Light snow showers', uk: 'Невеликий снігопад', ka: 'მსუბუქი თოვლის ზღვა',
    de: 'Leichte Schneeschauer', es: 'Chubascos de nieve ligeros', fr: 'Averses de neige légères', zh: '小阵雪', ja: '雪のにわか雨', ko: '약한 눈 소나기'
  },
  86: { // Heavy snow showers
    ru: 'Сильный снегопад', en: 'Heavy snow showers', uk: 'Сильний снігопад', ka: 'ძლიერი თოვლის ზღვა',
    de: 'Starke Schneeschauer', es: 'Chubascos de nieve intensos', fr: 'Fortes averses de neige', zh: '强阵雪', ja: '強い雪のにわか雨', ko: '강한 눈 소나기'
  },
  95: { // Thunderstorm
    ru: 'Гроза', en: 'Thunderstorm', uk: 'Гроза', ka: 'ჭექა-ქუხილი',
    de: 'Gewitter', es: 'Tormenta', fr: 'Orage', zh: '雷暴', ja: '雷雨', ko: '뇌우'
  },
  96: { // Thunderstorm with hail
    ru: 'Гроза с градом', en: 'Thunderstorm with hail', uk: 'Гроза з градом', ka: 'ჭექა-ქუხილი სეთყვით',
    de: 'Gewitter mit Hagel', es: 'Tormenta con granizo', fr: 'Orage avec grêle', zh: '雷暴伴冰雹', ja: '雹を伴う雷雨', ko: '우박을 동반한 뇌우'
  },
  99: { // Thunderstorm with heavy hail
    ru: 'Сильная гроза с градом', en: 'Severe thunderstorm', uk: 'Сильна гроза з градом', ka: 'ძლიერი ჭექა-ქუხილი',
    de: 'Schweres Gewitter', es: 'Tormenta severa', fr: 'Orage violent', zh: '强雷暴', ja: '激しい雷雨', ko: '심한 뇌우'
  }
};

// Weather icons and categories
const WEATHER_META = {
  0: { icon: '☀️', category: 'clear' },
  1: { icon: '🌤️', category: 'clear' },
  2: { icon: '⛅', category: 'cloudy' },
  3: { icon: '☁️', category: 'cloudy' },
  45: { icon: '🌫️', category: 'fog' },
  48: { icon: '🌫️', category: 'fog' },
  51: { icon: '🌧️', category: 'rain' },
  53: { icon: '🌧️', category: 'rain' },
  55: { icon: '🌧️', category: 'rain' },
  56: { icon: '🌧️', category: 'rain' },
  57: { icon: '🌧️', category: 'rain' },
  61: { icon: '🌧️', category: 'rain' },
  63: { icon: '🌧️', category: 'rain' },
  65: { icon: '🌧️', category: 'rain' },
  66: { icon: '🌧️', category: 'rain' },
  67: { icon: '🌧️', category: 'rain' },
  71: { icon: '🌨️', category: 'snow' },
  73: { icon: '🌨️', category: 'snow' },
  75: { icon: '❄️', category: 'snow' },
  77: { icon: '🌨️', category: 'snow' },
  80: { icon: '🌦️', category: 'rain' },
  81: { icon: '🌧️', category: 'rain' },
  82: { icon: '⛈️', category: 'storm' },
  85: { icon: '🌨️', category: 'snow' },
  86: { icon: '❄️', category: 'snow' },
  95: { icon: '⛈️', category: 'storm' },
  96: { icon: '⛈️', category: 'storm' },
  99: { icon: '⛈️', category: 'storm' }
};

export function getWeatherInfo(code, lang = 'ru') {
  const meta = WEATHER_META[code] || { icon: '❓', category: 'unknown' };
  const translations = WEATHER_TRANSLATIONS[code];
  const description = translations ? (translations[lang] || translations.en || translations.ru) : 'Unknown';

  return {
    description,
    icon: meta.icon,
    category: meta.category
  };
}

let currentLang = 'ru';

export function setWeatherLang(lang) {
  currentLang = lang;
}

export async function fetchWeather(lat, lon, lang = 'ru') {
  try {
    const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'precipitation',
        'weather_code',
        'wind_speed_10m',
        'wind_gusts_10m',
        'is_day'
      ].join(','),
      hourly: [
        'temperature_2m',
        'precipitation_probability',
        'precipitation',
        'weather_code',
        'wind_speed_10m',
        'is_day'
      ].join(','),
      daily: [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'precipitation_probability_max',
        'uv_index_max'
      ].join(','),
      timezone: 'auto',
      forecast_days: 7
    });

    const response = await fetch(`${WEATHER_API_BASE}?${params}`);
    if (!response.ok) throw new Error('Weather fetch failed');

    const data = await response.json();
    return processWeatherData(data, lang);
  } catch (error) {
    console.error('Weather API error:', error);
    throw error;
  }
}

function processWeatherData(data, lang = 'ru') {
  const { current, hourly, daily, timezone } = data;

  // Process current weather
  const currentWeather = {
    temperature: Math.round(current.temperature_2m),
    feelsLike: Math.round(current.apparent_temperature),
    humidity: current.relative_humidity_2m,
    precipitation: current.precipitation,
    windSpeed: Math.round(current.wind_speed_10m),
    windGusts: Math.round(current.wind_gusts_10m),
    isDay: current.is_day === 1,
    ...getWeatherInfo(current.weather_code, lang),
    code: current.weather_code
  };

  // Process hourly forecast (next 24 hours)
  const now = new Date();
  const hourlyForecast = [];
  for (let i = 0; i < 24; i++) {
    const time = new Date(hourly.time[i]);
    if (time < now && i !== 0) continue;

    hourlyForecast.push({
      time: hourly.time[i],
      hour: time.getHours(),
      temperature: Math.round(hourly.temperature_2m[i]),
      precipitationProbability: hourly.precipitation_probability[i],
      precipitation: hourly.precipitation[i],
      windSpeed: Math.round(hourly.wind_speed_10m[i]),
      isDay: hourly.is_day[i] === 1,
      ...getWeatherInfo(hourly.weather_code[i], lang)
    });

    if (hourlyForecast.length >= 12) break;
  }

  // Process daily forecast
  const dailyForecast = daily.time.map((time, i) => ({
    date: time,
    tempMax: Math.round(daily.temperature_2m_max[i]),
    tempMin: Math.round(daily.temperature_2m_min[i]),
    precipitationProbability: daily.precipitation_probability_max[i],
    uvIndex: daily.uv_index_max[i],
    ...getWeatherInfo(daily.weather_code[i], lang)
  }));

  return {
    current: currentWeather,
    hourly: hourlyForecast,
    daily: dailyForecast,
    timezone
  };
}

export async function searchCities(query, lang = 'ru') {
  const trimmedQuery = (query || '').trim();
  if (!trimmedQuery || trimmedQuery.length < 2) return [];

  // Map our lang codes to Open-Meteo supported languages
  const langMap = {
    ru: 'ru',
    en: 'en',
    uk: 'uk',
    ka: 'en', // Georgian not supported
    de: 'de',
    es: 'es',
    fr: 'fr',
    zh: 'zh',
    ja: 'ja',
    ko: 'ko'
  };

  try {
    const params = new URLSearchParams({
      name: trimmedQuery,
      count: 10,
      language: langMap[lang] || 'en',
      format: 'json'
    });

    const response = await fetch(`${GEOCODING_API}?${params}`);
    if (!response.ok) throw new Error('Geocoding failed');

    const data = await response.json();
    return (data.results || []).map(city => ({
      id: city.id,
      name: city.name,
      country: city.country,
      admin: city.admin1,
      latitude: city.latitude,
      longitude: city.longitude
    }));
  } catch (error) {
    console.error('Geocoding error:', error);
    return [];
  }
}

export async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        // Fallback to IP-based geolocation
        fetchIPLocation()
          .then(resolve)
          .catch(reject);
      },
      { timeout: 5000, enableHighAccuracy: false }
    );
  });
}

async function fetchIPLocation() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      latitude: data.latitude,
      longitude: data.longitude,
      city: data.city
    };
  } catch {
    // Default to Tbilisi
    return { latitude: 41.7151, longitude: 44.8271, city: 'Тбилиси' };
  }
}
