// Comprehensive clothing database with translations and categories

// All clothing items organized by category
export const CLOTHING_DATABASE = {
    outerwear: {
        icon: '🧥',
        items: [
            { id: 'down_jacket', temp: [-30, 0], rain: false, snow: true },
            { id: 'parka', temp: [-25, 5], rain: false, snow: true },
            { id: 'winter_coat', temp: [-15, 5], rain: false, snow: true },
            { id: 'wool_coat', temp: [-10, 10], rain: false, snow: false },
            { id: 'trench', temp: [5, 18], rain: true, snow: false },
            { id: 'leather_jacket', temp: [8, 20], rain: false, snow: false },
            { id: 'denim_jacket', temp: [12, 22], rain: false, snow: false },
            { id: 'windbreaker', temp: [10, 25], rain: true, snow: false },
            { id: 'raincoat', temp: [5, 25], rain: true, snow: false },
            { id: 'light_jacket', temp: [12, 22], rain: false, snow: false },
            { id: 'blazer', temp: [15, 28], rain: false, snow: false },
            { id: 'vest', temp: [5, 15], rain: false, snow: false }
        ]
    },
    tops: {
        icon: '👔',
        items: [
            { id: 'thermal_base', temp: [-30, 5], rain: false, snow: true },
            { id: 'heavy_sweater', temp: [-15, 10], rain: false, snow: true },
            { id: 'fleece', temp: [-10, 12], rain: false, snow: true },
            { id: 'wool_sweater', temp: [-5, 12], rain: false, snow: false },
            { id: 'hoodie', temp: [5, 18], rain: false, snow: false },
            { id: 'cardigan', temp: [8, 20], rain: false, snow: false },
            { id: 'light_sweater', temp: [10, 20], rain: false, snow: false },
            { id: 'longsleeve', temp: [12, 22], rain: false, snow: false },
            { id: 'shirt', temp: [15, 30], rain: false, snow: false },
            { id: 'polo', temp: [18, 32], rain: false, snow: false },
            { id: 'tshirt', temp: [20, 40], rain: false, snow: false },
            { id: 'tank_top', temp: [25, 45], rain: false, snow: false },
            { id: 'blouse', temp: [15, 30], rain: false, snow: false },
            { id: 'turtleneck', temp: [-5, 15], rain: false, snow: false }
        ]
    },
    bottoms: {
        icon: '👖',
        items: [
            { id: 'thermal_pants', temp: [-30, 0], rain: false, snow: true },
            { id: 'insulated_pants', temp: [-20, 5], rain: false, snow: true },
            { id: 'warm_pants', temp: [-10, 10], rain: false, snow: false },
            { id: 'jeans', temp: [0, 28], rain: false, snow: false },
            { id: 'chinos', temp: [10, 30], rain: false, snow: false },
            { id: 'dress_pants', temp: [10, 32], rain: false, snow: false },
            { id: 'leggings', temp: [5, 25], rain: false, snow: false },
            { id: 'joggers', temp: [10, 25], rain: false, snow: false },
            { id: 'shorts', temp: [22, 45], rain: false, snow: false },
            { id: 'skirt', temp: [18, 35], rain: false, snow: false },
            { id: 'dress', temp: [15, 35], rain: false, snow: false },
            { id: 'cargo_pants', temp: [10, 28], rain: false, snow: false }
        ]
    },
    footwear: {
        icon: '👟',
        items: [
            { id: 'winter_boots', temp: [-30, 5], rain: false, snow: true },
            { id: 'insulated_boots', temp: [-20, 5], rain: true, snow: true },
            { id: 'leather_boots', temp: [-5, 15], rain: false, snow: false },
            { id: 'rain_boots', temp: [0, 25], rain: true, snow: false },
            { id: 'hiking_boots', temp: [0, 25], rain: true, snow: false },
            { id: 'sneakers', temp: [10, 35], rain: false, snow: false },
            { id: 'running_shoes', temp: [5, 35], rain: false, snow: false },
            { id: 'loafers', temp: [15, 30], rain: false, snow: false },
            { id: 'oxfords', temp: [10, 28], rain: false, snow: false },
            { id: 'sandals', temp: [22, 45], rain: false, snow: false },
            { id: 'flip_flops', temp: [25, 45], rain: false, snow: false },
            { id: 'canvas_shoes', temp: [15, 32], rain: false, snow: false }
        ]
    },
    accessories: {
        icon: '🧤',
        items: [
            { id: 'winter_hat', temp: [-30, 5], rain: false, snow: true },
            { id: 'beanie', temp: [-15, 10], rain: false, snow: true },
            { id: 'ear_muffs', temp: [-20, 5], rain: false, snow: true },
            { id: 'thick_scarf', temp: [-20, 5], rain: false, snow: true },
            { id: 'light_scarf', temp: [0, 15], rain: false, snow: false },
            { id: 'mittens', temp: [-30, -5], rain: false, snow: true },
            { id: 'winter_gloves', temp: [-20, 5], rain: false, snow: true },
            { id: 'light_gloves', temp: [0, 10], rain: false, snow: false },
            { id: 'umbrella', temp: [-10, 35], rain: true, snow: false },
            { id: 'sunglasses', temp: [10, 45], rain: false, snow: false },
            { id: 'cap', temp: [15, 45], rain: false, snow: false },
            { id: 'sun_hat', temp: [20, 45], rain: false, snow: false },
            { id: 'belt', temp: [-30, 45], rain: false, snow: false }
        ]
    }
};

// Translations for all clothing items
export const CLOTHING_TRANSLATIONS = {
    // Categories
    categories: {
        outerwear: { ru: 'Верхняя одежда', en: 'Outerwear', uk: 'Верхній одяг', ka: 'ზედა ტანსაცმელი', de: 'Oberbekleidung', es: 'Ropa exterior', fr: 'Vêtements extérieurs', zh: '外套', ja: 'アウター', ko: '아우터' },
        tops: { ru: 'Средний слой', en: 'Tops', uk: 'Середній шар', ka: 'შუა ფენა', de: 'Oberteile', es: 'Partes superiores', fr: 'Hauts', zh: '上衣', ja: 'トップス', ko: '상의' },
        bottoms: { ru: 'Низ', en: 'Bottoms', uk: 'Низ', ka: 'ქვედა ტანსაცმელი', de: 'Hosen', es: 'Partes inferiores', fr: 'Bas', zh: '裤子', ja: 'ボトムス', ko: '하의' },
        footwear: { ru: 'Обувь', en: 'Footwear', uk: 'Взуття', ka: 'ფეხსაცმელი', de: 'Schuhe', es: 'Calzado', fr: 'Chaussures', zh: '鞋子', ja: '靴', ko: '신발' },
        accessories: { ru: 'Аксессуары', en: 'Accessories', uk: 'Аксесуари', ka: 'აქსესუარები', de: 'Accessoires', es: 'Accesorios', fr: 'Accessoires', zh: '配饰', ja: 'アクセサリー', ko: '액세서리' }
    },
    // Items
    items: {
        // Outerwear
        down_jacket: { ru: 'Пуховик', en: 'Down jacket', uk: 'Пуховик', ka: 'ბუმბულის ქურთუკი', de: 'Daunenjacke', es: 'Chaqueta de plumas', fr: 'Doudoune', zh: '羽绒服', ja: 'ダウンジャケット', ko: '패딩' },
        parka: { ru: 'Парка', en: 'Parka', uk: 'Парка', ka: 'პარკა', de: 'Parka', es: 'Parka', fr: 'Parka', zh: '派克大衣', ja: 'パーカー', ko: '파카' },
        winter_coat: { ru: 'Зимнее пальто', en: 'Winter coat', uk: 'Зимове пальто', ka: 'ზამთრის პალტო', de: 'Wintermantel', es: 'Abrigo de invierno', fr: 'Manteau d\'hiver', zh: '冬衣', ja: '冬コート', ko: '겨울 코트' },
        wool_coat: { ru: 'Шерстяное пальто', en: 'Wool coat', uk: 'Вовняне пальто', ka: 'მატყლის ქურთუკი', de: 'Wollmantel', es: 'Abrigo de lana', fr: 'Manteau en laine', zh: '羊毛大衣', ja: 'ウールコート', ko: '울 코트' },
        trench: { ru: 'Тренч', en: 'Trench coat', uk: 'Тренч', ka: 'ტრენჩი', de: 'Trenchcoat', es: 'Gabardina', fr: 'Trench', zh: '风衣', ja: 'トレンチコート', ko: '트렌치코트' },
        leather_jacket: { ru: 'Кожаная куртка', en: 'Leather jacket', uk: 'Шкіряна куртка', ka: 'ტყავის ქურთუკი', de: 'Lederjacke', es: 'Chaqueta de cuero', fr: 'Veste en cuir', zh: '皮夹克', ja: 'レザージャケット', ko: '가죽 재킷' },
        denim_jacket: { ru: 'Джинсовая куртка', en: 'Denim jacket', uk: 'Джинсова куртка', ka: 'ჯინსის ქურთუკი', de: 'Jeansjacke', es: 'Chaqueta vaquera', fr: 'Veste en jean', zh: '牛仔夹克', ja: 'デニムジャケット', ko: '청재킷' },
        windbreaker: { ru: 'Ветровка', en: 'Windbreaker', uk: 'Вітрівка', ka: 'ქარსაფარი', de: 'Windjacke', es: 'Cortavientos', fr: 'Coupe-vent', zh: '防风衣', ja: 'ウィンドブレーカー', ko: '바람막이' },
        raincoat: { ru: 'Дождевик', en: 'Raincoat', uk: 'Дощовик', ka: 'წვიმის ქურთუკი', de: 'Regenmantel', es: 'Impermeable', fr: 'Imperméable', zh: '雨衣', ja: 'レインコート', ko: '비옷' },
        light_jacket: { ru: 'Лёгкая куртка', en: 'Light jacket', uk: 'Легка куртка', ka: 'მსუბუქი ქურთუკი', de: 'Leichte Jacke', es: 'Chaqueta ligera', fr: 'Veste légère', zh: '薄外套', ja: '薄手ジャケット', ko: '가벼운 재킷' },
        blazer: { ru: 'Блейзер', en: 'Blazer', uk: 'Блейзер', ka: 'ბლეიზერი', de: 'Blazer', es: 'Blazer', fr: 'Blazer', zh: '西装外套', ja: 'ブレザー', ko: '블레이저' },
        vest: { ru: 'Жилет', en: 'Vest', uk: 'Жилет', ka: 'ჟილეტი', de: 'Weste', es: 'Chaleco', fr: 'Gilet', zh: '背心外套', ja: 'ベスト', ko: '조끼' },

        // Tops
        thermal_base: { ru: 'Термобельё', en: 'Thermal underwear', uk: 'Термобілизна', ka: 'თერმო თეთრეული', de: 'Thermounterwäsche', es: 'Ropa térmica', fr: 'Sous-vêtements thermiques', zh: '保暖内衣', ja: 'サーマルインナー', ko: '보온 내의' },
        heavy_sweater: { ru: 'Тёплый свитер', en: 'Heavy sweater', uk: 'Теплий светр', ka: 'თბილი სვიტერი', de: 'Dicker Pullover', es: 'Suéter grueso', fr: 'Pull épais', zh: '厚毛衣', ja: '厚手セーター', ko: '두꺼운 스웨터' },
        fleece: { ru: 'Флисовая кофта', en: 'Fleece', uk: 'Флісова кофта', ka: 'ფლისი', de: 'Fleecejacke', es: 'Forro polar', fr: 'Polaire', zh: '抓绒衫', ja: 'フリース', ko: '플리스' },
        wool_sweater: { ru: 'Шерстяной свитер', en: 'Wool sweater', uk: 'Вовняний светр', ka: 'მატყლის სვიტერი', de: 'Wollpullover', es: 'Suéter de lana', fr: 'Pull en laine', zh: '羊毛衫', ja: 'ウールセーター', ko: '울 스웨터' },
        hoodie: { ru: 'Худи', en: 'Hoodie', uk: 'Худі', ka: 'ჰუდი', de: 'Hoodie', es: 'Sudadera con capucha', fr: 'Sweat à capuche', zh: '连帽衫', ja: 'パーカー', ko: '후디' },
        cardigan: { ru: 'Кардиган', en: 'Cardigan', uk: 'Кардиган', ka: 'კარდიგანი', de: 'Strickjacke', es: 'Cárdigan', fr: 'Cardigan', zh: '开衫', ja: 'カーディガン', ko: '가디건' },
        light_sweater: { ru: 'Лёгкий свитер', en: 'Light sweater', uk: 'Легкий светр', ka: 'მსუბუქი სვიტერი', de: 'Leichter Pullover', es: 'Suéter ligero', fr: 'Pull léger', zh: '薄毛衣', ja: '薄手セーター', ko: '가벼운 스웨터' },
        longsleeve: { ru: 'Лонгслив', en: 'Long sleeve', uk: 'Лонгслів', ka: 'გრძელი ყდის მაისური', de: 'Langarmshirt', es: 'Camiseta manga larga', fr: 'T-shirt manches longues', zh: '长袖T恤', ja: '長袖シャツ', ko: '긴팔 티셔츠' },
        shirt: { ru: 'Рубашка', en: 'Shirt', uk: 'Сорочка', ka: 'პერანგი', de: 'Hemd', es: 'Camisa', fr: 'Chemise', zh: '衬衫', ja: 'シャツ', ko: '셔츠' },
        polo: { ru: 'Поло', en: 'Polo', uk: 'Поло', ka: 'პოლო', de: 'Poloshirt', es: 'Polo', fr: 'Polo', zh: 'Polo衫', ja: 'ポロシャツ', ko: '폴로' },
        tshirt: { ru: 'Футболка', en: 'T-shirt', uk: 'Футболка', ka: 'მაისური', de: 'T-Shirt', es: 'Camiseta', fr: 'T-shirt', zh: 'T恤', ja: 'Tシャツ', ko: '티셔츠' },
        tank_top: { ru: 'Майка', en: 'Tank top', uk: 'Майка', ka: 'მაისური', de: 'Tanktop', es: 'Camiseta de tirantes', fr: 'Débardeur', zh: '背心', ja: 'タンクトップ', ko: '민소매' },
        blouse: { ru: 'Блузка', en: 'Blouse', uk: 'Блузка', ka: 'ბლუზა', de: 'Bluse', es: 'Blusa', fr: 'Blouse', zh: '女衬衫', ja: 'ブラウス', ko: '블라우스' },
        turtleneck: { ru: 'Водолазка', en: 'Turtleneck', uk: 'Водолазка', ka: 'გოლფი', de: 'Rollkragenpullover', es: 'Cuello alto', fr: 'Col roulé', zh: '高领衫', ja: 'タートルネック', ko: '터틀넥' },

        // Bottoms
        thermal_pants: { ru: 'Термоштаны', en: 'Thermal pants', uk: 'Термоштани', ka: 'თერმო შარვალი', de: 'Thermohose', es: 'Pantalones térmicos', fr: 'Pantalon thermique', zh: '保暖裤', ja: 'サーマルパンツ', ko: '보온 바지' },
        insulated_pants: { ru: 'Утеплённые брюки', en: 'Insulated pants', uk: 'Утеплені штани', ka: 'გათბობილი შარვალი', de: 'Gefütterte Hose', es: 'Pantalones aislantes', fr: 'Pantalon isolé', zh: '加绒裤', ja: '中綿パンツ', ko: '기모 바지' },
        warm_pants: { ru: 'Тёплые брюки', en: 'Warm pants', uk: 'Теплі штани', ka: 'თბილი შარვალი', de: 'Warme Hose', es: 'Pantalones cálidos', fr: 'Pantalon chaud', zh: '保暖长裤', ja: '暖かいパンツ', ko: '따뜻한 바지' },
        jeans: { ru: 'Джинсы', en: 'Jeans', uk: 'Джинси', ka: 'ჯინსი', de: 'Jeans', es: 'Vaqueros', fr: 'Jean', zh: '牛仔裤', ja: 'ジーンズ', ko: '청바지' },
        chinos: { ru: 'Чиносы', en: 'Chinos', uk: 'Чіноси', ka: 'ჩინოსი', de: 'Chinos', es: 'Chinos', fr: 'Chinos', zh: '休闲裤', ja: 'チノパン', ko: '치노' },
        dress_pants: { ru: 'Классические брюки', en: 'Dress pants', uk: 'Класичні штани', ka: 'კლასიკური შარვალი', de: 'Anzughose', es: 'Pantalones de vestir', fr: 'Pantalon habillé', zh: '西裤', ja: 'ドレスパンツ', ko: '정장 바지' },
        leggings: { ru: 'Леггинсы', en: 'Leggings', uk: 'Легінси', ka: 'ლეგინსი', de: 'Leggings', es: 'Leggings', fr: 'Leggings', zh: '紧身裤', ja: 'レギンス', ko: '레깅스' },
        joggers: { ru: 'Джоггеры', en: 'Joggers', uk: 'Джогери', ka: 'ჯოგერი', de: 'Jogginghose', es: 'Pantalones deportivos', fr: 'Jogging', zh: '运动裤', ja: 'ジョガーパンツ', ko: '조거' },
        shorts: { ru: 'Шорты', en: 'Shorts', uk: 'Шорти', ka: 'შორტი', de: 'Shorts', es: 'Pantalones cortos', fr: 'Short', zh: '短裤', ja: 'ショートパンツ', ko: '반바지' },
        skirt: { ru: 'Юбка', en: 'Skirt', uk: 'Спідниця', ka: 'ქვედაკაბა', de: 'Rock', es: 'Falda', fr: 'Jupe', zh: '裙子', ja: 'スカート', ko: '치마' },
        dress: { ru: 'Платье', en: 'Dress', uk: 'Сукня', ka: 'კაბა', de: 'Kleid', es: 'Vestido', fr: 'Robe', zh: '连衣裙', ja: 'ワンピース', ko: '원피스' },
        cargo_pants: { ru: 'Карго', en: 'Cargo pants', uk: 'Карго', ka: 'კარგო შარვალი', de: 'Cargohose', es: 'Pantalones cargo', fr: 'Pantalon cargo', zh: '工装裤', ja: 'カーゴパンツ', ko: '카고 바지' },

        // Footwear
        winter_boots: { ru: 'Зимние ботинки', en: 'Winter boots', uk: 'Зимові черевики', ka: 'ზამთრის ფეხსაცმელი', de: 'Winterstiefel', es: 'Botas de invierno', fr: 'Bottes d\'hiver', zh: '雪地靴', ja: 'ウィンターブーツ', ko: '겨울 부츠' },
        insulated_boots: { ru: 'Утеплённые ботинки', en: 'Insulated boots', uk: 'Утеплені черевики', ka: 'გათბობილი ფეხსაცმელი', de: 'Gefütterte Stiefel', es: 'Botas aislantes', fr: 'Bottes isolées', zh: '保暖靴', ja: '防寒ブーツ', ko: '방한 부츠' },
        leather_boots: { ru: 'Кожаные ботинки', en: 'Leather boots', uk: 'Шкіряні черевики', ka: 'ტყავის ჩექმები', de: 'Lederstiefel', es: 'Botas de cuero', fr: 'Bottes en cuir', zh: '皮靴', ja: 'レザーブーツ', ko: '가죽 부츠' },
        rain_boots: { ru: 'Резиновые сапоги', en: 'Rain boots', uk: 'Гумові чоботи', ka: 'წვიმის ჩექმები', de: 'Gummistiefel', es: 'Botas de lluvia', fr: 'Bottes de pluie', zh: '雨鞋', ja: 'レインブーツ', ko: '장화' },
        hiking_boots: { ru: 'Треккинговые ботинки', en: 'Hiking boots', uk: 'Трекінгові черевики', ka: 'ლაშქრობის ფეხსაცმელი', de: 'Wanderschuhe', es: 'Botas de montaña', fr: 'Chaussures de randonnée', zh: '登山鞋', ja: 'ハイキングブーツ', ko: '등산화' },
        sneakers: { ru: 'Кроссовки', en: 'Sneakers', uk: 'Кросівки', ka: 'სპორტული ფეხსაცმელი', de: 'Sneaker', es: 'Zapatillas', fr: 'Baskets', zh: '运动鞋', ja: 'スニーカー', ko: '운동화' },
        running_shoes: { ru: 'Беговые кроссовки', en: 'Running shoes', uk: 'Бігові кросівки', ka: 'სირბილის ფეხსაცმელი', de: 'Laufschuhe', es: 'Zapatillas running', fr: 'Chaussures de course', zh: '跑鞋', ja: 'ランニングシューズ', ko: '러닝화' },
        loafers: { ru: 'Лоферы', en: 'Loafers', uk: 'Лофери', ka: 'ლოფერი', de: 'Loafer', es: 'Mocasines', fr: 'Mocassins', zh: '乐福鞋', ja: 'ローファー', ko: '로퍼' },
        oxfords: { ru: 'Оксфорды', en: 'Oxfords', uk: 'Оксфорди', ka: 'ოქსფორდი', de: 'Oxfords', es: 'Zapatos Oxford', fr: 'Richelieus', zh: '牛津鞋', ja: 'オックスフォード', ko: '옥스포드' },
        sandals: { ru: 'Сандалии', en: 'Sandals', uk: 'Сандалі', ka: 'სანდლები', de: 'Sandalen', es: 'Sandalias', fr: 'Sandales', zh: '凉鞋', ja: 'サンダル', ko: '샌들' },
        flip_flops: { ru: 'Шлёпанцы', en: 'Flip flops', uk: 'Шльопанці', ka: 'ფლიპ-ფლოპი', de: 'Flip-Flops', es: 'Chanclas', fr: 'Tongs', zh: '人字拖', ja: 'ビーチサンダル', ko: '슬리퍼' },
        canvas_shoes: { ru: 'Кеды', en: 'Canvas shoes', uk: 'Кеди', ka: 'კედები', de: 'Stoffschuhe', es: 'Zapatillas de lona', fr: 'Chaussures en toile', zh: '帆布鞋', ja: 'キャンバスシューズ', ko: '캔버스화' },

        // Accessories
        winter_hat: { ru: 'Шапка-ушанка', en: 'Winter hat', uk: 'Шапка-вушанка', ka: 'ზამთრის ქუდი', de: 'Wintermütze', es: 'Gorro de invierno', fr: 'Chapka', zh: '冬帽', ja: '冬帽子', ko: '겨울 모자' },
        beanie: { ru: 'Шапка', en: 'Beanie', uk: 'Шапка', ka: 'ქუდი', de: 'Mütze', es: 'Gorro', fr: 'Bonnet', zh: '毛线帽', ja: 'ニット帽', ko: '비니' },
        ear_muffs: { ru: 'Наушники', en: 'Ear muffs', uk: 'Навушники', ka: 'ყურსახურავები', de: 'Ohrenschützer', es: 'Orejeras', fr: 'Cache-oreilles', zh: '耳罩', ja: 'イヤーマフ', ko: '귀마개' },
        thick_scarf: { ru: 'Тёплый шарф', en: 'Thick scarf', uk: 'Теплий шарф', ka: 'თბილი შარფი', de: 'Dicker Schal', es: 'Bufanda gruesa', fr: 'Écharpe épaisse', zh: '厚围巾', ja: '厚手マフラー', ko: '두꺼운 목도리' },
        light_scarf: { ru: 'Лёгкий шарф', en: 'Light scarf', uk: 'Легкий шарф', ka: 'მსუბუქი შარფი', de: 'Leichter Schal', es: 'Bufanda ligera', fr: 'Écharpe légère', zh: '薄围巾', ja: '薄手マフラー', ko: '가벼운 스카프' },
        mittens: { ru: 'Варежки', en: 'Mittens', uk: 'Рукавиці', ka: 'ხელთათმანი', de: 'Fäustlinge', es: 'Manoplas', fr: 'Moufles', zh: '连指手套', ja: 'ミトン', ko: '벙어리 장갑' },
        winter_gloves: { ru: 'Зимние перчатки', en: 'Winter gloves', uk: 'Зимові рукавички', ka: 'ზამთრის ხელთათმანები', de: 'Winterhandschuhe', es: 'Guantes de invierno', fr: 'Gants d\'hiver', zh: '冬季手套', ja: '冬用手袋', ko: '겨울 장갑' },
        light_gloves: { ru: 'Лёгкие перчатки', en: 'Light gloves', uk: 'Легкі рукавички', ka: 'მსუბუქი ხელთათმანები', de: 'Leichte Handschuhe', es: 'Guantes ligeros', fr: 'Gants légers', zh: '薄手套', ja: '薄手手袋', ko: '가벼운 장갑' },
        umbrella: { ru: 'Зонт', en: 'Umbrella', uk: 'Парасолька', ka: 'ქოლგა', de: 'Regenschirm', es: 'Paraguas', fr: 'Parapluie', zh: '雨伞', ja: '傘', ko: '우산' },
        sunglasses: { ru: 'Солнцезащитные очки', en: 'Sunglasses', uk: 'Сонцезахисні окуляри', ka: 'სათვალე', de: 'Sonnenbrille', es: 'Gafas de sol', fr: 'Lunettes de soleil', zh: '太阳镜', ja: 'サングラス', ko: '선글라스' },
        cap: { ru: 'Кепка', en: 'Cap', uk: 'Кепка', ka: 'კეპი', de: 'Kappe', es: 'Gorra', fr: 'Casquette', zh: '棒球帽', ja: 'キャップ', ko: '캡' },
        sun_hat: { ru: 'Панама', en: 'Sun hat', uk: 'Панама', ka: 'მზის ქუდი', de: 'Sonnenhut', es: 'Sombrero de sol', fr: 'Chapeau de soleil', zh: '遮阳帽', ja: '日よけ帽子', ko: '썬햇' },
        belt: { ru: 'Ремень', en: 'Belt', uk: 'Ремінь', ka: 'ქამარი', de: 'Gürtel', es: 'Cinturón', fr: 'Ceinture', zh: '腰带', ja: 'ベルト', ko: '벨트' }
    }
};

// Get translated clothing item name
export function getClothingName(itemId, lang = 'ru') {
    return CLOTHING_TRANSLATIONS.items[itemId]?.[lang] || CLOTHING_TRANSLATIONS.items[itemId]?.en || itemId;
}

// Get translated category name
export function getCategoryName(categoryId, lang = 'ru') {
    return CLOTHING_TRANSLATIONS.categories[categoryId]?.[lang] || CLOTHING_TRANSLATIONS.categories[categoryId]?.en || categoryId;
}

// Get all items in a category with suitability flags
export function getCategoryItems(categoryId, weather, lang = 'ru') {
    const category = CLOTHING_DATABASE[categoryId];
    if (!category) return [];

    const temp = weather.temperature;
    const isRainy = ['rain', 'storm'].includes(weather.category);
    const isSnowy = weather.category === 'snow';

    return category.items.map(item => {
        const inTempRange = temp >= item.temp[0] && temp <= item.temp[1];
        const rainMatch = !isRainy || item.rain;
        const snowMatch = !isSnowy || item.snow;
        const suitable = inTempRange && rainMatch && snowMatch;

        return {
            id: item.id,
            name: getClothingName(item.id, lang),
            suitable,
            tempRange: item.temp,
            forRain: item.rain,
            forSnow: item.snow
        };
    });
}

export default CLOTHING_DATABASE;
