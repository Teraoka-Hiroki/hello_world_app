<script>
  import { createEventDispatcher } from 'svelte';
  import { CITIES } from '../services/weatherService';
  import TrendChart from './TrendChart.svelte';

  export let weatherData = null;
  export let currentCity = CITIES[0];
  export let loading = false;

  const dispatch = createEventDispatcher();

  function selectCity(city) {
    if (city.id === currentCity.id) return;
    dispatch('cityChange', city);
  }
</script>

<div class="space-y-6">

  <!-- 都市選択バー（10都市切り替え） -->
  <div class="glass-panel rounded-2xl p-4 sm:p-5">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
      <div>
        <h2 class="text-sm sm:text-base font-bold text-cyan-400 flex items-center gap-2">
          <span>📍</span> 観測都市セレクター（全国10主要拠点）
        </h2>
        <p class="text-xs text-slate-400 mt-0.5">
          北の札幌から南の沖縄まで、地域ごとの気候差と社会・エネルギー需要の連動を比較できます。
        </p>
      </div>
      <div class="text-xs text-slate-400 flex items-center gap-1.5 self-start sm:self-auto">
        <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        <span>Open-Meteo 高精度気象物理モデル</span>
      </div>
    </div>

    <!-- 都市ボタン一覧 -->
    <div class="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
      {#each CITIES as city}
        <button
          type="button"
          on:click={() => selectCity(city)}
          class="flex flex-col items-center justify-center py-2 px-2 rounded-xl text-xs font-semibold transition border
            {currentCity.id === city.id
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20 font-bold'
              : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }"
        >
          <span class="text-xs opacity-75">{city.region}</span>
          <span class="text-sm mt-0.5">{city.name}</span>
        </button>
      {/each}
    </div>

    <!-- 選択中都市の解説 -->
    <div class="mt-3 pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs text-slate-300">
      <span class="text-cyan-400 font-bold shrink-0">【{currentCity.name}の地域特性】</span>
      <p class="leading-relaxed text-balance-jp">{currentCity.desc}</p>
    </div>
  </div>

  {#if loading}
    <div class="glass-panel rounded-2xl p-12 text-center">
      <div class="inline-block animate-spin text-3xl mb-3">🌀</div>
      <p class="text-sm font-semibold text-cyan-400">{currentCity.name}の気象データを解析中...</p>
      <p class="text-xs text-slate-500 mt-1">過去30日間の気象アーカイブとリアルタイム物理モデルを照合しています</p>
    </div>
  {:else if weatherData && weatherData.current}
    <!-- メインカードグリッド -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- カード1: 天気概況 ＆ 気温 -->
      <div class="glass-card rounded-2xl p-5 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">天候 ＆ 気温</span>
            <span class="text-2xl">{weatherData.current.weatherIcon}</span>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {weatherData.current.temp}
            </span>
            <span class="text-lg font-bold text-cyan-400">℃</span>
          </div>
          <p class="text-sm font-bold text-slate-200 mt-1">
            {weatherData.current.weatherLabel}
          </p>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-800/80">
          <div class="flex justify-between text-xs text-slate-400">
            <span>最高 / 最低</span>
            <span class="font-mono text-slate-200">
              <span class="text-rose-400 font-bold">{weatherData.current.maxTemp}℃</span> / 
              <span class="text-sky-400 font-bold">{weatherData.current.minTemp}℃</span>
            </span>
          </div>
          <p class="text-[11px] text-slate-400 mt-1 leading-snug text-balance-jp">
            {weatherData.current.weatherDesc}
          </p>
        </div>
      </div>

      <!-- カード2: 湿度 ＆ 風速・風向 -->
      <div class="glass-card rounded-2xl p-5 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">湿度 ＆ 大気循環</span>
            <span class="text-2xl">💧</span>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {weatherData.current.humidity}
            </span>
            <span class="text-lg font-bold text-cyan-400">%</span>
          </div>
          <p class="text-xs text-slate-300 mt-1">
            風向: <span class="font-semibold text-white">{weatherData.current.windDirection}</span> / 
            風速: <span class="font-semibold text-white">{weatherData.current.windSpeed} m/s</span>
          </p>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-800/80">
          <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div class="bg-gradient-to-r from-sky-400 to-cyan-500 h-1.5 rounded-full" style="width: {weatherData.current.humidity}%"></div>
          </div>
          <p class="text-[11px] text-slate-400 mt-2 leading-snug text-balance-jp">
            湿度は体感温度やインフルエンザウイルス活性、食品鮮度管理の重要管理指標です。
          </p>
        </div>
      </div>

      <!-- カード3: 日の出・日の入り ＆ 日照時間 -->
      <div class="glass-card rounded-2xl p-5 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">太陽 ＆ 日照</span>
            <span class="text-2xl">🌅</span>
          </div>
          <div class="mt-3">
            <span class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {weatherData.current.daylightDuration}
            </span>
            <span class="text-xs font-semibold text-amber-400 block mt-0.5">昼の長さ</span>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-300">
          <div class="flex justify-between">
            <span class="text-slate-400">🌅 日の出</span>
            <span class="font-mono font-bold text-amber-300">{weatherData.current.sunrise}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">🌇 日の入り</span>
            <span class="font-mono font-bold text-rose-300">{weatherData.current.sunset}</span>
          </div>
          <p class="text-[11px] text-slate-400 pt-1 leading-snug text-balance-jp">
            緯度と季節による日照の変化は、太陽光発電量と人々の生活リズムを支配します。
          </p>
        </div>
      </div>

      <!-- カード4: 月齢 ＆ 月相（天文計算） -->
      <div class="glass-card rounded-2xl p-5 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">天文 ＆ 潮汐（月相）</span>
            <span class="text-2xl">{weatherData.current.moon.emoji}</span>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {weatherData.current.moon.moonAge}
            </span>
            <span class="text-xs font-bold text-cyan-400">日目 (月齢)</span>
          </div>
          <p class="text-sm font-bold text-indigo-300 mt-1">
            {weatherData.current.moon.phaseName}
          </p>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-800/80">
          <p class="text-[11px] text-slate-400 leading-snug text-balance-jp">
            {weatherData.current.moon.description}
          </p>
          <div class="mt-2 text-[10px] text-slate-500 font-mono">
            朔望周期: 29.530588日 (ジュリアン日計算)
          </div>
        </div>
      </div>

    </div>

    <!-- 過去30日間のトレンドグラフ（気温 ＆ 湿度） -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- 気温トレンドグラフ -->
      <div class="glass-panel rounded-2xl p-5">
        <div class="flex items-center justify-between mb-3">
          <div>
            <h3 class="text-sm font-bold text-white flex items-center gap-1.5">
              <span class="text-cyan-400">📈</span> {currentCity.name}・過去30日間の平均気温推移
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">日ごとの平均気温の移り変わり（℃）</p>
          </div>
          <span class="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            30日間推移
          </span>
        </div>
        {#if weatherData.history && weatherData.history.tempTrend}
          <TrendChart
            data={weatherData.history.tempTrend}
            labels={weatherData.history.dates}
            category="weather"
            unit="℃"
            height={180}
            decimals={1}
          />
        {/if}
        <div class="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>※ Open-Meteo ERA5再解析アーカイブ統合</span>
          <span>マウスを合わせると日付と詳細値が表示されます</span>
        </div>
      </div>

      <!-- 湿度トレンドグラフ -->
      <div class="glass-panel rounded-2xl p-5">
        <div class="flex items-center justify-between mb-3">
          <div>
            <h3 class="text-sm font-bold text-white flex items-center gap-1.5">
              <span class="text-sky-400">💧</span> {currentCity.name}・過去30日間の平均湿度推移
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">日ごとの大気中水蒸気量の変化（%）</p>
          </div>
          <span class="text-xs font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
            30日間推移
          </span>
        </div>
        {#if weatherData.history && weatherData.history.humidityTrend}
          <TrendChart
            data={weatherData.history.humidityTrend}
            labels={weatherData.history.dates}
            category="weather"
            unit="%"
            height={180}
            decimals={0}
          />
        {/if}
        <div class="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>※ 気圧配置や前線の通過に伴う周期的な変動</span>
          <span>高湿度期は洗濯や屋外作業効率に影響</span>
        </div>
      </div>

    </div>

    <!-- 高校生向け知見コラム: 気象と社会・ビジネスのダイナミズム -->
    <div class="glass-panel rounded-2xl p-5 border-l-4 border-l-cyan-500">
      <h3 class="text-sm sm:text-base font-bold text-white flex items-center gap-2">
        <span>💡</span> 高校生のための探究視点：気象データは巨大ビジネスの羅針盤
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-xs text-slate-300 leading-relaxed">
        <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <p class="font-bold text-cyan-400 mb-1">① コンビニ・外食の「気温指数」</p>
          <p class="text-balance-jp">
            気温が1℃上がるとアイスや炭酸飲料の売上が数千万円単位で跳ね上がり、22℃を下回るとおでんや中華まんが爆発的に売れます。AIによる気象連動発注システムがフードロスを削減しています。
          </p>
        </div>
        <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <p class="font-bold text-cyan-400 mb-1">② 電力市場と再生可能エネルギー</p>
          <p class="text-balance-jp">
            快晴で太陽光発電がフル稼働すると、昼間の電力卸売価格がほぼ0円に急落することがあります。逆に猛暑や厳冬でエアコン需要が高まると、発電所の燃料調達競争が激化します。
          </p>
        </div>
        <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <p class="font-bold text-cyan-400 mb-1">③ 物流とサプライチェーンの強靭化</p>
          <p class="text-balance-jp">
            台風や大雪は道路や港湾を寸断します。運送会社や工場は気象レーダーデータを秒単位で解析し、迂回ルートや先行出荷を指示して、私たちが暮らす街の品切れを防いでいます。
          </p>
        </div>
      </div>
    </div>

    <!-- 気象・天文アルゴリズムの理論解説カード -->
    <div class="glass-panel rounded-2xl p-5 sm:p-6 border border-cyan-500/30 bg-cyan-950/10">
      <div class="flex items-center gap-2 text-cyan-400 mb-2">
        <span class="text-xl">📐</span>
        <h3 class="text-sm sm:text-base font-bold text-white">
          気象・天文指標で使われているアルゴリズムの理論解説
        </h3>
      </div>
      <p class="text-xs text-slate-400 mb-4 leading-relaxed text-balance-jp">
        本画面に表示されている数値は、天文学の幾何学方程式と流体力学の数値予報モデルによって導き出されています。
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
        <!-- 日の出日の入り計算 -->
        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <h4 class="font-bold text-amber-300 flex items-center gap-1.5">
            <span>🌅</span> 日の出・日の入りの時角方程式（球面三角法）
          </h4>
          <div class="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-amber-300">
            cos(H0) = [ sin(h0) - sin(φ) * sin(δ) ] / [ cos(φ) * cos(δ) ]
          </div>
          <p class="text-[11px] text-slate-400 leading-relaxed text-balance-jp">
            観測地点の緯度 φ、太陽赤緯 δ、大気差補正角 h0 = -0.833度（-50分角：太陽の視半径16分角＋大気屈折34分角）を用いて時角 H0 を算出。さらに地球公転の楕円軌道に起因する「均時差」を加えて正確な日本標準時（JST）を求めています。
          </p>
        </div>

        <!-- 月齢計算 -->
        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <h4 class="font-bold text-indigo-300 flex items-center gap-1.5">
            <span>🌓</span> 月齢と月相のユリウス日アルゴリズム
          </h4>
          <div class="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-indigo-300">
            MoonAge = [ ( 現在時刻ms - 基準新月ms ) / 86400000 ] mod 29.530588853
          </div>
          <p class="text-[11px] text-slate-400 leading-relaxed text-balance-jp">
            平均朔望月 29.530588853日（約29日12時間44分2.9秒）を周期とし、基準新月エポック（2000年1月6日18:14 UTC）からの経過時間を剰余演算（モジュロ）して、ミリ秒精度の連続月齢と潮汐状態（大潮・小潮）を判定しています。
          </p>
        </div>
      </div>
    </div>
  {/if}

</div>
