/**
 * weatherService.js
 * 気象・天文データ取得モジュール
 * データソース: Open-Meteo API（完全CORS対応、キー不要、無料）
 * 対象都市: 東京、札幌、仙台、金沢、名古屋、大阪、神戸、博多、松山、沖縄
 */

export const CITIES = [
  { id: 'tokyo', name: '東京', region: '関東', lat: 35.6809, lon: 139.7673, desc: '日本の政治・経済の中枢。大規模な都市熱（ヒートアイランド）と巨大消費活動が連動するエリア。' },
  { id: 'sapporo', name: '札幌', region: '北海道', lat: 43.0618, lon: 141.3545, desc: '冷涼な亜寒帯気候。冬の豪雪対策と暖房エネルギー需要が地域経済に直結する北の拠点。' },
  { id: 'sendai', name: '仙台', region: '東北', lat: 38.2682, lon: 140.8694, desc: '杜の都と呼ばれる東北の中枢。太平洋側気候で冷涼なやませ（偏東風）が農業や経済に影響。' },
  { id: 'kanazawa', name: '金沢', region: '北陸', lat: 36.5613, lon: 136.6562, desc: '日本海側特有の多雨雪気候。「弁当忘れても傘忘れるな」と言われる豊かな水資源と文化都市。' },
  { id: 'nagoya', name: '名古屋', region: '東海', lat: 35.1815, lon: 136.9066, desc: '日本最大のものづくり産業圏（中京工業地帯）。夏は猛暑になりやすく工場空調・電力需要が高い。' },
  { id: 'osaka', name: '大阪', region: '近畿', lat: 34.6937, lon: 135.5023, desc: '古くからの商業の都。密集市街地の熱環境や、関西経済圏全体の消費動向のバロメーター。' },
  { id: 'kobe', name: '神戸', region: '近畿', lat: 34.6901, lon: 135.1955, desc: '六甲山と瀬戸内海に囲まれた国際貿易港。山と海からの風（陸海風）が局地的に循環する港湾都市。' },
  { id: 'matsuyama', name: '松山', region: '四国', lat: 33.8392, lon: 132.7656, desc: '温暖少雨な瀬戸内式気候。農業（柑橘類）や水資源確保が地域の重要産業課題。' },
  { id: 'hakata', name: '博多（福岡）', region: '九州', lat: 33.5904, lon: 130.4017, desc: 'アジアの成長を取り込む国際都市。温暖な気候の一方で黄砂やPM2.5、大陸寒波の通り道。' },
  { id: 'okinawa', name: '沖縄（那覇）', region: '沖縄', lat: 26.2124, lon: 127.6809, desc: '日本唯一の亜熱帯気候。観光業や台風の襲来、海洋資源と密接に結びついた独自の経済生態系。' },
];

/** WMO天気コード変換 */
export function wmoToWeather(code) {
  const map = {
    0: { label: '快晴', icon: '☀️', desc: '雲がほとんどなく直達日射が最大。発電効率・外出消費が活発化。' },
    1: { label: '晴れ', icon: '🌤️', desc: '好天。人流が増加し屋外アクティビティが盛んになる気象条件。' },
    2: { label: '晴れ時々曇り', icon: '⛅', desc: '適度な日照と雲量。日常生活や交通に最も安定した気候。' },
    3: { label: '曇り', icon: '☁️', desc: '空全体が雲に覆われ放射冷却が抑えられる。屋内消費が優勢。' },
    45: { label: '霧', icon: '🌫️', desc: '視程が低下。航空機・高速道路・船舶等の交通ダイヤに注意が必要。' },
    48: { label: '着氷性の霧', icon: '🌫️', desc: '過冷却水滴による霧。路面凍結やインフラ設備への着氷リスク。' },
    51: { label: '軽い霧雨', icon: '🌦️', desc: '微細な水滴。傘の需要や近距離交通の利用が微増。' },
    53: { label: '霧雨', icon: '🌦️', desc: 'しとしと降る雨。視界がかすみ湿度が高水準を保つ。' },
    55: { label: '強い霧雨', icon: '🌦️', desc: '密度の高い霧雨。路面のスリップ事故に警戒。' },
    61: { label: '小雨', icon: '🌧️', desc: '弱い雨。デリバリーやEC需要が伸びやすい傾向。' },
    63: { label: '雨', icon: '🌧️', desc: '本格的な降雨。地下街やショッピングモールなど屋内施設へ人流が集中。' },
    65: { label: '激しい雨', icon: '⛈️', desc: '強い雨。河川増水や土砂災害、低地冠水への防災警戒態勢。' },
    71: { label: '小雪', icon: '❄️', desc: '大気中の水蒸気が氷晶となって降下。季節限定の防寒消費が発生。' },
    73: { label: '雪', icon: '❄️', desc: '本格的な降雪。除雪インフラや冬用タイヤ等の経済活動が始動。' },
    75: { label: '大雪', icon: '🌨️', desc: '強い降雪。交通網の麻痺やサプライチェーンの停滞に警戒。' },
    77: { label: 'みぞれ', icon: '🌨️', desc: '雨と雪が混在。体感温度が著しく低下し暖房需要が急増。' },
    80: { label: 'にわか雨', icon: '🌦️', desc: '対流性の局地的な雨。突発的な天候変化で傘の即時需要が発生。' },
    81: { label: '強いにわか雨', icon: '🌧️', desc: '急激な降雨。ゲリラ豪雨的な都市型水害に注意。' },
    82: { label: '激しいにわか雨', icon: '⛈️', desc: '短時間の猛烈な雨。地下道冠水や雷対策が必要。' },
    85: { label: 'にわか雪', icon: '❄️', desc: '突発的な降雪。山間部の峠道でのチェーン規制等に影響。' },
    86: { label: '強いにわか雪', icon: '🌨️', desc: '視界が急激に悪化するホワイトアウト現象に注意。' },
    95: { label: '雷雨', icon: '⛈️', desc: '大気の状態が極めて不安定。落雷による停電対策や精密機器保護。' },
    96: { label: '雷雨（雹を伴う）', icon: '⛈️', desc: '雹による農作物・車輌・家屋への物理的損害リスク。' },
    99: { label: '激しい雷雨（雹）', icon: '⚡', desc: '猛烈な突風と雷雹。防災速報に基づく避難行動を推奨。' },
  };
  return map[code] || { label: `気象コード${code}`, icon: '🌤️', desc: '観測データを解析中。' };
}

/** 風向角度から16方位に変換 */
export function degreesToDirection(deg) {
  if (deg === undefined || deg === null) return '静穏';
  const dirs = ['北', '北北東', '北東', '東北東', '東', '東南東', '南東', '南南東',
                '南', '南南西', '南西', '西南西', '西', '西北西', '北西', '北北西'];
  const idx = Math.round(deg / 22.5) % 16;
  return dirs[idx];
}

/** 天文計算アルゴリズムによる高精度な月齢算出 */
export function calculateMoonPhase(date = new Date()) {
  // 基準新月: 2000年1月6日 18:14 UTC (ジュリアン日換算の定数)
  const knownNewMoon = new Date('2000-01-06T18:14:00Z').getTime();
  const synodicMonth = 29.530588853; // 平均朔望月（日）
  const diffDays = (date.getTime() - knownNewMoon) / (1000 * 60 * 60 * 24);
  let moonAge = diffDays % synodicMonth;
  if (moonAge < 0) moonAge += synodicMonth;

  let phaseName = '新月';
  let emoji = '🌑';
  let description = '太陽と月が同方向にあり地球からは見えない。潮の満ち引き（大潮）が最も大きくなる。';

  if (moonAge >= 1.5 && moonAge < 6.5) {
    phaseName = '三日月';
    emoji = '🌒';
    description = '夕方の西の空に細く輝く月。古来より新たな始まりの象徴。';
  } else if (moonAge >= 6.5 && moonAge < 8.5) {
    phaseName = '上弦の月（半月）';
    emoji = '🌓';
    description = '右半分が輝く月。真昼に東から昇り真夜中に西へ沈む。小潮期へ向かう。';
  } else if (moonAge >= 8.5 && moonAge < 13.5) {
    phaseName = '十日夜（十三夜）';
    emoji = '🌔';
    description = '満月に向かって満ちていく月。夜間の自然光が増加する。';
  } else if (moonAge >= 13.5 && moonAge < 16.5) {
    phaseName = '満月（望）';
    emoji = '🌕';
    description = '太陽の光を真正面から浴びて真円に見える。引力による大潮が発生し漁業や生物活動が活発化。';
  } else if (moonAge >= 16.5 && moonAge < 21.5) {
    phaseName = '十六夜・居待月';
    emoji = '🌖';
    description = '満月から少し欠け始めた月。夜遅くに昇り夜明けまで空を照らす。';
  } else if (moonAge >= 21.5 && moonAge < 23.5) {
    phaseName = '下弦の月（半月）';
    emoji = '🌗';
    description = '左半分が輝く月。真夜中に昇り真昼に沈む。引力干渉が弱まる小潮期。';
  } else if (moonAge >= 23.5 && moonAge < 28.0) {
    phaseName = '有明の月';
    emoji = '🌘';
    description = '夜明け前の東の空に細く残る美しい月。新月に向けて欠けていく。';
  } else {
    phaseName = '新月（朔）';
    emoji = '🌑';
    description = '月が太陽と同じ方向に位置。月明かりのない暗夜となり天体観測に最適。';
  }

  return {
    moonAge: Number(moonAge.toFixed(1)),
    phaseName,
    emoji,
    description
  };
}

/** Open-Meteo API から都市の気象データおよび過去30日履歴を取得 */
export async function fetchCityWeather(city) {
  const url = [
    'https://api.open-meteo.com/v1/forecast',
    `?latitude=${city.lat}&longitude=${city.lon}`,
    '&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m',
    '&daily=temperature_2m_mean,relative_humidity_2m_mean,temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration',
    '&past_days=30',
    '&forecast_days=1',
    '&timezone=Asia%2FTokyo'
  ].join('');

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather HTTP ${res.status}`);
    const data = await res.json();

    const cur = data.current || {};
    const daily = data.daily || {};
    const weatherInfo = wmoToWeather(cur.weather_code);
    const moonInfo = calculateMoonPhase(new Date());

    // 今日の日の出・日の入り・日照時間（配列の末尾）
    const lastIdx = daily.time ? daily.time.length - 1 : 0;
    const sunriseStr = daily.sunrise?.[lastIdx] ? daily.sunrise[lastIdx].split('T')[1] : '--:--';
    const sunsetStr = daily.sunset?.[lastIdx] ? daily.sunset[lastIdx].split('T')[1] : '--:--';
    
    // 日照時間（秒）を「○時間○分」に整形
    const daylightSec = daily.daylight_duration?.[lastIdx] || 0;
    const daylightHours = Math.floor(daylightSec / 3600);
    const daylightMinutes = Math.floor((daylightSec % 3600) / 60);
    const daylightFormatted = daylightSec > 0 ? `${daylightHours}時間${daylightMinutes}分` : '計算中';

    // 過去30日のトレンドデータ（平均気温、平均湿度、日付ラベル）
    const dates = (daily.time || []).slice(0, 30).map(d => {
      const parts = d.split('-');
      return `${parseInt(parts[1], 10)}/${parseInt(parts[2], 10)}`;
    });
    const tempTrend = (daily.temperature_2m_mean || []).slice(0, 30);
    const humidityTrend = (daily.relative_humidity_2m_mean || []).slice(0, 30);

    // 最高・最低気温
    const maxTemp = daily.temperature_2m_max?.[lastIdx] !== undefined ? daily.temperature_2m_max[lastIdx].toFixed(1) : '--';
    const minTemp = daily.temperature_2m_min?.[lastIdx] !== undefined ? daily.temperature_2m_min[lastIdx].toFixed(1) : '--';

    return {
      success: true,
      city,
      current: {
        temp: cur.temperature_2m !== undefined ? cur.temperature_2m.toFixed(1) : '--',
        humidity: cur.relative_humidity_2m !== undefined ? cur.relative_humidity_2m : '--',
        windSpeed: cur.wind_speed_10m !== undefined ? cur.wind_speed_10m.toFixed(1) : '--',
        windDirection: degreesToDirection(cur.wind_direction_10m),
        weatherLabel: weatherInfo.label,
        weatherIcon: weatherInfo.icon,
        weatherDesc: weatherInfo.desc,
        maxTemp,
        minTemp,
        sunrise: sunriseStr,
        sunset: sunsetStr,
        daylightDuration: daylightFormatted,
        moon: moonInfo
      },
      history: {
        dates,
        tempTrend,
        humidityTrend
      }
    };
  } catch (error) {
    console.error(`City ${city.name} weather fetch error:`, error);
    // フォールバック（ネットワークオフライン時にも美しい表示を維持）
    return getFallbackCityWeather(city);
  }
}

/** オフライン・フォールバックデータ生成 */
function getFallbackCityWeather(city) {
  const moonInfo = calculateMoonPhase(new Date());
  const dates = [];
  const tempTrend = [];
  const humidityTrend = [];
  const baseTemp = city.lat > 40 ? 12.0 : city.lat < 30 ? 25.0 : 18.0;

  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(`${d.getMonth() + 1}/${d.getDate()}`);
    const noise = Math.sin(i / 3) * 3 + (Math.random() * 1.5 - 0.75);
    tempTrend.push(Number((baseTemp + noise).toFixed(1)));
    humidityTrend.push(Math.round(60 + Math.cos(i / 2) * 15));
  }

  return {
    success: false,
    isFallback: true,
    city,
    current: {
      temp: baseTemp.toFixed(1),
      humidity: 62,
      windSpeed: '3.2',
      windDirection: '北北東',
      weatherLabel: '晴れ時々曇り',
      weatherIcon: '⛅',
      weatherDesc: '快適な気候。日常生活や学習に集中しやすい環境です。',
      maxTemp: (baseTemp + 4).toFixed(1),
      minTemp: (baseTemp - 3).toFixed(1),
      sunrise: '05:50',
      sunset: '17:05',
      daylightDuration: '11時間15分',
      moon: moonInfo
    },
    history: {
      dates,
      tempTrend,
      humidityTrend
    }
  };
}
