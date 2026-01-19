// Outfit recommendation engine with i18n support
// Maps weather conditions to appropriate clothing

const TEMPERATURE_RANGES = {
    FREEZING: { min: -Infinity, max: -10 },
    COLD: { min: -10, max: 0 },
    COOL: { min: 0, max: 10 },
    MILD: { min: 10, max: 18 },
    WARM: { min: 18, max: 25 },
    HOT: { min: 25, max: Infinity }
};

// Translated layer titles
const LAYER_TITLES = {
    top: { ru: 'Верхняя одежда', en: 'Outerwear', uk: 'Верхній одяг', ka: 'ზედა ტანსაცმელი', de: 'Oberbekleidung', es: 'Ropa exterior', fr: 'Vêtements d\'extérieur', zh: '外套', ja: 'アウター', ko: '아우터' },
    mid: { ru: 'Средний слой', en: 'Mid layer', uk: 'Середній шар', ka: 'შუა ფენა', de: 'Mittlere Schicht', es: 'Capa intermedia', fr: 'Couche intermédiaire', zh: '中层', ja: 'ミドルレイヤー', ko: '중간층' },
    base: { ru: 'Базовый слой', en: 'Base layer', uk: 'Базовий шар', ka: 'ბაზური ფენა', de: 'Basisschicht', es: 'Capa base', fr: 'Couche de base', zh: '基础层', ja: 'ベースレイヤー', ko: '베이스 레이어' },
    bottom: { ru: 'Низ', en: 'Bottoms', uk: 'Низ', ka: 'ქვედა ტანსაცმელი', de: 'Hosen', es: 'Pantalones', fr: 'Bas', zh: '裤子', ja: 'ボトムス', ko: '하의' },
    shoes: { ru: 'Обувь', en: 'Footwear', uk: 'Взуття', ka: 'ფეხსაცმელი', de: 'Schuhe', es: 'Calzado', fr: 'Chaussures', zh: '鞋子', ja: '靴', ko: '신발' },
    accessories: { ru: 'Аксессуары', en: 'Accessories', uk: 'Аксесуари', ka: 'აქსესუარები', de: 'Accessoires', es: 'Accesorios', fr: 'Accessoires', zh: '配饰', ja: 'アクセサリー', ko: '액세서리' },
    clothing: { ru: 'Одежда', en: 'Clothing', uk: 'Одяг', ka: 'ტანსაცმელი', de: 'Kleidung', es: 'Ropa', fr: 'Vêtements', zh: '衣服', ja: '服', ko: '의류' }
};

// Translated clothing items by temperature range
const OUTFIT_ITEMS = {
    FREEZING: {
        top: { ru: 'Пуховик, утеплённая парка', en: 'Down jacket, insulated parka', uk: 'Пуховик, утеплена парка', ka: 'ბუმბულის ქურთუკი, თბილი პარკა', de: 'Daunenjacke, isolierter Parka', es: 'Chaqueta de plumas, parka aislante', fr: 'Doudoune, parka isolée', zh: '羽绒服, 保暖派克大衣', ja: 'ダウンジャケット, 防寒パーカー', ko: '패딩, 방한 파카' },
        mid: { ru: 'Тёплый свитер, флисовая кофта', en: 'Heavy sweater, fleece', uk: 'Теплий светр, флісова кофта', ka: 'თბილი სვიტერი, ფლისი', de: 'Dicker Pullover, Fleece', es: 'Suéter grueso, forro polar', fr: 'Pull épais, polaire', zh: '厚毛衣, 抓绒衫', ja: '厚手セーター, フリース', ko: '두꺼운 스웨터, 플리스' },
        base: { ru: 'Термобельё', en: 'Thermal underwear', uk: 'Термобілизна', ka: 'თერმო თეთრეული', de: 'Thermounterwäsche', es: 'Ropa térmica', fr: 'Sous-vêtements thermiques', zh: '保暖内衣', ja: 'サーマルインナー', ko: '보온 내의' },
        bottom: { ru: 'Утеплённые брюки, термо-леггинсы', en: 'Insulated pants, thermal leggings', uk: 'Утеплені штани, термо-легінси', ka: 'გათბობილი შარვალი, თერმო ლეგინსი', de: 'Gefütterte Hose, Thermo-Leggings', es: 'Pantalones aislantes, leggings térmicos', fr: 'Pantalon isolé, leggings thermiques', zh: '加绒裤, 保暖打底裤', ja: '中綿パンツ, サーマルレギンス', ko: '기모 바지, 보온 레깅스' },
        shoes: { ru: 'Зимние ботинки, угги', en: 'Winter boots, UGGs', uk: 'Зимові черевики, угги', ka: 'ზამთრის ფეხსაცმელი', de: 'Winterstiefel, UGGs', es: 'Botas de invierno', fr: 'Bottes d\'hiver', zh: '雪地靴', ja: 'ウィンターブーツ', ko: '겨울 부츠' },
        accessories: { ru: 'Шапка-ушанка, варежки, шарф', en: 'Winter hat, mittens, scarf', uk: 'Шапка-вушанка, рукавиці, шарф', ka: 'ზამთრის ქუდი, ხელთათმანი, შარფი', de: 'Wintermütze, Fäustlinge, Schal', es: 'Gorro de invierno, guantes, bufanda', fr: 'Chapka, moufles, écharpe', zh: '冬帽, 手套, 围巾', ja: '冬帽子, ミトン, マフラー', ko: '겨울 모자, 장갑, 목도리' },
        summary: { ru: 'Максимально утеплитесь! Несколько слоёв одежды обязательны.', en: 'Bundle up! Multiple layers are essential.', uk: 'Максимально утепліться! Кілька шарів одягу обов\'язкові.', ka: 'კარგად გაითბეთ! რამდენიმე ფენა აუცილებელია.', de: 'Ziehen Sie sich warm an! Mehrere Schichten sind wichtig.', es: '¡Abrígate al máximo! Varias capas son esenciales.', fr: 'Couvrez-vous bien ! Plusieurs couches sont essentielles.', zh: '多穿衣服！多层穿搭必不可少。', ja: '暖かくして！重ね着が必須。', ko: '따뜻하게 입으세요! 여러 겹 필수.' }
    },
    COLD: {
        top: { ru: 'Зимняя куртка, пальто', en: 'Winter coat, overcoat', uk: 'Зимова куртка, пальто', ka: 'ზამთრის ქურთუკი, პალტო', de: 'Winterjacke, Mantel', es: 'Abrigo de invierno', fr: 'Manteau d\'hiver', zh: '冬衣, 大衣', ja: '冬コート', ko: '겨울 코트' },
        mid: { ru: 'Свитер, кардиган', en: 'Sweater, cardigan', uk: 'Светр, кардиган', ka: 'სვიტერი, კარდიგანი', de: 'Pullover, Strickjacke', es: 'Suéter, cárdigan', fr: 'Pull, cardigan', zh: '毛衣, 开衫', ja: 'セーター, カーディガン', ko: '스웨터, 가디건' },
        bottom: { ru: 'Джинсы, тёплые брюки', en: 'Jeans, warm pants', uk: 'Джинси, теплі штани', ka: 'ჯინსი, თბილი შარვალი', de: 'Jeans, warme Hose', es: 'Vaqueros, pantalones cálidos', fr: 'Jeans, pantalon chaud', zh: '牛仔裤, 保暖长裤', ja: 'ジーンズ, 暖かいパンツ', ko: '청바지, 따뜻한 바지' },
        shoes: { ru: 'Утеплённые ботинки', en: 'Insulated boots', uk: 'Утеплені черевики', ka: 'გათბობილი ფეხსაცმელი', de: 'Gefütterte Stiefel', es: 'Botas aislantes', fr: 'Bottes isolées', zh: '保暖靴', ja: '防寒ブーツ', ko: '방한 부츠' },
        accessories: { ru: 'Шапка, перчатки, шарф', en: 'Hat, gloves, scarf', uk: 'Шапка, рукавички, шарф', ka: 'ქუდი, ხელთათმანი, შარფი', de: 'Mütze, Handschuhe, Schal', es: 'Gorro, guantes, bufanda', fr: 'Bonnet, gants, écharpe', zh: '帽子, 手套, 围巾', ja: '帽子, 手袋, マフラー', ko: '모자, 장갑, 목도리' },
        summary: { ru: 'Холодно! Оденьтесь тепло с несколькими слоями.', en: 'Cold! Dress warmly with multiple layers.', uk: 'Холодно! Одягніться тепло з кількома шарами.', ka: 'ცივა! თბილად ჩაიცვით.', de: 'Kalt! Ziehen Sie sich warm an.', es: '¡Frío! Vístete con varias capas.', fr: 'Froid ! Habillez-vous chaudement.', zh: '冷！多穿几层保暖。', ja: '寒い！重ね着で暖かく。', ko: '추워요! 여러 겹 따뜻하게.' }
    },
    COOL: {
        top: { ru: 'Демисезонная куртка, тренч', en: 'Light jacket, trench coat', uk: 'Демісезонна куртка, тренч', ka: 'მსუბუქი ქურთუკი, ტრენჩი', de: 'Übergangsjacke, Trenchcoat', es: 'Chaqueta ligera, gabardina', fr: 'Veste légère, trench', zh: '薄外套, 风衣', ja: '薄手ジャケット, トレンチコート', ko: '가벼운 재킷, 트렌치코트' },
        mid: { ru: 'Лёгкий свитер, худи', en: 'Light sweater, hoodie', uk: 'Легкий светр, худі', ka: 'მსუბუქი სვიტერი, ჰუდი', de: 'Leichter Pullover, Hoodie', es: 'Suéter ligero, sudadera', fr: 'Pull léger, sweat à capuche', zh: '薄毛衣, 连帽衫', ja: '薄手セーター, パーカー', ko: '가벼운 스웨터, 후디' },
        bottom: { ru: 'Джинсы, чиносы', en: 'Jeans, chinos', uk: 'Джинси, чіноси', ka: 'ჯინსი, ჩინოსი', de: 'Jeans, Chinos', es: 'Vaqueros, chinos', fr: 'Jeans, chinos', zh: '牛仔裤, 休闲裤', ja: 'ジーンズ, チノパン', ko: '청바지, 치노' },
        shoes: { ru: 'Кроссовки, ботинки', en: 'Sneakers, boots', uk: 'Кросівки, черевики', ka: 'სპორტული ფეხსაცმელი, ჩექმები', de: 'Sneaker, Stiefel', es: 'Zapatillas, botas', fr: 'Baskets, boots', zh: '运动鞋, 靴子', ja: 'スニーカー, ブーツ', ko: '운동화, 부츠' },
        accessories: { ru: 'Лёгкий шарф (опционально)', en: 'Light scarf (optional)', uk: 'Легкий шарф (опційно)', ka: 'მსუბუქი შარფი (სურვილისამებრ)', de: 'Leichter Schal (optional)', es: 'Bufanda ligera (opcional)', fr: 'Écharpe légère (optionnel)', zh: '薄围巾（可选）', ja: '薄手マフラー（任意）', ko: '가벼운 스카프 (선택)' },
        summary: { ru: 'Прохладно. Лёгкая куртка и свитер будут в самый раз.', en: 'Cool weather. A light jacket and sweater will do.', uk: 'Прохолодно. Легка куртка і светр — саме те.', ka: 'გრილა. მსუბუქი ქურთუკი და სვიტერი საკმარისია.', de: 'Kühl. Leichte Jacke und Pullover reichen.', es: 'Fresco. Chaqueta ligera y suéter bastarán.', fr: 'Frais. Une veste légère et un pull suffiront.', zh: '凉爽。薄外套和毛衣就够了。', ja: '涼しい。薄手のジャケットとセーターで。', ko: '선선해요. 가벼운 재킷과 스웨터.' }
    },
    MILD: {
        top: { ru: 'Ветровка, лёгкий жакет', en: 'Windbreaker, light blazer', uk: 'Вітрівка, легкий жакет', ka: 'ქარსაფარი, მსუბუქი ჟაკეტი', de: 'Windjacke, leichter Blazer', es: 'Cortavientos, blazer ligero', fr: 'Coupe-vent, blazer léger', zh: '防风衣, 薄西装', ja: 'ウィンドブレーカー, 薄手ブレザー', ko: '바람막이, 가벼운 블레이저' },
        mid: { ru: 'Лонгслив, рубашка', en: 'Long sleeve, shirt', uk: 'Лонгслів, сорочка', ka: 'გრძელი ყდის მაისური, პერანგი', de: 'Langarmshirt, Hemd', es: 'Camiseta manga larga, camisa', fr: 'T-shirt manches longues, chemise', zh: '长袖T恤, 衬衫', ja: '長袖シャツ', ko: '긴팔 티셔츠, 셔츠' },
        bottom: { ru: 'Джинсы, лёгкие брюки', en: 'Jeans, light pants', uk: 'Джинси, легкі штани', ka: 'ჯინსი, მსუბუქი შარვალი', de: 'Jeans, leichte Hose', es: 'Vaqueros, pantalones ligeros', fr: 'Jeans, pantalon léger', zh: '牛仔裤, 薄长裤', ja: 'ジーンズ, 薄手パンツ', ko: '청바지, 가벼운 바지' },
        shoes: { ru: 'Кроссовки, лоферы', en: 'Sneakers, loafers', uk: 'Кросівки, лофери', ka: 'სპორტული ფეხსაცმელი, ლოფერი', de: 'Sneaker, Loafer', es: 'Zapatillas, mocasines', fr: 'Baskets, mocassins', zh: '运动鞋, 乐福鞋', ja: 'スニーカー, ローファー', ko: '운동화, 로퍼' },
        summary: { ru: 'Комфортная погода. Лёгкая одежда с возможностью накинуть ветровку.', en: 'Comfortable weather. Light clothes, maybe a windbreaker.', uk: 'Комфортна погода. Легкий одяг, можливо вітрівка.', ka: 'კომფორტული ამინდია. მსუბუქი ტანსაცმელი.', de: 'Angenehmes Wetter. Leichte Kleidung, ggf. Windjacke.', es: 'Clima agradable. Ropa ligera, quizás un cortavientos.', fr: 'Temps agréable. Vêtements légers, éventuellement coupe-vent.', zh: '舒适的天气。穿轻便衣服，可带防风衣。', ja: '快適な天気。軽装で、ウィンドブレーカーがあれば安心。', ko: '쾌적한 날씨. 가벼운 옷에 바람막이.' }
    },
    WARM: {
        mid: { ru: 'Футболка, поло, лёгкая рубашка', en: 'T-shirt, polo, light shirt', uk: 'Футболка, поло, легка сорочка', ka: 'მაისური, პოლო, მსუბუქი პერანგი', de: 'T-Shirt, Polo, leichtes Hemd', es: 'Camiseta, polo, camisa ligera', fr: 'T-shirt, polo, chemise légère', zh: 'T恤, Polo衫, 薄衬衫', ja: 'Tシャツ, ポロシャツ, 薄手シャツ', ko: '티셔츠, 폴로, 가벼운 셔츠' },
        bottom: { ru: 'Лёгкие брюки, джинсы', en: 'Light pants, jeans', uk: 'Легкі штани, джинси', ka: 'მსუბუქი შარვალი, ჯინსი', de: 'Leichte Hose, Jeans', es: 'Pantalones ligeros, vaqueros', fr: 'Pantalon léger, jeans', zh: '薄长裤, 牛仔裤', ja: '薄手パンツ, ジーンズ', ko: '가벼운 바지, 청바지' },
        shoes: { ru: 'Кроссовки, мокасины', en: 'Sneakers, loafers', uk: 'Кросівки, мокасини', ka: 'სპორტული ფეხსაცმელი, მოკასინები', de: 'Sneaker, Mokassins', es: 'Zapatillas, mocasines', fr: 'Baskets, mocassins', zh: '运动鞋, 乐福鞋', ja: 'スニーカー, ローファー', ko: '운동화, 로퍼' },
        accessories: { ru: 'Солнцезащитные очки', en: 'Sunglasses', uk: 'Сонцезахисні окуляри', ka: 'სათვალე', de: 'Sonnenbrille', es: 'Gafas de sol', fr: 'Lunettes de soleil', zh: '太阳镜', ja: 'サングラス', ko: '선글라스' },
        summary: { ru: 'Тепло! Лёгкая одежда без верхнего слоя.', en: 'Warm! Light clothes, no outer layer needed.', uk: 'Тепло! Легкий одяг без верхнього шару.', ka: 'თბილა! მსუბუქი ტანსაცმელი.', de: 'Warm! Leichte Kleidung ohne Jacke.', es: '¡Cálido! Ropa ligera sin abrigo.', fr: 'Chaud ! Vêtements légers sans manteau.', zh: '暖和！穿轻便衣服，不需要外套。', ja: '暖かい！軽装でOK。', ko: '따뜻해요! 가벼운 옷, 겉옷 불필요.' }
    },
    HOT: {
        mid: { ru: 'Майка, лёгкая футболка', en: 'Tank top, light T-shirt', uk: 'Майка, легка футболка', ka: 'მაისური', de: 'Tanktop, leichtes T-Shirt', es: 'Camiseta de tirantes, camiseta ligera', fr: 'Débardeur, T-shirt léger', zh: '背心, 薄T恤', ja: 'タンクトップ, 薄手Tシャツ', ko: '민소매, 가벼운 티셔츠' },
        bottom: { ru: 'Шорты, лёгкое платье, юбка', en: 'Shorts, light dress, skirt', uk: 'Шорти, легка сукня, спідниця', ka: 'შორტი, მსუბუქი კაბა', de: 'Shorts, leichtes Kleid, Rock', es: 'Pantalones cortos, vestido ligero, falda', fr: 'Short, robe légère, jupe', zh: '短裤, 轻薄连衣裙, 裙子', ja: 'ショートパンツ, 薄手ワンピース', ko: '반바지, 가벼운 원피스, 치마' },
        shoes: { ru: 'Сандалии, лёгкие кроссовки', en: 'Sandals, light sneakers', uk: 'Сандалі, легкі кросівки', ka: 'სანდლები, მსუბუქი სპორტული ფეხსაცმელი', de: 'Sandalen, leichte Sneaker', es: 'Sandalias, zapatillas ligeras', fr: 'Sandales, baskets légères', zh: '凉鞋, 轻便运动鞋', ja: 'サンダル, 軽いスニーカー', ko: '샌들, 가벼운 운동화' },
        accessories: { ru: 'Кепка/панама, солнцезащитные очки', en: 'Cap/sun hat, sunglasses', uk: 'Кепка/панама, сонцезахисні окуляри', ka: 'კეპი/მზის ქუდი, სათვალე', de: 'Kappe/Sonnenhut, Sonnenbrille', es: 'Gorra/sombrero, gafas de sol', fr: 'Casquette/chapeau, lunettes de soleil', zh: '帽子, 太阳镜', ja: 'キャップ/ハット, サングラス', ko: '모자, 선글라스' },
        summary: { ru: 'Жарко! Максимально лёгкая и дышащая одежда.', en: 'Hot! Wear the lightest, breathable clothes.', uk: 'Спекотно! Максимально легкий і дихаючий одяг.', ka: 'ცხელა! მსუბუქი და სუნთქვადი ტანსაცმელი.', de: 'Heiß! Leichte, atmungsaktive Kleidung.', es: '¡Calor! Ropa ligera y transpirable.', fr: 'Chaud ! Vêtements très légers et respirants.', zh: '热！穿最轻便透气的衣服。', ja: '暑い！最も軽量で通気性のある服を。', ko: '더워요! 가장 가볍고 통기성 좋은 옷.' }
    }
};

// Layer type icons mapping
const LAYER_ICONS = {
    top: '🧥',
    mid: '👔',
    base: '👕',
    bottom: '👖',
    shoes: '👟',
    accessories: '🧤'
};

// Special icons for temperature ranges
const RANGE_ICONS = {
    FREEZING: { bottom: '👖', shoes: '🥾', accessories: '🧤', mid: '🧶' },
    COLD: { shoes: '🥾', accessories: '🧤', mid: '🧶' },
    COOL: { accessories: '🧣' },
    WARM: { accessories: '🕶️' },
    HOT: { bottom: '🩳', shoes: '🩴', accessories: '🧢' }
};

// Situation translations
const SITUATION_NAMES = {
    work: { ru: 'Работа', en: 'Work', uk: 'Робота', ka: 'სამუშაო', de: 'Arbeit', es: 'Trabajo', fr: 'Travail', zh: '工作', ja: '仕事', ko: '직장' },
    sport: { ru: 'Спорт', en: 'Sport', uk: 'Спорт', ka: 'სპორტი', de: 'Sport', es: 'Deporte', fr: 'Sport', zh: '运动', ja: 'スポーツ', ko: '스포츠' },
    date: { ru: 'Свидание', en: 'Date', uk: 'Побачення', ka: 'პაემანი', de: 'Date', es: 'Cita', fr: 'Rendez-vous', zh: '约会', ja: 'デート', ko: '데이트' },
    casual: { ru: 'Прогулка', en: 'Walk', uk: 'Прогулянка', ka: 'გასეირნება', de: 'Spazieren', es: 'Paseo', fr: 'Balade', zh: '散步', ja: '散歩', ko: '산책' },
    beach: { ru: 'Пляж', en: 'Beach', uk: 'Пляж', ka: 'პლაჟი', de: 'Strand', es: 'Playa', fr: 'Plage', zh: '海滩', ja: 'ビーチ', ko: '해변' }
};

const SITUATION_ICONS = {
    work: '💼',
    sport: '🏃',
    date: '💝',
    casual: '🚶',
    beach: '🏖️'
};

function getTemperatureRange(temp) {
    for (const [range, bounds] of Object.entries(TEMPERATURE_RANGES)) {
        if (temp >= bounds.min && temp < bounds.max) {
            return range;
        }
    }
    return 'MILD';
}

function buildLayersForRange(range, lang = 'ru') {
    const items = OUTFIT_ITEMS[range];
    if (!items) return [];

    const layers = [];
    const layerOrder = ['top', 'mid', 'base', 'bottom', 'shoes', 'accessories'];

    for (const type of layerOrder) {
        if (items[type]) {
            const icon = RANGE_ICONS[range]?.[type] || LAYER_ICONS[type];
            const title = LAYER_TITLES[type]?.[lang] || LAYER_TITLES[type]?.en || type;
            const itemText = items[type][lang] || items[type].en || items[type].ru;

            layers.push({ type, icon, title, items: itemText });
        }
    }

    return layers;
}

export function getOutfitRecommendation(weather, situation = 'casual', lang = 'ru') {
    const tempRange = getTemperatureRange(weather.temperature);
    const items = OUTFIT_ITEMS[tempRange];

    const layers = buildLayersForRange(tempRange, lang);
    const summary = items?.summary?.[lang] || items?.summary?.en || items?.summary?.ru || '';

    return {
        layers,
        summary,
        situation: SITUATION_NAMES[situation]?.[lang] || SITUATION_NAMES[situation]?.en || situation,
        situationIcon: SITUATION_ICONS[situation] || '👕',
        tempRange
    };
}

export function getSituationSuitability(weather, lang = 'ru') {
    const situations = [];
    const temp = weather.temperature;
    const isRainy = ['rain', 'storm'].includes(weather.category);
    const isStormy = weather.category === 'storm';
    const isWindy = weather.windSpeed > 30;

    // Sport
    let sportStatus = 'good';
    if (isStormy) sportStatus = 'bad';
    else if (isRainy || temp < -10 || temp > 35) sportStatus = 'ok';
    situations.push({
        id: 'sport',
        name: SITUATION_NAMES.sport[lang] || SITUATION_NAMES.sport.en,
        icon: SITUATION_ICONS.sport,
        status: sportStatus
    });

    // Work
    let workStatus = 'good';
    if (isStormy) workStatus = 'ok';
    situations.push({
        id: 'work',
        name: SITUATION_NAMES.work[lang] || SITUATION_NAMES.work.en,
        icon: SITUATION_ICONS.work,
        status: workStatus
    });

    // Date
    let dateStatus = 'good';
    if (isStormy || isRainy) dateStatus = 'ok';
    if (temp < -15 || temp > 38) dateStatus = 'ok';
    situations.push({
        id: 'date',
        name: SITUATION_NAMES.date[lang] || SITUATION_NAMES.date.en,
        icon: SITUATION_ICONS.date,
        status: dateStatus
    });

    // Casual
    let casualStatus = 'good';
    if (isStormy) casualStatus = 'bad';
    else if (isRainy || isWindy || temp < -15 || temp > 35) casualStatus = 'ok';
    situations.push({
        id: 'casual',
        name: SITUATION_NAMES.casual[lang] || SITUATION_NAMES.casual.en,
        icon: SITUATION_ICONS.casual,
        status: casualStatus
    });

    // Beach
    let beachStatus = 'bad';
    if (temp >= 25 && !isRainy && !isStormy) beachStatus = 'good';
    else if (temp >= 20 && !isRainy) beachStatus = 'ok';
    situations.push({
        id: 'beach',
        name: SITUATION_NAMES.beach[lang] || SITUATION_NAMES.beach.en,
        icon: SITUATION_ICONS.beach,
        status: beachStatus
    });

    return situations;
}

// Weather tips translations
const TIPS = {
    umbrella: {
        icon: '☂️',
        title: { ru: 'Не забудьте зонт', en: 'Don\'t forget umbrella', uk: 'Не забудьте парасольку', ka: 'არ დაგავიწყდეთ ქოლგა', de: 'Regenschirm nicht vergessen', es: 'No olvides el paraguas', fr: 'N\'oubliez pas le parapluie', zh: '别忘了带伞', ja: '傘を忘れずに', ko: '우산 잊지 마세요' },
        desc: { ru: 'Ожидаются осадки. Вероятность дождя высока.', en: 'Precipitation expected. High chance of rain.', uk: 'Очікуються опади. Висока ймовірність дощу.', ka: 'მოსალოდნელია ნალექი.', de: 'Niederschlag erwartet. Hohe Regenwahrscheinlichkeit.', es: 'Se esperan precipitaciones.', fr: 'Précipitations attendues.', zh: '预计有降水。', ja: '降水が予想されます。', ko: '강수가 예상됩니다.' }
    },
    snow: {
        icon: '❄️',
        title: { ru: 'Снегопад', en: 'Snowfall', uk: 'Снігопад', ka: 'თოვლი', de: 'Schneefall', es: 'Nevada', fr: 'Chute de neige', zh: '降雪', ja: '降雪', ko: '눈' },
        desc: { ru: 'Наденьте тёплую непромокаемую обувь.', en: 'Wear warm waterproof footwear.', uk: 'Одягніть тепле непромокальне взуття.', ka: 'ჩაიცვით თბილი წყალგაუმტარი ფეხსაცმელი.', de: 'Tragen Sie warme, wasserdichte Schuhe.', es: 'Use calzado cálido e impermeable.', fr: 'Portez des chaussures chaudes et imperméables.', zh: '穿保暖防水鞋。', ja: '暖かい防水靴を履いてください。', ko: '따뜻한 방수 신발을 신으세요.' }
    },
    wind: {
        icon: '💨',
        title: { ru: 'Сильный ветер', en: 'Strong wind', uk: 'Сильний вітер', ka: 'ძლიერი ქარი', de: 'Starker Wind', es: 'Viento fuerte', fr: 'Vent fort', zh: '大风', ja: '強風', ko: '강풍' },
        desc: { ru: 'Оденьтесь теплее.', en: 'Dress warmer.', uk: 'Одягніться тепліше.', ka: 'უფრო თბილად ჩაიცვით.', de: 'Ziehen Sie sich wärmer an.', es: 'Vístase más abrigado.', fr: 'Habillez-vous plus chaudement.', zh: '穿暖和点。', ja: '暖かく着てください。', ko: '더 따뜻하게 입으세요.' }
    },
    uv: {
        icon: '☀️',
        title: { ru: 'Высокий UV-индекс', en: 'High UV index', uk: 'Високий UV-індекс', ka: 'მაღალი UV ინდექსი', de: 'Hoher UV-Index', es: 'Alto índice UV', fr: 'Indice UV élevé', zh: '紫外线指数高', ja: 'UV指数高', ko: '높은 UV 지수' },
        desc: { ru: 'Нанесите солнцезащитный крем и наденьте головной убор.', en: 'Apply sunscreen and wear a hat.', uk: 'Нанесіть сонцезахисний крем і одягніть головний убір.', ka: 'წაისვით მზისგან დამცავი კრემი და დაიხურეთ ქუდი.', de: 'Tragen Sie Sonnencreme und eine Kopfbedeckung.', es: 'Aplique protector solar y use sombrero.', fr: 'Appliquez de la crème solaire et portez un chapeau.', zh: '涂防晒霜并戴帽子。', ja: '日焼け止めを塗り、帽子をかぶってください。', ko: '자외선 차단제를 바르고 모자를 쓰세요.' }
    },
    cold: {
        icon: '🥶',
        title: { ru: 'Мороз', en: 'Freezing', uk: 'Мороз', ka: 'ყინვა', de: 'Frost', es: 'Helada', fr: 'Gel', zh: '严寒', ja: '氷点下', ko: '영하' },
        desc: { ru: 'Не забудьте утеплить руки и голову.', en: 'Don\'t forget to keep hands and head warm.', uk: 'Не забудьте утеплити руки і голову.', ka: 'არ დაგავიწყდეთ ხელების და თავის გათბობა.', de: 'Vergessen Sie nicht, Hände und Kopf warm zu halten.', es: 'No olvide mantener las manos y la cabeza calientes.', fr: 'N\'oubliez pas de garder les mains et la tête au chaud.', zh: '别忘了保暖双手和头部。', ja: '手と頭を暖かく保つことを忘れずに。', ko: '손과 머리를 따뜻하게 유지하세요.' }
    },
    heat: {
        icon: '🥵',
        title: { ru: 'Жара', en: 'Heat', uk: 'Спека', ka: 'სიცხე', de: 'Hitze', es: 'Calor', fr: 'Chaleur', zh: '酷热', ja: '猛暑', ko: '더위' },
        desc: { ru: 'Пейте больше воды и избегайте солнца в пик активности.', en: 'Drink more water and avoid peak sun hours.', uk: 'Пийте більше води і уникайте сонця в пік активності.', ka: 'სვით მეტი წყალი და მოერიდეთ მზეს პიკის საათებში.', de: 'Trinken Sie mehr Wasser und meiden Sie die Mittagssonne.', es: 'Beba más agua y evite el sol en horas pico.', fr: 'Buvez plus d\'eau et évitez le soleil aux heures de pointe.', zh: '多喝水，避免正午阳光。', ja: '水をたくさん飲み、日中のピーク時間帯を避けてください。', ko: '물을 많이 마시고 한낮의 햇볕을 피하세요.' }
    },
    perfect: {
        icon: '✨',
        title: { ru: 'Отличная погода!', en: 'Perfect weather!', uk: 'Чудова погода!', ka: 'შესანიშნავი ამინდი!', de: 'Perfektes Wetter!', es: '¡Tiempo perfecto!', fr: 'Temps parfait !', zh: '天气很好！', ja: '最高の天気！', ko: '완벽한 날씨!' },
        desc: { ru: 'Идеальный день для прогулки.', en: 'Perfect day for a walk.', uk: 'Ідеальний день для прогулянки.', ka: 'იდეალური დღე გასასეირნებლად.', de: 'Perfekter Tag für einen Spaziergang.', es: 'Día perfecto para pasear.', fr: 'Journée parfaite pour une promenade.', zh: '散步的好日子。', ja: '散歩に最適な日。', ko: '산책하기 좋은 날.' }
    }
};

export function getWeatherTips(weather, daily = [], lang = 'ru') {
    const tips = [];

    if (['rain', 'storm'].includes(weather.category)) {
        tips.push({
            icon: TIPS.umbrella.icon,
            title: TIPS.umbrella.title[lang] || TIPS.umbrella.title.en,
            description: TIPS.umbrella.desc[lang] || TIPS.umbrella.desc.en
        });
    }

    if (weather.category === 'snow') {
        tips.push({
            icon: TIPS.snow.icon,
            title: TIPS.snow.title[lang] || TIPS.snow.title.en,
            description: TIPS.snow.desc[lang] || TIPS.snow.desc.en
        });
    }

    if (weather.windSpeed > 30) {
        tips.push({
            icon: TIPS.wind.icon,
            title: TIPS.wind.title[lang] || TIPS.wind.title.en,
            description: TIPS.wind.desc[lang] || TIPS.wind.desc.en
        });
    }

    const todayUV = daily[0]?.uvIndex;
    if (todayUV >= 6) {
        tips.push({
            icon: TIPS.uv.icon,
            title: TIPS.uv.title[lang] || TIPS.uv.title.en,
            description: TIPS.uv.desc[lang] || TIPS.uv.desc.en
        });
    }

    if (weather.temperature < 0) {
        tips.push({
            icon: TIPS.cold.icon,
            title: TIPS.cold.title[lang] || TIPS.cold.title.en,
            description: TIPS.cold.desc[lang] || TIPS.cold.desc.en
        });
    }

    if (weather.temperature > 30) {
        tips.push({
            icon: TIPS.heat.icon,
            title: TIPS.heat.title[lang] || TIPS.heat.title.en,
            description: TIPS.heat.desc[lang] || TIPS.heat.desc.en
        });
    }

    if (tips.length === 0 && weather.category === 'clear' && weather.temperature >= 15 && weather.temperature <= 25) {
        tips.push({
            icon: TIPS.perfect.icon,
            title: TIPS.perfect.title[lang] || TIPS.perfect.title.en,
            description: TIPS.perfect.desc[lang] || TIPS.perfect.desc.en
        });
    }

    return tips;
}

export const SITUATIONS = Object.keys(SITUATION_NAMES);
