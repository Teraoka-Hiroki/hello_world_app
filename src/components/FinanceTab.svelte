<script>
  import TrendChart from './TrendChart.svelte';

  export let financeData = [];
  export let loading = false;
</script>

<div class="space-y-6">

  <!-- ヘッダーバナー -->
  <div class="glass-panel rounded-2xl p-4 sm:p-5">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h2 class="text-sm sm:text-base font-bold text-indigo-400 flex items-center gap-2">
          <span>📈</span> 世界の金融市場・主要株価指数＆外国為替
        </h2>
        <p class="text-xs text-slate-400 mt-0.5 text-balance-jp leading-relaxed">
          東京・ニューヨーク・上海の株式市場と、グローバルマネーが往来する為替レート。毎秒何兆円もの資金が「誰が次の社会を創るか」に投票しています。
        </p>
      </div>
      <div class="text-xs text-slate-400 flex items-center gap-1.5 self-start sm:self-auto shrink-0">
        <span class="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
        <span>グローバル市場データ統合</span>
      </div>
    </div>
  </div>

  {#if loading && (!financeData || financeData.length === 0)}
    <div class="glass-panel rounded-2xl p-12 text-center">
      <div class="inline-block animate-spin text-3xl mb-3">🌀</div>
      <p class="text-sm font-semibold text-indigo-400">世界の主要金融指標を取得中...</p>
      <p class="text-xs text-slate-500 mt-1">東京証券取引所・NY証券取引所・外国為替市場のリアルタイムレートを照合しています</p>
    </div>
  {:else if financeData && financeData.length > 0}
    <!-- 6枚の金融指標カードグリッド -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each financeData as item}
        <div class="glass-card rounded-2xl p-5 flex flex-col justify-between group">
          
          <div>
            <!-- 上部: アイコン ＆ ティッカー ＆ 市場 -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-2xl p-2 rounded-xl bg-slate-900/80 border border-slate-800 shadow-inner">
                  {item.icon}
                </span>
                <div>
                  <h3 class="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {item.name}
                  </h3>
                  <span class="text-[11px] font-mono text-slate-400">
                    {item.symbol} ・ {item.market}
                  </span>
                </div>
              </div>
            </div>

            <!-- 現在値 ＆ 前日比 -->
            <div class="mt-4 flex items-baseline justify-between gap-2 flex-wrap">
              <div class="flex items-baseline gap-1.5">
                <span class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                  {item.decimals === 0 ? Math.round(item.current).toLocaleString('ja-JP') : item.current.toLocaleString('ja-JP', { minimumFractionDigits: item.decimals, maximumFractionDigits: item.decimals })}
                </span>
                <span class="text-xs font-bold text-indigo-300">{item.unit}</span>
              </div>

              <!-- 変動バッジ -->
              <div class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold font-mono
                {item.change.direction === 'up'
                  ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                  : item.change.direction === 'down'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
                }"
              >
                <span>{item.change.direction === 'up' ? '▲' : item.change.direction === 'down' ? '▼' : '―'}</span>
                <span>{item.change.formatted}</span>
              </div>
            </div>

            <!-- 30日間ミニチャート -->
            <div class="mt-3 bg-slate-950/40 rounded-xl p-2 border border-slate-800/60">
              <div class="flex items-center justify-between text-[10px] text-slate-400 mb-1 px-1">
                <span>過去30日間の推移</span>
                <span class="font-mono">単位: {item.unit}</span>
              </div>
              <TrendChart
                data={item.series}
                labels={item.dates}
                category="finance"
                unit={item.unit}
                height={110}
                decimals={item.decimals}
              />
            </div>
          </div>

          <!-- 高校生向け解説セクション -->
          <div class="mt-4 pt-3 border-t border-slate-800/80">
            <p class="text-[11px] font-bold text-indigo-300 mb-1 flex items-center gap-1">
              <span>💡</span> ビジネス＆生活への視点
            </p>
            <p class="text-xs text-slate-300 leading-relaxed text-balance-jp">
              {item.teenDesc}
            </p>
          </div>

        </div>
      {/each}
    </div>

    <!-- 高校生向け知見コラム: 金融市場の本質 -->
    <div class="glass-panel rounded-2xl p-5 border-l-4 border-l-indigo-500">
      <h3 class="text-sm sm:text-base font-bold text-white flex items-center gap-2">
        <span>💡</span> 高校生のための探究視点：株価と為替は「社会の未来への期待票」
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-xs text-slate-300 leading-relaxed">
        <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <p class="font-bold text-indigo-400 mb-1">① なぜ大人は株価を気にするのか？</p>
          <p class="text-balance-jp">
            株価は「過去の実績」ではなく「その会社が未来にどれだけ社会の役に立ち、利益を生むか」への期待で決まります。新薬開発やクリーンエネルギー、AI技術など、より良い未来を信じる資金が集まることで、新しい産業が誕生します。
          </p>
        </div>
        <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <p class="font-bold text-indigo-400 mb-1">② 円安・円高と君のポケットマネー</p>
          <p class="text-balance-jp">
            1ドル100円が150円（円安）になると、1000ドルの海外製スマホは10万円から15万円に跳ね上がります。逆に日本のゲームやアニメ、自動車は海外で安く買えるため大人気になります。為替は世界のパワーバランスの縮図です。
          </p>
        </div>
        <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <p class="font-bold text-indigo-400 mb-1">③ 退屈な日常の裏で動く何百兆円</p>
          <p class="text-balance-jp">
            君が教室で授業を受けている間にも、地球の裏側では機関投資家や起業家が、気候変動や宇宙開発、医療革命に資金を投じています。世界は停滞などしておらず、常に変化し続けています。
          </p>
        </div>
      </div>
    </div>

    <!-- 金融アルゴリズムの理論解説カード -->
    <div class="glass-panel rounded-2xl p-5 sm:p-6 border border-indigo-500/30 bg-indigo-950/10">
      <div class="flex items-center gap-2 text-indigo-400 mb-2">
        <span class="text-xl">📐</span>
        <h3 class="text-sm sm:text-base font-bold text-white">
          金融指標で使われているアルゴリズムの理論解説
        </h3>
      </div>
      <p class="text-xs text-slate-400 mb-4 leading-relaxed text-balance-jp">
        各カードに表示されている前日比（変動値・騰落率）および30日間折れ線グラフの背後にある数学・統計アルゴリズムです。
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
        <!-- 前日比と公式終値整合性 -->
        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <h4 class="font-bold text-rose-300 flex items-center gap-1.5">
            <span>📈</span> 前営業日終値（Previous Close）に基づく前日比算出
          </h4>
          <div class="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-rose-300">
            変動額 ΔP = P_current - P_previousClose<br>
            騰落率 (%) = ( ΔP / |P_previousClose| ) * 100
          </div>
          <p class="text-[11px] text-slate-400 leading-relaxed text-balance-jp">
            単なる「24時間前の値」ではなく、東京証券取引所（15:30引け）やNY証券取引所（16:00 EDT引け）の公式前営業日終値と直接照合。週末や祝日による休場期間のタイムスタンプズレを正確に自動補正しています。
          </p>
        </div>

        <!-- 線形回帰と移動平均 -->
        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <h4 class="font-bold text-indigo-300 flex items-center gap-1.5">
            <span>📊</span> トレンド判定と平滑化（SMA・最小二乗法）
          </h4>
          <div class="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-indigo-300">
            傾き a = [ n*Σ(xy) - (Σx)(Σy) ] / [ n*Σ(x²) - (Σx)² ]
          </div>
          <p class="text-[11px] text-slate-400 leading-relaxed text-balance-jp">
            30日間の日次データ系列からランダムウォーク・ノイズを除去し、最小二乗法による回帰直線 y = ax + b の傾き a から中期的な資本フローの上昇・下降トレンドの強さを客観的に判定します。
          </p>
        </div>
      </div>
    </div>
  {/if}

</div>
