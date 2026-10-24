<script>
  import TrendChart from './TrendChart.svelte';

  export let resourceData = [];
  export let loading = false;
</script>

<div class="space-y-6">

  <!-- ヘッダーバナー -->
  <div class="glass-panel rounded-2xl p-4 sm:p-5">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h2 class="text-sm sm:text-base font-bold text-amber-400 flex items-center gap-2">
          <span>🛢️</span> 国際資源市場・エネルギー＆産業マテリアル
        </h2>
        <p class="text-xs text-slate-400 mt-0.5 text-balance-jp leading-relaxed">
          私たちの日常を支えるエネルギー、ハイテク機器を動かす金属、有事の安全資産。物理的な「地球の恵み」が世界経済を根底から駆動しています。
        </p>
      </div>
      <div class="text-xs text-slate-400 flex items-center gap-1.5 self-start sm:self-auto shrink-0">
        <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
        <span>実物資産コモディティ市場統合</span>
      </div>
    </div>
  </div>

  {#if loading && (!resourceData || resourceData.length === 0)}
    <div class="glass-panel rounded-2xl p-12 text-center">
      <div class="inline-block animate-spin text-3xl mb-3">🌀</div>
      <p class="text-sm font-semibold text-amber-400">世界の主要資源指標を取得中...</p>
      <p class="text-xs text-slate-500 mt-1">NYMEX原油・COMEX金銀銅・LMEアルミニウムの最新取引価格を照合しています</p>
    </div>
  {:else if resourceData && resourceData.length > 0}
    <!-- 6枚の資源指標カードグリッド -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each resourceData as item}
        <div class="glass-card rounded-2xl p-5 flex flex-col justify-between group">
          
          <div>
            <!-- 上部: アイコン ＆ ティッカー ＆ 市場 -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-2xl p-2 rounded-xl bg-slate-900/80 border border-slate-800 shadow-inner">
                  {item.icon}
                </span>
                <div>
                  <h3 class="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
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
                <span class="text-xs font-bold text-amber-300">{item.unit}</span>
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
                category="resources"
                unit={item.unit}
                height={110}
                decimals={item.decimals}
              />
            </div>
          </div>

          <!-- 高校生向け解説セクション -->
          <div class="mt-4 pt-3 border-t border-slate-800/80">
            <p class="text-[11px] font-bold text-amber-300 mb-1 flex items-center gap-1">
              <span>💡</span> 社会インフラ＆産業への視点
            </p>
            <p class="text-xs text-slate-300 leading-relaxed text-balance-jp">
              {item.teenDesc}
            </p>
          </div>

        </div>
      {/each}
    </div>

    <!-- 高校生向け知見コラム: 資源と地球社会 -->
    <div class="glass-panel rounded-2xl p-5 border-l-4 border-l-amber-500">
      <h3 class="text-sm sm:text-base font-bold text-white flex items-center gap-2">
        <span>💡</span> 高校生のための探究視点：世界を形づくる「マテリアルの奪い合い」
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-xs text-slate-300 leading-relaxed">
        <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <p class="font-bold text-amber-400 mb-1">① 原油が上がると学校のノートも上がる？</p>
          <p class="text-balance-jp">
            原油は単なる燃料ではありません。化学工場でナフサに分解され、ペットボトル、シャープペンのプラスチック、服のポリエステル繊維、印刷インクに姿を変えます。原油価格の上昇は、私たちが買うすべての文具や日用品に波及します。
          </p>
        </div>
        <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <p class="font-bold text-amber-400 mb-1">② なぜ銅は「ドクター（博士）」と呼ばれるのか？</p>
          <p class="text-balance-jp">
            銅（Copper）は電気を非常によく通すため、工場の送電網、ビル設備、新幹線の架線、エアコンの熱交換器に使われます。景気が回復すると工場やビル建設が真っ先に始まるため、どんな経済学者よりも早く景気の好転を言い当てます。
          </p>
        </div>
        <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <p class="font-bold text-amber-400 mb-1">③ 地球の物質循環と脱炭素のジレンマ</p>
          <p class="text-balance-jp">
            太陽光パネルには大量の銀、電気自動車（EV）には通常のガソリン車の約4倍の銅、車体軽量化には大量のアルミニウムが必要です。地球環境を守る脱炭素化を進めるほど、金属資源の採掘競争が激化するという面白い逆説があります。
          </p>
        </div>
      </div>
    </div>

    <!-- 資源・コモディティアルゴリズムの理論解説カード -->
    <div class="glass-panel rounded-2xl p-5 sm:p-6 border border-amber-500/30 bg-amber-950/10">
      <div class="flex items-center gap-2 text-amber-400 mb-2">
        <span class="text-xl">📐</span>
        <h3 class="text-sm sm:text-base font-bold text-white">
          資源・コモディティ市場で使われているアルゴリズムの理論解説
        </h3>
      </div>
      <p class="text-xs text-slate-400 mb-4 leading-relaxed text-balance-jp">
        原油や貴金属などの実物資産（コモディティ）データ解析において不可欠な数理統計モデルです。
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
        <!-- ボラティリティと対数リターン -->
        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <h4 class="font-bold text-amber-300 flex items-center gap-1.5">
            <span>📈</span> 対数収益率（Log Return）とリスク分散アルゴリズム
          </h4>
          <div class="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-amber-300">
            rt = ln( Pt / Pt-1 )<br>
            σ_annual = s * √250
          </div>
          <p class="text-[11px] text-slate-400 leading-relaxed text-balance-jp">
            価格の単純変化率ではなく「対数リターン」を算出することで、時間の経過に伴う複利効果を加法的に集計可能にします。日次標準偏差 s を年率換算したボラティリティにより、地政学リスクによる価格急変幅を定量化します。
          </p>
        </div>

        <!-- 先物曲線とコンタンゴ/バックワーデーション -->
        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <h4 class="font-bold text-amber-300 flex items-center gap-1.5">
            <span>🛢️</span> 前営業日終値（Previous Close）照合と期近つなぎ足アルゴリズム
          </h4>
          <div class="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-amber-300">
            P_previous = P_current - officialFulldayChange
          </div>
          <p class="text-[11px] text-slate-400 leading-relaxed text-balance-jp">
            原油や金先物（NYMEX / COMEX）は限月（満期）があるため、最も取引が活発な「期近物（Front Month）」のデータを連続接続（つなぎ足）処理し、取引所公式の fulldayChange と正確に同期して前日比を算出しています。
          </p>
        </div>
      </div>
    </div>
  {/if}

</div>
