/**
 * marketService.js
 * 金融市場・資源市場データ取得モジュール
 * データソース: Yahoo Finance API (Vercel Proxy / AllOrigins / 高精度フォールバック)
 */

export const FINANCE_INDICATORS = [
  {
    id: 'nikkei',
    symbol: '^N225',
    name: '日経平均株価',
    unit: '円',
    icon: '📈',
    decimals: 0,
    market: '東京証券取引所',
    baseVal: 38800,
    vol: 450,
    shortDesc: '日本を代表する主要225社の平均株価。',
    teenDesc: '「日本の会社が今後どれくらい成長しそうか」という世の中の期待度を映す鏡です。株価が上がると企業の設備投資や採用・給与が増えやすくなり、私たちの暮らしの活気に繋がります。'
  },
  {
    id: 'dow',
    symbol: '^DJI',
    name: 'NYダウ工業株30種',
    unit: 'USD',
    icon: '🗽',
    decimals: 0,
    market: 'ニューヨーク証券取引所',
    baseVal: 42800,
    vol: 350,
    shortDesc: '世界を牽引する米国トップ企業30社。',
    teenDesc: 'AppleやMicrosoft、マクドナルドなど、私たちが毎日接している世界最強の企業群の成績表です。アメリカの景気は世界中のビジネスに直結するため、世界中の大人が毎晩注目しています。'
  },
  {
    id: 'shanghai',
    symbol: '000001.SS',
    name: '上海総合指数',
    unit: 'CNY',
    icon: '🇨🇳',
    decimals: 2,
    market: '上海証券取引所',
    baseVal: 3280,
    vol: 45,
    shortDesc: '世界第2位の経済大国・中国の株価動向。',
    teenDesc: '巨大な工場や市場を持つ中国の景気を表します。中国でスマホや自動車が売れているかどうかは、日本の製造業や部品メーカーの売上にも極めて大きな影響を与えます。'
  },
  {
    id: 'usdjpy',
    symbol: 'USDJPY=X',
    name: '為替（米ドル / 円）',
    unit: '円/USD',
    icon: '💵',
    decimals: 2,
    market: '外国為替市場',
    baseVal: 152.4,
    vol: 1.2,
    shortDesc: '世界の基軸通貨米ドルと日本円の交換比率。',
    teenDesc: '「円安（数値が大きい）」になると、海外で作られたiPhoneや小麦粉、ガソリンが高くなります。逆に日本のアニメや車が海外で安く売れるため、輸出企業には追い風となります。'
  },
  {
    id: 'eurjpy',
    symbol: 'EURJPY=X',
    name: '為替（ユーロ / 円）',
    unit: '円/EUR',
    icon: '🇪🇺',
    decimals: 2,
    market: '外国為替市場',
    baseVal: 165.2,
    vol: 1.1,
    shortDesc: '欧州連合主要国で使われるユーロと円の比率。',
    teenDesc: 'ヨーロッパ経済全体の体力や金利差を示します。欧州からの輸入車や高級ブランド、海外旅行コスト、そして地政学的な安定性を測る指標です。'
  },
  {
    id: 'eurusd',
    symbol: 'EURUSD=X',
    name: '為替（ユーロ / 米ドル）',
    unit: 'USD/EUR',
    icon: '💶',
    decimals: 4,
    market: '外国為替市場',
    baseVal: 1.0850,
    vol: 0.006,
    shortDesc: '世界で最も取引高が大きい最大の通貨ペア。',
    teenDesc: '地球規模で動く巨額のマネーが「アメリカに向かっているか、ヨーロッパに向かっているか」を示す世界経済の潮流そのものです。'
  }
];

export const RESOURCE_INDICATORS = [
  {
    id: 'wti',
    symbol: 'CL=F',
    name: 'WTI原油先物',
    unit: 'USD/bbl',
    icon: '🛢️',
    decimals: 2,
    market: 'ニューヨーク商業取引所 (NYMEX)',
    baseVal: 71.8,
    vol: 1.8,
    shortDesc: '米国産標準原油。現代文明のエネルギー基盤。',
    teenDesc: '車のガソリンだけでなく、電気を作る火力発電、文房具や服のプラスチック原料、輸送トラックの燃料など、私たちが手にするほぼ全ての製品の価格に直結する「現代の血液」です。'
  },
  {
    id: 'brent',
    symbol: 'BZ=F',
    name: 'ブレント原油',
    unit: 'USD/bbl',
    icon: '⛽',
    decimals: 2,
    market: 'ロンドンICE取引所',
    baseVal: 75.6,
    vol: 1.8,
    shortDesc: '欧州・中東・アジアを結ぶ国際原油価格の基準。',
    teenDesc: '中東から日本へタンカーで運ばれる石油の価格目安となります。中東の紛争や海峡の航路リスクが高まると急騰し、世界中の物流コストを押し上げます。'
  },
  {
    id: 'gold',
    symbol: 'GC=F',
    name: '金（ゴールド先物）',
    unit: 'USD/oz',
    icon: '🥇',
    decimals: 1,
    market: 'COMEX取引所',
    baseVal: 2730,
    vol: 35,
    shortDesc: '数千年の人類史を貫く「究極の安全資産」。',
    teenDesc: '紙幣と違って国が滅びても価値を失わないため、戦争やインフレ（物価上昇）など世界が不安定になったときに「金を買って身を守ろう」と資金が集まります。'
  },
  {
    id: 'silver',
    symbol: 'SI=F',
    name: '銀（シルバー先物）',
    unit: 'USD/oz',
    icon: '🥈',
    decimals: 2,
    market: 'COMEX取引所',
    baseVal: 33.6,
    vol: 1.2,
    shortDesc: '貴金属の魅力と産業用ハイテク需要を併せ持つ。',
    teenDesc: '宝飾品としてだけでなく、電気を通す性能が全金属中トップのため、太陽光パネルやEV（電気自動車）、AI半導体の配線に大量に使われる脱炭素社会の必須金属です。'
  },
  {
    id: 'copper',
    symbol: 'HG=F',
    name: '銅（Dr. Copper）',
    unit: 'USD/lb',
    icon: '🔩',
    decimals: 3,
    market: 'COMEX取引所',
    baseVal: 4.38,
    vol: 0.12,
    shortDesc: '景気の先行きを予言する「ドクター・コッパー」。',
    teenDesc: '建物の配線から送電網、スマホ、モーターまであらゆる産業で使われるため、世界中で工場が動き出すと銅の注文が急増します。そのため「景気を診断する医者」と呼ばれます。'
  },
  {
    id: 'aluminum',
    symbol: 'ALI=F',
    name: 'アルミニウム先物',
    unit: 'USD/t',
    icon: '🏭',
    decimals: 1,
    market: 'ロンドン金属取引所 (LME)',
    baseVal: 2640,
    vol: 45,
    shortDesc: '軽量・高強度。「電気の缶詰」と呼ばれる金属。',
    teenDesc: '飛行機や新幹線、車の車体、飲料缶、窓サッシに使われます。ボーキサイトからアルミを作るには膨大な電力が必要なため、世界の電力コスト動向を強く反映します。'
  }
];

/** 前日比・変化率計算 */
export function calculateChange(current, previous, customDiff = null, customPct = null, decimals = 2) {
  let diff = 0;
  let percent = 0;

  if (customDiff !== null && customDiff !== undefined && !isNaN(customDiff)) {
    diff = Number(customDiff);
    if (customPct !== null && customPct !== undefined && !isNaN(customPct)) {
      percent = Number(customPct);
    } else if (previous && previous !== 0) {
      percent = (diff / Math.abs(previous)) * 100;
    }
  } else if (previous !== undefined && previous !== null && previous !== 0 && !isNaN(previous)) {
    diff = current - previous;
    percent = (diff / Math.abs(previous)) * 100;
  }

  const direction = diff > 0.00001 ? 'up' : diff < -0.00001 ? 'down' : 'flat';
  const sign = diff > 0 ? '+' : '';

  // 適切な桁数でフォーマット
  let diffFormatted = '';
  if (decimals === 0) {
    diffFormatted = Math.abs(diff) >= 10 ? Math.round(diff).toLocaleString('ja-JP') : diff.toFixed(1);
  } else if (decimals >= 3) {
    diffFormatted = diff.toFixed(decimals);
  } else {
    diffFormatted = diff.toFixed(2);
  }

  return {
    diff,
    percent,
    direction,
    formatted: `${sign}${diffFormatted} (${sign}${percent.toFixed(2)}%)`
  };
}

/** 1つの指標データを取得 */
export async function fetchMarketIndicator(indicator) {
  const params = new URLSearchParams({
    interval: '1d',
    range: '35d',
    includePrePost: 'false'
  });

  const urlsToTry = [
    `/proxy/yahoo/${encodeURIComponent(indicator.symbol)}?${params}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${indicator.symbol}?${params}`)}`
  ];

  for (const url of urlsToTry) {
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) continue;
      const json = await res.json();
      const result = json?.chart?.result?.[0];
      if (!result) continue;

      const closes = result.indicators?.quote?.[0]?.close || [];
      const timestamps = result.timestamp || [];
      const validPoints = [];

      for (let i = 0; i < closes.length; i++) {
        if (closes[i] !== null && closes[i] !== undefined && timestamps[i]) {
          validPoints.push({
            close: Number(closes[i]),
            ts: timestamps[i]
          });
        }
      }

      if (validPoints.length < 5) continue;

      const meta = result.meta || {};
      const rmp = meta.regularMarketPrice;
      const rmt = meta.regularMarketTime;
      const lastPoint = validPoints[validPoints.length - 1];
      const current = rmp !== undefined ? Number(rmp.toFixed(indicator.decimals)) : Number(lastPoint.close.toFixed(indicator.decimals));

      // 取引日時（rmt）と時系列末尾データ（lastPoint.ts）の整合性を判定
      // 24時間（86400秒）以内であれば、時系列末尾は「今日」のデータ
      const isSameDay = rmt && lastPoint.ts && Math.abs(rmt - lastPoint.ts) < 86400;

      let prevClose;
      let finalSeries = [];
      let finalDates = [];

      if (isSameDay) {
        // 時系列末尾が「今日」のデータであるため、前日終値は1つ前の点
        prevClose = validPoints.length >= 2
          ? Number(validPoints[validPoints.length - 2].close.toFixed(indicator.decimals))
          : current;

        const sliced = validPoints.slice(-30);
        finalSeries = sliced.map(p => Number(p.close.toFixed(indicator.decimals)));
        // グラフ末尾の値をリアルタイム最新値 current に同期
        finalSeries[finalSeries.length - 1] = current;
        finalDates = sliced.map(p => {
          const d = new Date(p.ts * 1000);
          return `${d.getMonth() + 1}/${d.getDate()}`;
        });
      } else {
        // 時系列末尾が「前営業日」までの確定データであるため、前日終値は末尾の点
        prevClose = Number(lastPoint.close.toFixed(indicator.decimals));

        // 直近29日分の過去終値 ＋ 今日の最新値 current を末尾に結合
        const sliced = validPoints.slice(-29);
        finalSeries = sliced.map(p => Number(p.close.toFixed(indicator.decimals)));
        finalSeries.push(current);
        finalDates = sliced.map(p => {
          const d = new Date(p.ts * 1000);
          return `${d.getMonth() + 1}/${d.getDate()}`;
        });
        const today = new Date();
        finalDates.push(`${today.getMonth() + 1}/${today.getDate()}`);
      }

      // 前日比計算（現在値 current と 前営業日終値 prevClose の差分・変化率）
      const diff = current - prevClose;
      const change = calculateChange(current, prevClose, diff, null, indicator.decimals);

      return {
        id: indicator.id,
        name: indicator.name,
        symbol: indicator.symbol,
        unit: indicator.unit,
        icon: indicator.icon,
        decimals: indicator.decimals,
        market: indicator.market,
        shortDesc: indicator.shortDesc,
        teenDesc: indicator.teenDesc,
        current,
        previous: prevClose,
        change,
        series: finalSeries,
        dates: finalDates,
        isFallback: false
      };
    } catch (e) {
      // 次のURLへ
    }
  }

  // 全て失敗した場合はリアルなフォールバックを生成
  return generateFallbackIndicator(indicator);
}

/** フォールバックデータ生成 */
function generateFallbackIndicator(indicator) {
  const dates = [];
  const series = [];
  let val = indicator.baseVal;
  const now = new Date();

  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    dates.push(`${d.getMonth() + 1}/${d.getDate()}`);
    // ランダムウォーク＋微小ドリフト
    const delta = (Math.random() - 0.48) * (indicator.vol * 0.4);
    val += delta;
    series.push(Number(val.toFixed(indicator.decimals)));
  }

  const current = series[series.length - 1];
  const previous = series[series.length - 2];
  const change = calculateChange(current, previous, null, null, indicator.decimals);

  return {
    id: indicator.id,
    name: indicator.name,
    symbol: indicator.symbol,
    unit: indicator.unit,
    icon: indicator.icon,
    decimals: indicator.decimals,
    market: indicator.market,
    shortDesc: indicator.shortDesc,
    teenDesc: indicator.teenDesc,
    current,
    previous,
    change,
    series,
    dates,
    isFallback: true
  };
}

/** 金融指標一覧を取得 */
export async function fetchAllFinance() {
  const promises = FINANCE_INDICATORS.map(ind => fetchMarketIndicator(ind));
  return await Promise.all(promises);
}

/** 資源指標一覧を取得 */
export async function fetchAllResources() {
  const promises = RESOURCE_INDICATORS.map(ind => fetchMarketIndicator(ind));
  return await Promise.all(promises);
}
