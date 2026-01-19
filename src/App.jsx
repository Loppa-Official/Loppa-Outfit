import { useState, useEffect, useCallback, useMemo } from 'react';
import { MapPin, Search, RefreshCw, X, Droplets, Settings, ChevronRight, Check } from 'lucide-react';
import { fetchWeather, searchCities, getCurrentLocation } from './utils/weatherApi';
import { getOutfitRecommendation, getSituationSuitability, getWeatherTips } from './utils/outfitEngine';
import { LANGUAGES, t } from './utils/i18n';
import { CLOTHING_DATABASE, getCategoryName, getCategoryItems } from './utils/clothingDatabase';
import './index.css';

const VERSION = '1.1.0';

// Weather-based ambient gradient colors
const AMBIENTS = {
  clear: { a1: 'rgba(255, 180, 80, 0.2)', a2: 'rgba(255, 120, 50, 0.15)' },
  cloudy: { a1: 'rgba(100, 120, 160, 0.18)', a2: 'rgba(80, 100, 140, 0.12)' },
  rain: { a1: 'rgba(50, 100, 180, 0.22)', a2: 'rgba(80, 60, 160, 0.15)' },
  snow: { a1: 'rgba(180, 200, 240, 0.2)', a2: 'rgba(150, 180, 220, 0.15)' },
  storm: { a1: 'rgba(120, 60, 180, 0.25)', a2: 'rgba(80, 40, 140, 0.18)' },
  fog: { a1: 'rgba(140, 150, 170, 0.15)', a2: 'rgba(120, 130, 150, 0.1)' },
  night: { a1: 'rgba(60, 40, 140, 0.2)', a2: 'rgba(100, 60, 180, 0.15)' }
};

// Map outfit layer types to clothing database categories
const LAYER_TO_CATEGORY = {
  top: 'outerwear',
  outerwear: 'outerwear',
  mid: 'tops',
  base: 'tops',
  bottom: 'bottoms',
  shoes: 'footwear',
  accessories: 'accessories',
  accessory: 'accessories'
};

function App() {
  // Core state
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({ name: '...', lat: null, lon: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSituation, setSelectedSituation] = useState('casual');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Modal states
  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showClothing, setShowClothing] = useState(null); // { category, icon, title }
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // Settings
  const [lang, setLang] = useState(() => localStorage.getItem('loppa-lang') || 'ru');

  useEffect(() => {
    localStorage.setItem('loppa-lang', lang);
  }, [lang]);

  const tr = useMemo(() => t(lang), [lang]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const loadWeather = useCallback(async (lat, lon, language = lang) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeather(lat, lon, language);
      setWeather(data);
    } catch (err) {
      setError(tr('errorLoad'));
    } finally {
      setLoading(false);
    }
  }, [tr, lang]);

  const initLocation = useCallback(async () => {
    try {
      const pos = await getCurrentLocation();
      setLocation({
        name: pos.city || tr('myLocation'),
        lat: pos.latitude,
        lon: pos.longitude
      });
      await loadWeather(pos.latitude, pos.longitude, lang);
    } catch {
      setLocation({ name: 'Тбилиси', lat: 41.7151, lon: 44.8271 });
      await loadWeather(41.7151, 44.8271, lang);
    }
  }, [loadWeather, tr, lang]);

  useEffect(() => { initLocation(); }, []);

  // Reload weather when language changes
  useEffect(() => {
    if (location.lat && location.lon) {
      loadWeather(location.lat, location.lon, lang);
    }
  }, [lang]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setSearching(true);
        const results = await searchCities(searchQuery, lang);
        setSearchResults(results);
        setSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, lang]);

  const selectCity = async (city) => {
    setLocation({ name: city.name, lat: city.latitude, lon: city.longitude });
    setShowSearch(false);
    setSearchQuery('');
    await loadWeather(city.latitude, city.longitude);
  };

  // Open clothing detail modal
  const openClothingModal = (layerType, layerIcon, layerTitle) => {
    const category = LAYER_TO_CATEGORY[layerType] || layerType;
    if (CLOTHING_DATABASE[category]) {
      setShowClothing({ category, icon: layerIcon, title: layerTitle });
    }
  };

  // Computed values
  const ambient = useMemo(() => {
    if (!weather) return AMBIENTS.night;
    const cat = weather.current.category;
    const isNight = !weather.current.isDay;
    if (isNight && cat === 'clear') return AMBIENTS.night;
    return AMBIENTS[cat] || AMBIENTS.cloudy;
  }, [weather]);

  const outfit = useMemo(() =>
    weather ? getOutfitRecommendation(weather.current, selectedSituation, lang) : null,
    [weather, selectedSituation, lang]
  );

  const situations = useMemo(() =>
    weather ? getSituationSuitability(weather.current, lang) : [],
    [weather, lang]
  );

  const tips = useMemo(() =>
    weather ? getWeatherTips(weather.current, weather.daily, lang) : [],
    [weather, lang]
  );

  const tempRange = useMemo(() => {
    if (!weather?.daily?.length) return { min: 0, max: 20 };
    const allTemps = weather.daily.flatMap(d => [d.tempMin, d.tempMax]);
    return { min: Math.min(...allTemps), max: Math.max(...allTemps) };
  }, [weather]);

  // Clothing items for current category
  const clothingItems = useMemo(() => {
    if (!showClothing || !weather) return [];
    return getCategoryItems(showClothing.category, weather.current, lang);
  }, [showClothing, weather, lang]);

  const formatTime = (date) => new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'ru-RU', {
    hour: '2-digit', minute: '2-digit'
  }).format(date);

  const formatHour = (h) => `${h}:00`;

  const getDayName = (dateStr, idx) => {
    if (idx === 0) return tr('today');
    if (idx === 1) return tr('tomorrow');
    const d = new Date(dateStr);
    return tr('days')[d.getDay()];
  };

  const getSituationName = (id) => {
    const names = { sport: tr('sport'), work: tr('work'), date: tr('date'), casual: tr('casual'), beach: tr('beach') };
    return names[id] || id;
  };

  // Loading screen
  if (loading && !weather) {
    return (
      <div className="app">
        <div className="weather-bg" style={{ '--ambient-1': AMBIENTS.night.a1, '--ambient-2': AMBIENTS.night.a2 }} />
        <div className="app-content">
          <div className="loading-view">
            <div className="spinner" />
            <div className="loading-msg">{tr('loading')}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Animated Weather Background */}
      <div
        className="weather-bg"
        style={{ '--ambient-1': ambient.a1, '--ambient-2': ambient.a2 }}
      >
        <div className="weather-bg-fade" />
      </div>

      <div className="app-content">
        {/* Apple-Style Unified Header */}
        <header className="header-bar">
          <button className="location-btn" onClick={() => setShowSearch(true)}>
            <div className="loc-icon">
              <MapPin />
            </div>
            <div className="loc-info">
              <div className="loc-city">{location.name}</div>
              <div className="loc-time">{formatTime(currentTime)}</div>
            </div>
          </button>
          <div className="header-divider" />
          <button className="search-btn" onClick={() => setShowSearch(true)}>
            <Search size={20} />
          </button>
          <button
            className={`refresh-btn ${loading ? 'loading' : ''}`}
            onClick={() => location.lat && loadWeather(location.lat, location.lon)}
            disabled={loading}
          >
            <RefreshCw size={20} />
          </button>
          <button className="settings-btn" onClick={() => setShowSettings(true)}>
            <Settings size={20} />
          </button>
        </header>

        {error && <div className="error-box">{error}</div>}

        {weather && (
          <>
            {/* Hero Temperature */}
            <section className="hero">
              <div className="temp-big">{weather.current.temperature}°</div>
              <div className="weather-row">
                <span className="wx-icon">{weather.current.icon}</span>
                <span className="wx-desc">{weather.current.description}</span>
              </div>
              <div className="meta-row">
                <span>{tr('max')} {Math.max(...weather.hourly.slice(0, 12).map(h => h.temperature))}°</span>
                <span className="meta-dot" />
                <span>{tr('min')} {Math.min(...weather.hourly.slice(0, 12).map(h => h.temperature))}°</span>
                <span className="meta-dot" />
                <span>{tr('feelsLike')} {weather.current.feelsLike}°</span>
              </div>
            </section>

            {/* Situation Selector */}
            <section className="situations">
              <div className="sec-label">{tr('activities')}</div>
              <div className="sit-scroll">
                {situations.map((s) => (
                  <button
                    key={s.id}
                    className={`sit-btn ${selectedSituation === s.id ? 'active' : ''}`}
                    onClick={() => setSelectedSituation(s.id)}
                  >
                    <span className="sit-emoji">{s.icon}</span>
                    <span className="sit-name">{getSituationName(s.id)}</span>
                    <span className={`sit-tag tag-${s.status}`}>
                      {s.status === 'good' ? tr('yes') : s.status === 'ok' ? tr('maybe') : tr('no')}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Outfit Card - Clickable Layers */}
            <section className="outfit">
              <div className="outfit-top">
                <div className="outfit-badge">{outfit?.situationIcon}</div>
                <div className="outfit-info">
                  <h2>{tr('whatToWear')}</h2>
                  <p>{getSituationName(selectedSituation)}</p>
                </div>
              </div>
              <div className="layers">
                {outfit?.layers.map((layer, i) => (
                  <div
                    key={i}
                    className="layer clickable"
                    onClick={() => openClothingModal(layer.type, layer.icon, layer.title)}
                  >
                    <div className="layer-icon">{layer.icon}</div>
                    <div className="layer-text">
                      <h4>{layer.title}</h4>
                      <p>{layer.items}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Daily Forecast */}
            <section className="daily">
              <div className="sec-label">{tr('weekForecast')}</div>
              <div className="daily-list">
                {weather.daily.map((day, idx) => {
                  const range = tempRange.max - tempRange.min || 1;
                  const left = ((day.tempMin - tempRange.min) / range) * 100;
                  const width = ((day.tempMax - day.tempMin) / range) * 100;

                  return (
                    <div key={idx} className={`day-row ${idx === 0 ? 'today' : ''}`}>
                      <div className="day-name">{getDayName(day.date, idx)}</div>
                      <div className="day-icon">{day.icon}</div>
                      <div className="day-precip">
                        {day.precipitationProbability > 0 && (
                          <>
                            <Droplets size={12} />
                            {day.precipitationProbability}%
                          </>
                        )}
                      </div>
                      <div className="day-temps">
                        <span className="temp-lo">{day.tempMin}°</span>
                        <div className="temp-bar">
                          <div
                            className="temp-bar-fill"
                            style={{ left: `${left}%`, width: `${Math.max(width, 8)}%` }}
                          />
                        </div>
                        <span className="temp-hi">{day.tempMax}°</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Hourly */}
            <section className="hourly">
              <div className="sec-label">{tr('hourly')}</div>
              <div className="hour-track">
                {weather.hourly.map((h, i) => (
                  <div key={i} className={`hour-item ${i === 0 ? 'now' : ''}`}>
                    <div className="hour-time">{i === 0 ? tr('now') : formatHour(h.hour)}</div>
                    <div className="hour-icon">{h.icon}</div>
                    <div className="hour-temp">{h.temperature}°</div>
                    {h.precipitationProbability > 0 && (
                      <div className="hour-drop">
                        <Droplets size={10} />
                        {h.precipitationProbability}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Tips */}
            {tips.length > 0 && (
              <section className="tips">
                <div className="sec-label">{tr('tips')}</div>
                <div className="tip-list">
                  {tips.map((tip, i) => (
                    <div key={i} className="tip-row">
                      <span className="tip-emoji">{tip.icon}</span>
                      <div className="tip-body">
                        <h4>{tip.title}</h4>
                        <p>{tip.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Footer Attribution */}
            <footer className="footer">
              <div className="footer-text">{tr('poweredBy')}</div>
              <a
                href="https://open-meteo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                open-meteo.com
              </a>
              <div className="footer-version">Loppa Outfit v{VERSION}</div>
            </footer>
          </>
        )}
      </div>

      {/* Search Modal */}
      {showSearch && (
        <div className="search-modal">
          <div className="search-top">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                className="search-input"
                placeholder={tr('searchCity')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
            <button className="close-btn" onClick={() => setShowSearch(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="search-list">
            {searching && (
              <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-secondary)' }}>
                {tr('searching')}
              </div>
            )}
            {!searching && searchResults.length === 0 && searchQuery.length >= 2 && (
              <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-secondary)' }}>
                {tr('noResults')}
              </div>
            )}
            {searchResults.map((city) => (
              <div key={city.id} className="search-row" onClick={() => selectCity(city)}>
                <MapPin size={18} />
                <div>
                  <div className="city-name">{city.name}</div>
                  <div className="city-region">
                    {city.admin ? `${city.admin}, ` : ''}{city.country}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="settings-modal">
          <div className="settings-header">
            <h1 className="settings-title">{tr('settings')}</h1>
            <button className="close-btn" onClick={() => setShowSettings(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="settings-content">
            <div className="settings-section">
              <div className="settings-section-title">{tr('language')}</div>
              <div className="lang-grid">
                {Object.entries(LANGUAGES).map(([code, { name, flag }]) => (
                  <button
                    key={code}
                    className={`lang-btn ${lang === code ? 'active' : ''}`}
                    onClick={() => setLang(code)}
                  >
                    <span className="lang-flag">{flag}</span>
                    <span className="lang-name">{name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-title">{tr('dataSource')}</div>
              <div className="info-row">
                <span className="info-label">API</span>
                <a
                  href="https://open-meteo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-link"
                >
                  Open-Meteo <ChevronRight size={14} style={{ verticalAlign: 'middle' }} />
                </a>
              </div>
              <div className="info-row">
                <span className="info-label">{tr('version')}</span>
                <span className="info-value">{VERSION}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clothing Detail Modal */}
      {showClothing && weather && (
        <div className="clothing-modal">
          <div className="clothing-header">
            <div className="clothing-icon-big">{showClothing.icon}</div>
            <div className="clothing-title">
              <h2>{getCategoryName(showClothing.category, lang)}</h2>
              <p>{weather.current.temperature}° • {weather.current.description}</p>
            </div>
            <button className="close-btn" onClick={() => setShowClothing(null)}>
              <X size={20} />
            </button>
          </div>
          <div className="clothing-content">
            <div className="clothing-grid">
              {clothingItems
                .sort((a, b) => (b.suitable ? 1 : 0) - (a.suitable ? 1 : 0))
                .map((item, i) => (
                  <div key={i} className={`clothing-item ${item.suitable ? 'suitable' : ''}`}>
                    <div className={`item-check ${item.suitable ? 'checked' : 'unchecked'}`}>
                      {item.suitable ? <Check size={16} /> : null}
                    </div>
                    <span className="item-name">{item.name}</span>
                    <div className="item-tags">
                      {item.forRain && <span className="item-tag tag-rain">💧</span>}
                      {item.forSnow && <span className="item-tag tag-snow">❄️</span>}
                    </div>
                  </div>
                ))}
            </div>

            <div className="legend">
              <div className="legend-title">
                {lang === 'ru' ? 'Обозначения' : lang === 'en' ? 'Legend' : 'Легенда'}
              </div>
              <div className="legend-items">
                <div className="legend-item">
                  <div className="legend-dot good" />
                  <span>{lang === 'ru' ? 'Подходит' : lang === 'en' ? 'Suitable' : 'Підходить'}</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot neutral" />
                  <span>{lang === 'ru' ? 'Не подходит' : lang === 'en' ? 'Not suitable' : 'Не підходить'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
