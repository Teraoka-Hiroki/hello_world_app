/**
 * exportService.js
 * 探究レポートのテキスト（Markdown / TXT）ダウンロードおよびPDF印刷エクスポート機能
 */

/** テキストファイルとしてダウンロード */
export function downloadTextReport({ weatherData, financeData, resourceData, notes, currentCity }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' });
  const timeStr = now.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });

  let text = '';
  text += `====================================================================\n`;
  text += `  高校生向け指標トレンドアプリ「Hello World」探究レポート\n`;
  text += `  作成日時: ${dateStr} ${timeStr}\n`;
  text += `  テラオカ電子の自由探究ゼミ\n`;
  text += `  「自分が価値を置くものに向かって こつこつ努力する姿ほど 素晴らしいものはない」\n`;
  text += `====================================================================\n\n`;

  // 1. 気象情報
  text += `【1. 気象動向・地球環境】\n`;
  if (weatherData && weatherData.current) {
    const w = weatherData.current;
    text += `・観測地点: ${currentCity?.name || '東京'} (${currentCity?.region || '関東'})\n`;
    text += `・天気概況: ${w.weatherLabel} (${w.weatherIcon})\n`;
    text += `・現在気温: ${w.temp} ℃ (最高: ${w.maxTemp}℃ / 最低: ${w.minTemp}℃)\n`;
    text += `・湿度: ${w.humidity} %\n`;
    text += `・風向・風速: ${w.windDirection} ${w.windSpeed} m/s\n`;
    text += `・日の出/日の入り: ${w.sunrise} / ${w.sunset} (日照時間: ${w.daylightDuration})\n`;
    text += `・月齢・月相: 月齢 ${w.moon?.moonAge}日 (${w.moon?.phaseName} ${w.moon?.emoji})\n`;
    text += `・地域特性: ${currentCity?.desc || ''}\n`;
  } else {
    text += `  気象データ未取得\n`;
  }
  text += `\n`;

  // 2. 金融市場動向
  text += `【2. 世界の金融市場動向】\n`;
  if (financeData && financeData.length > 0) {
    financeData.forEach(item => {
      text += `・${item.name} (${item.symbol}): ${item.current.toLocaleString('ja-JP')} ${item.unit}\n`;
      text += `  前日比: ${item.change.formatted} | 市場: ${item.market}\n`;
      text += `  ビジネス視点: ${item.teenDesc}\n\n`;
    });
  } else {
    text += `  金融データ未取得\n\n`;
  }

  // 3. 資源・エネルギー市場動向
  text += `【3. 資源・エネルギー市場動向】\n`;
  if (resourceData && resourceData.length > 0) {
    resourceData.forEach(item => {
      text += `・${item.name} (${item.symbol}): ${item.current.toLocaleString('ja-JP')} ${item.unit}\n`;
      text += `  前日比: ${item.change.formatted} | 市場: ${item.market}\n`;
      text += `  社会・生活視点: ${item.teenDesc}\n\n`;
    });
  } else {
    text += `  資源データ未取得\n\n`;
  }

  // 4. 私の探究ノート・気づきと感想
  text += `====================================================================\n`;
  text += `【4. 探究メモ・気づきと考察】\n`;
  text += `====================================================================\n`;
  if (notes && notes.length > 0) {
    notes.forEach((n, idx) => {
      const created = new Date(n.createdAt).toLocaleString('ja-JP');
      text += `[#${idx + 1}] ${n.title || '無題の気づき'} (${created})\n`;
      text += `カテゴリ: ${n.category || '全体'} | 都市: ${n.city || '選択なし'}\n`;
      text += `内容:\n${n.text}\n`;
      text += `--------------------------------------------------------------------\n`;
    });
  } else {
    text += `(まだ記録された探究メモはありません。アプリのメモ欄に日々の気づきを記録してみましょう！)\n`;
  }

  text += `\n© 2026 Teraoka-Denshi. All rights reserved.\n`;

  // ファイルダウンロード処理
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const filename = `HelloWorld_探究レポート_${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}.txt`;
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

/** PDF印刷ダイアログを起動 */
export function triggerPdfExport() {
  window.print();
}
