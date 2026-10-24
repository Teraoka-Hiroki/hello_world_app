<script>
  // アルゴリズム理論解説コンポーネント
</script>

<div class="space-y-8 animate-fade-in">

  <!-- ヘッダーバナー -->
  <div class="glass-panel rounded-2xl p-6 border-l-4 border-l-purple-500 shadow-xl">
    <div class="flex items-center gap-3">
      <span class="text-3xl p-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400">🧠</span>
      <div>
        <h2 class="text-lg sm:text-xl font-extrabold text-white">
          実装アルゴリズムの理論と数学的・物理的背景
        </h2>
        <p class="text-xs sm:text-sm text-slate-400 mt-1">
          本アプリが数値をどのように処理・解析し、未来の兆候を捉えているのか。高校で学ぶ数学・物理・情報・天文学の理論と直結した完全解説です。
        </p>
      </div>
    </div>
  </div>

  <!-- セクション1: トレンド解析と統計アルゴリズム -->
  <div class="glass-card rounded-2xl p-6 sm:p-7 space-y-4">
    <div class="flex items-center gap-2 text-indigo-400">
      <span class="text-lg">📊</span>
      <h3 class="text-base sm:text-lg font-bold text-white">
        1. 時系列データの平滑化とトレンド判定理論（統計学・情報科学）
      </h3>
    </div>

    <p class="text-xs sm:text-sm text-slate-300 leading-relaxed text-balance-jp">
      株価や気温などの時系列データには、日々の突発的なノイズ（ランダムウォーク成分）が大量に含まれます。このノイズに惑わされず、背後にある本質的な「流れ（トレンド）」を取り出すために、本アプリでは以下の数理モデルを背景に設計しています。
    </p>

    <!-- SMA & EMA -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
      <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
        <h4 class="text-xs sm:text-sm font-bold text-cyan-400 mb-2">① 単純移動平均（SMA: Simple Moving Average）</h4>
        <div class="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[11px] font-mono text-cyan-300 mb-2">
          SMA_t = (1 / N) * Σ [i=0 から N-1] P_(t-i)
        </div>
        <p class="text-xs text-slate-300 leading-relaxed text-balance-jp">
          直近 N 日間の平均値を計算する最も直感的な平滑化手法です。過去の極端な外れ値の影響を薄める効果がありますが、過去のすべてのデータ点を等しい重み（1/N）で扱うため、急激なトレンド転換に対して「位相の遅延（タイムラグ）」が生じる数学的特性があります。
        </p>
      </div>

      <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
        <h4 class="text-xs sm:text-sm font-bold text-indigo-400 mb-2">② 指数平滑移動平均（EMA: Exponential Moving Average）</h4>
        <div class="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[11px] font-mono text-indigo-300 mb-2">
          EMA_t = α * P_t + (1 - α) * EMA_(t-1)  (ここで α = 2 / (N + 1))
        </div>
        <p class="text-xs text-slate-300 leading-relaxed text-balance-jp">
          直近の価格ほど指数関数的に大きな重みを与え、過去に遡るほど重みを幾何級数的に減衰させる手法です。過去の全履歴を再帰的に保持しながら、最新の市場変化に対してSMAよりも遥かに鋭敏に反応するため、現代のアルゴリズム取引や高頻度取引（HFT）の基本素子として採用されています。
        </p>
      </div>
    </div>

    <!-- 最小二乗法による線形回帰 -->
    <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
      <h4 class="text-xs sm:text-sm font-bold text-purple-400">
        ③ 最小二乗法によるトレンド線の傾きと決定係数（Linear Regression &amp; R²）
      </h4>
      <p class="text-xs sm:text-sm text-slate-300 leading-relaxed text-balance-jp">
        過去30日間のデータ点を (x1, y1), (x2, y2), ..., (xn, yn) とするとき、残差平方和 Σ [yi - (a * xi + b)]² を最小化する偏微分条件より、傾き a と切片 b は以下のように一意に決定されます。
      </p>
      <div class="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] sm:text-xs font-mono text-purple-300 overflow-x-auto">
        a = [ n * Σ(xi * yi) - (Σxi) * (Σyi) ] / [ n * Σ(xi²) - (Σxi)² ]<br>
        b = (Σyi - a * Σxi) / n
      </div>
      <p class="text-xs text-slate-300 leading-relaxed text-balance-jp">
        傾き a &gt; 0 であれば上昇基調、a &lt; 0 であれば下落基調と判定します。さらに、データの全変動のうち直線モデルで説明できる割合を表す「決定係数 R²」を算出し、R² &gt; 0.6 の場合は「強固な一方向トレンド」、R² &lt; 0.2 の場合は「方向感のない保ち合い・レンジ相場」として客観的に分類可能です。
      </p>
    </div>

    <!-- ボラティリティ -->
    <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
      <h4 class="text-xs sm:text-sm font-bold text-rose-400">
        ④ ボラティリティ（リスク）の統計的定義
      </h4>
      <p class="text-xs sm:text-sm text-slate-300 leading-relaxed text-balance-jp">
        金融工学では、「価格のブレ幅」をリスクと呼びます。日次対数リターン rt = ln(Pt / Pt-1) を定義し、その標本標準偏差 s を年間営業日数（約250日）でスケーリングした値 σ_annual = s * √250 を年率ボラティリティと呼びます。原油や個別株のようにボラティリティが高い資産ほど、将来の予測不確実性が高いことを意味します。
      </p>
    </div>
  </div>

  <!-- セクション2: 天文計算アルゴリズム -->
  <div class="glass-card rounded-2xl p-6 sm:p-7 space-y-4">
    <div class="flex items-center gap-2 text-amber-400">
      <span class="text-lg">🪐</span>
      <h3 class="text-base sm:text-lg font-bold text-white">
        2. 天文物理計算アルゴリズム（天文学・球面三角法）
      </h3>
    </div>

    <p class="text-xs sm:text-sm text-slate-300 leading-relaxed text-balance-jp">
      気象タブで表示されている「日の出・日の入り時刻」「日照時間」「月齢」は、天体の幾何学的な運行方程式をプログラムで直接解くことによって導出されています。
    </p>

    <!-- 日の出日の入り計算の数理 -->
    <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
      <h4 class="text-xs sm:text-sm font-bold text-amber-300">
        ① 球面天文学に基づく日の出・日の入りの時角方程式
      </h4>
      <p class="text-xs sm:text-sm text-slate-300 leading-relaxed text-balance-jp">
        地球の自転軸は公転軌道面に対して約23.44度傾いています。観測地点の緯度を φ、太陽の赤緯を δ とするとき、天球上の球面三角法（余弦定理）から、日の出・日の入りの瞬間の太陽の時角 H0 は以下の厳密解を持ちます。
      </p>
      <div class="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] sm:text-xs font-mono text-amber-300 overflow-x-auto">
        cos(H0) = [ sin(h0) - sin(φ) * sin(δ) ] / [ cos(φ) * cos(δ) ]
      </div>
      <p class="text-xs text-slate-300 leading-relaxed text-balance-jp">
        ここで h0 は地平線に対する太陽高度の補正値であり、幾何学的な 0度 ではなく、大気の屈折（約34分角）と太陽の見かけの半径（約16分角）を差し引いた <strong class="text-amber-200">-0.833度（-50分角）</strong> を代入します。この大気差補正を行わないと、実際の日の出・日の入り時刻と数分間のズレが生じます。さらに、地球の楕円軌道に起因する「均時差（Equation of Time）」を加味して標準時（JST）へ変換しています。
      </p>
    </div>

    <!-- 月齢・朔望月アルゴリズム -->
    <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
      <h4 class="text-xs sm:text-sm font-bold text-sky-300">
        ② ユリウス日（Julian Day）と朔望周期による月齢導出
      </h4>
      <p class="text-xs sm:text-sm text-slate-300 leading-relaxed text-balance-jp">
        月が新月から次の新月へと戻る周期を「朔望月（Synodic Month）」と呼び、その平均周期は精密な天体測定によって <strong class="text-sky-200">29.530588853日（約29日12時間44分2.9秒）</strong> と求められています。本アプリでは、西暦2000年1月6日18時14分（UTC）の新月（エポック）を基準とし、現在時刻までの経過日数を剰余演算（Modulo）することで、ミリ秒精度の連続月齢をリアルタイムに計算しています。
      </p>
      <div class="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] sm:text-xs font-mono text-sky-300 overflow-x-auto">
        MoonAge = [ ( 現在時刻ミリ秒 - 基準新月ミリ秒 ) / ( 1000 * 60 * 60 * 24 ) ] mod 29.530588853
      </div>
      <p class="text-xs text-slate-300 leading-relaxed text-balance-jp">
        月齢が 0 のときが新月（朔）、約 7.4 で上弦、約 14.8 で満月（望）、約 22.1 で下弦となります。月と太陽の引力が重なる新月・満月時には海面の「大潮」が発生し、海洋生物の産卵や沿岸部の航行計画に決定的な影響を与えます。
      </p>
    </div>
  </div>

  <!-- セクション3: 気象物理モデルとデータ同化 -->
  <div class="glass-card rounded-2xl p-6 sm:p-7 space-y-4">
    <div class="flex items-center gap-2 text-cyan-400">
      <span class="text-lg">🌪️</span>
      <h3 class="text-base sm:text-lg font-bold text-white">
        3. 気象数値予報モデルとデータ同化技術（流体力学・大気物理学）
      </h3>
    </div>

    <p class="text-xs sm:text-sm text-slate-300 leading-relaxed text-balance-jp">
      本アプリの気象データは、ヨーロッパ中期予報センター（ECMWF）の世界最高峰再解析モデル「ERA5」およびドイツ気象局（DWD）の高解像度モデル「ICON」をAPI経由でリアルタイム統合しています。
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
        <h4 class="text-xs sm:text-sm font-bold text-cyan-400 mb-1">① 支配方程式（Navier-Stokes方程式）</h4>
        <p class="text-xs text-slate-300 leading-relaxed text-balance-jp">
          大気は地球表面を覆う粘性流体です。地球の自転に伴うコリオリ力、気圧傾度力、重力、摩擦力を組み込んだナビエ・ストークス方程式と熱力学第1法則、連続の式（質量保存則）を、スーパーコンピュータが3次元格子メッシュ上で数値積分して大気の未来状態を計算しています。
        </p>
      </div>

      <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
        <h4 class="text-xs sm:text-sm font-bold text-cyan-400 mb-1">② 4次元変分法（4D-Var）によるデータ同化</h4>
        <p class="text-xs text-slate-300 leading-relaxed text-balance-jp">
          世界中の気象衛星（ひまわり等）、気象レーダー、AMeDAS地上観測網、航空機の観測データを、物理シミュレーションと統計的に最適合成する「データ同化」が行われています。観測機器の誤差を最小化し、地球大気全体の真の物理状態を再現する最先端の応用数学です。
        </p>
      </div>
    </div>
  </div>

  <!-- セクション4: 前日比（変動率）の正確な計算法 -->
  <div class="glass-card rounded-2xl p-6 sm:p-7 space-y-4">
    <div class="flex items-center gap-2 text-rose-400">
      <span class="text-lg">📈</span>
      <h3 class="text-base sm:text-lg font-bold text-white">
        4. 金融・資源市場における前日比（騰落率）と市場時間整合性アルゴリズム
      </h3>
    </div>

    <p class="text-xs sm:text-sm text-slate-300 leading-relaxed text-balance-jp">
      金融市場における「前日比（Change）」は、単に「昨日の同時刻の価格との差」ではありません。正規の取引所が定めた公式な「前営業日終値（Previous Close）」との差分です。
    </p>

    <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
      <div class="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] sm:text-xs font-mono text-rose-300 overflow-x-auto">
        変動額（ΔP） = 現在値（P_current） - 公式前日終値（P_previousClose）<br>
        騰落率（%） = [ 変動額（ΔP） / |P_previousClose| ] * 100
      </div>
      <p class="text-xs text-slate-300 leading-relaxed text-balance-jp">
        週末（土曜日・日曜日）や各国の祝日、市場ごとの取引時間帯（東京市場 9:00〜15:30、ニューヨーク市場 9:30〜16:00 EDT）の違いによるタイムスタンプのズレを自動検出し、公式の regularMarketChange / fulldayChange メタデータと照合することで、100%正確な前日比を算出しています。
      </p>
    </div>
  </div>

  <!-- セクション5: フロントエンド完結アーキテクチャのセキュリティ理論 -->
  <div class="glass-card rounded-2xl p-6 sm:p-7 space-y-4 border-l-4 border-l-emerald-500">
    <div class="flex items-center gap-2 text-emerald-400">
      <span class="text-lg">🛡️</span>
      <h3 class="text-base sm:text-lg font-bold text-white">
        5. 完全フロントエンド設計とゼロデータトラッキング（情報セキュリティ）
      </h3>
    </div>

    <p class="text-xs sm:text-sm text-slate-300 leading-relaxed text-balance-jp">
      本アプリは、ユーザーのプライバシーと機密性を最優先するために「完全なクライアントサイド（フロントエンド）実行アーキテクチャ」を採用しています。
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
      <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
        <p class="font-bold text-emerald-400 mb-1">① サーバー送信ゼロの原則</p>
        <p class="text-balance-jp">
          君が記録した探究メモや思考の履歴は、ブラウザの内部ストレージ（Web Storage / LocalStorage）にのみ保存されます。外部のサーバーへ君の文章や閲覧履歴が送信されることは1バイトたりともありません。
        </p>
      </div>

      <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
        <p class="font-bold text-emerald-400 mb-1">② 通信の暗号化（HTTPS / TLS 1.3）</p>
        <p class="text-balance-jp">
          外部から取得する気象や市場データは、すべて暗号化された安全なプロトコル（HTTPS）を介して取得されます。通信途中で第三者によるデータの盗聴や改ざんが行われるリスクを完全に遮断しています。
        </p>
      </div>

      <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
        <p class="font-bold text-emerald-400 mb-1">③ 追跡トラッカー・Cookieの完全排除</p>
        <p class="text-balance-jp">
          広告配信タグ、行動追跡用Cookie、サードパーティ製アナリティクスは一切組み込まれていません。学校の端末や個人のPCでも、安心・安全に探究学習に集中できる環境を保証しています。
        </p>
      </div>
    </div>
  </div>

</div>
