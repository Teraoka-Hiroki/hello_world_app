# 高校生向け指標トレンドアプリ「Hello World」
### 現代社会のダイナミズムを可視化する知の羅針盤ダッシュボード

<p align="center">
  <strong>「変わりない日常に退屈しているとき、ビジネスの世界では、みんなが活動していることを知り、自分も頑張ろうと思う高校生へ」</strong><br>
  気象・金融・資源の生きた動向をリアルタイムで追跡し、世界と自分の未来をつなぐ教育探究ダッシュボード
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Svelte-5-FF3E00?style=for-the-badge&logo=svelte&logoColor=white" alt="Svelte 5">
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Chart.js-4-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Chart.js">
  <img src="https://img.shields.io/badge/Vercel-Deployment-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
  <img src="https://img.shields.io/badge/Zero_Tracking-Client_Only-10B981?style=for-the-badge&logo=shield&logoColor=white" alt="Security">
</p>

---

## 🎯 開発の目的と対象ユーザー像

### ⓪ 目的
高校生が学校と家の往復という狭い世界だけに閉じこもるのではなく、**「今この瞬間も、地球規模でダイナミックに動いている外の世界」**に目を向けるきっかけを提供することです。

### 対象ユーザー像
> **「変わりない日常に退屈しているとき、ビジネスの世界では、世界中の大人たちが毎秒必死に活動し価値を生み出していることを知り、『自分も負けずに今日を頑張ろう』と思える高校生」**

子ども扱いのまわりくどい説明を排し、高校の授業（数学I・II・B・C、物理、地学、情報I、公共・政治経済）で学ぶ基礎理論と現実社会の生きた指標を結びつける、本格的で正確な情報を提供します。

---

## ✨ アプリの主な機能と特徴

### 1. 🌤️ 気象情報（全国10主要都市セレクター）
- **対象都市**: 東京、札幌、仙台、金沢、名古屋、大阪、神戸、博多（福岡）、松山、沖縄（那覇）の10都市をワンクリックで瞬時に切り替え。
- **リアルタイム指標**:
  - 天気概況（WMO天気コードに準拠したアイコンと詳細解説）
  - 現在気温、当日最高・最低気温（℃）
  - 湿度（%）
  - 風向（16方位）および風速（m/s）
  - 日の出・日の入り時刻（JST）および日照時間（昼の長さ）
  - 天文計算アルゴリズムによる月齢（日目）、月相名（新月、上弦、満月、下弦など）、潮汐・天体解説
- **過去30日間のトレンドグラフ**:
  - 日次平均気温推移（℃）
  - 日次平均湿度推移（%）
- **高校生向け探究コラム**:
  - 気温1℃の変化がもたらすコンビニ・外食産業の需要変動
  - 太陽光発電と天候が左右する電力卸売市場の仕組み
  - 台風・豪雪時のサプライチェーンと物流の強靭化

### 2. 📈 金融市場（世界主要株価＆為替レート）
- **対象指標**:
  1. 日経平均株価（`^N225`）- 東京証券取引所
  2. NYダウ工業株30種（`^DJI`）- ニューヨーク証券取引所
  3. 上海総合指数（`000001.SS`）- 上海証券取引所
  4. 米ドル/円 為替レート（`USDJPY=X`）
  5. ユーロ/円 為替レート（`EURJPY=X`）
  6. ユーロ/米ドル 為替レート（`EURUSD=X`）
- **表示内容**:
  - 現在値、前日比終値との差分および騰落率（▲上昇 / ▼下落カラーバッジ）
  - 過去30日間のインタラクティブ折れ線チャート（Chart.js）
  - 「ビジネス＆生活への視点」（高校生が身近な買い物や将来の仕事と結びつけて理解できる簡潔な解説）
- **高校生向け探究コラム**:
  - なぜ世界中の大人たちは株価を気にするのか（未来の社会への期待票）
  - 円安・円高とスマートフォンの価格・海外旅行
  - 君が教室にいる間にも動く何百兆円ものグローバル資本

### 3. 🛢️ 資源市場（エネルギー＆産業マテリアル）
- **対象指標**:
  1. WTI原油先物（`CL=F`）- 現代文明の血液
  2. ブレント原油先物（`BZ=F`）- 国際石油取引の基準
  3. 金（ゴールド先物 `GC=F`）- 究極の安全資産
  4. 銀（シルバー先物 `SI=F`）- ハイテク脱炭素金属
  5. 銅（`HG=F`）- 景気先行指標「ドクター・コッパー」
  6. アルミニウム先物（`ALI=F`）- 電気の缶詰
- **表示内容**:
  - 現在値、前日比差分・騰落率、市場名
  - 過去30日間のミニトレンドチャート
  - 「社会インフラ＆産業への視点」
- **高校生向け探究コラム**:
  - 原油価格と文房具（プラスチック）、通学定期代、電気料金のつながり
  - なぜ銅は「景気を診断する医者」と呼ばれるのか
  - 脱炭素・EV社会が引き起こす金属資源の争奪戦

### 4. 🧠 アルゴリズム理論解説
高校数学・物理・情報・天文学の授業と直結する本格的な理論解説ページを内蔵：
- **トレンド解析と平滑化**:
  - 単純移動平均（SMA）の定義式と位相遅延（Lag）
  - 指数平滑移動平均（EMA）の再帰式 α = 2 / (N + 1)
  - 最小二乗法による線形回帰直線 y = ax + b の傾きと決定係数 R² の数学的導出
  - 対数リターンと年率換算ボラティリティ σ_annual = s * √250
- **市場時間整合性と正規前日終値アルゴリズム**:
  - 取引所の公式前営業日終値（Previous Close / regularMarketChange / fulldayChange）に基づく厳密な前日比（変動値・騰落率）の自動照合
  - 祝日・週末の休場期間や時差によるタイムスタンプズレの自動補正
- **天文物理計算**:
  - 球面三角法による日の出・日の入りの時角方程式 $\cos H_0$
  - 大気差（$-34'$）と太陽視半径（$-16'$）を考慮した視高度補正角（$-0.833^\circ$）
  - 均時差（Equation of Time）による太陽時と標準時（JST）の変換
  - 朔望月（平均29.530588853日）とユリウス日（Julian Day）に基づくリアルタイム月齢モジュロ演算
- **気象物理モデルとデータ同化**:
  - ナビエ・ストークス方程式と流体力学支配方程式
  - 4次元変分法（4D-Var）による観測データと物理シミュレーションの最適合成

### 5. 📝 私の探究ノート（気づき・感想メモ ＆ 履歴保存）
- **思考を深めるヒントボタン**:
  - 「💡 今日の最大変化」「🔗 生活とのつながり」「🌍 外の世界の発見」「🎯 明日への自分メモ」をワンクリックで挿入可能。
- **完全フロントエンド保存（LocalStorage）**:
  - メモの追加・編集・削除機能。
  - 次回アクセス時にも前回のメモ、選択していた都市、アクティブタブ、閲覧ログが自動的に復元されます。

### 6. 📥 探究レポート出力（テキスト ＆ PDF）
- **テキスト出力（.txt）**:
  - 当日の気象、金融、資源の最新数値、前日比、および記録した全探究メモを整理した構造化レポートをワンクリックでダウンロード。
- **PDF印刷出力**:
  - 印刷用専用CSS（`@media print`）により、ブラウザの印刷画面から美しいA4レポートとして「PDFに保存」可能。

### 7. 🛡️ 完全フロントエンド設計とセキュリティ
- **サーバーへの個人データ送信ゼロ**:
  - メモや閲覧ログは100%ユーザーのブラウザ内（LocalStorage）にのみ安全に格納されます。
  - 追跡Cookieや外部アナリティクス、サードパーティ広告は一切不使用。学校のPCや個人のスマートフォンでも安心して利用できます。

---

## 🎨 デザイン仕様

- **フレームワーク**: Svelte 5 + Vite 5 + Tailwind CSS
- **カラーテーマ**: 洗練されたダークモード（`#070b14` 深宇宙ダーク、`#0f172a` カード基調）
- **アクセントカラー**:
  - 気象情報: シアン（Cyan `#06b6d4`）
  - 金融市場: インディゴ（Indigo `#6366f1`）
  - 資源市場: アンバー（Amber `#f59e0b`）
  - 理論解説: パープル（Purple `#a855f7`）
  - セキュリティ: エメラルド（Emerald `#10b981`）
- **タイポグラフィ**:
  - Google Fonts（`Inter` + `Noto Sans JP`）
  - 不自然な単語途中での折り返しを防止する `text-balance-jp`（`text-wrap: balance` / `word-break: keep-all`）
  - 数値の桁揃えを美しく見せる等幅数字（`font-mono` / `tabular-nums`）
- **ヘッダー・ロゴ**:
  - 左側にタイトルとサブキャッチ、右側にリアルタイム時計と指定の「テラオカ電子の自由探究ゼミ」プロフィールロゴを水平配置。
- **フッター**:
  - `© 2026 Teraoka-Denshi. All rights reserved.`、探究ゼミ理念、免責事項。

---

## 🗂️ ディレクトリ構成

```
指標トレンドHelloWorld/
├── public/
│   └── teraoka.png              # プロフィールロゴ画像
├── src/
│   ├── components/
│   │   ├── Header.svelte        # タイトル・時計・指定ロゴ
│   │   ├── TabNav.svelte        # タブ切替・レポート出力・メモジャンプ
│   │   ├── WeatherTab.svelte    # 10都市切替・気象カード・30日気温/湿度グラフ
│   │   ├── FinanceTab.svelte    # 6金融指標・前日比・30日チャート・高校生解説
│   │   ├── ResourcesTab.svelte  # 6資源指標・前日比・30日チャート・高校生解説
│   │   ├── AlgorithmTab.svelte  # 数学・天文学・データ科学の長文理論解説
│   │   ├── MemoSection.svelte   # 探究メモ入力・思考ヒント・履歴復元
│   │   ├── ExportModal.svelte   # テキスト/PDFエクスポートダイアログ
│   │   ├── TrendChart.svelte    # Chart.js 再利用可能折れ線グラフ
│   │   ├── SecurityBadge.svelte # 完全フロントエンド・セキュリティ解説
│   │   └── Footer.svelte        # コピーライト・免責事項フッター
│   ├── services/
│   │   ├── weatherService.js    # Open-Meteo API連携・10都市定義・天文計算
│   │   ├── marketService.js     # Yahoo Finance API連携・前日比・指標定義
│   │   ├── storageService.js    # LocalStorage 履歴・メモ・環境設定管理
│   │   └── exportService.js     # TXTダウンロード・PDF印刷トリガー
│   ├── App.svelte               # メインアプリケーションコンポーネント
│   ├── app.css                  # Tailwind・ダークテーマ・印刷用スタイル
│   └── main.js                  # Svelte アプリケーションエントリーポイント
├── index.html                   # HTMLエントリー・Google Fonts
├── vite.config.js               # Vite 設定（Yahoo Finance API プロキシ設定含む）
├── svelte.config.js             # Svelte コンパイラ設定
├── tailwind.config.js           # Tailwind CSS カラー・フォント拡張
├── postcss.config.js            # PostCSS プラグイン
├── vercel.json                  # Vercel 本番デプロイ設定（Rewriteプロキシ・セキュリティヘッダー）
├── package.json                 # プロジェクト依存定義
└── README.md                    # 本ドキュメント
```

---

## 🚀 ローカルでの開発・実行手順

### 必要な環境
- **Node.js**: v18.0.0 以上（推奨: v20 以上）
- **npm**: v9.0.0 以上

### 1. 依存パッケージのインストール
```bash
npm install
```

### 2. ローカル開発サーバーの起動
```bash
npm run dev
```
ターミナルに表示されるローカルURL（例: `http://localhost:5173`）をブラウザで開きます。
ホットモジュールリプレイスメント（HMR）により、コードの変更が瞬時に画面に反映されます。

### 3. 本番用ビルドと動作確認
```bash
# 本番向け静的ファイルのビルド（dist/ ディレクトリへ出力）
npm run build

# ビルド成果物のローカルプレビュー
npm run preview
```

---

## 📡 GitHub リポジトリ情報

本プロジェクトの公式GitHubリポジトリ：  
**https://github.com/Teraoka-Hiroki/hello_world_app.git**

```bash
# Git初期化・コミット・プッシュ手順
git init
git add .
git commit -m "feat: 高校生向け指標トレンドアプリ Hello World 完成版"
git remote add origin https://github.com/Teraoka-Hiroki/hello_world_app.git
git branch -M main
git push -u origin main
```

---

## 🌐 Vercel での公開手順（推奨）

本アプリは Vite による静的ビルド構成となっており、Vercel の無料プランで即座に高速公開できます。また、`vercel.json` に Yahoo Finance の CORS 回避用 Rewrite 設定が記載されているため、公開後も安定して最新データを取得できます。

### デプロイ手順
1. [vercel.com](https://vercel.com/) にアクセスし、GitHub アカウントでログインします。
2. 「Add New...」→「Project」をクリックします。
3. GitHubリポジトリ **`Teraoka-Hiroki/hello_world_app`** を選択して「Import」をクリックします。
4. プロジェクト設定画面が表示されます：
   - **Framework Preset**: `Vite`（自動認識されます）
   - **Root Directory**: `./`（デフォルトのまま）
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. 「Deploy」ボタンをクリックします。
6. 約1分程度でデプロイが完了し、世界中からアクセス可能な公開URLが発行されます。

---

## 🔬 使用しているオープンデータ・API

| 指標カテゴリ | データソース | 通信方式 | 特徴 |
|---|---|---|---|
| 気象・天文 | Open-Meteo Forecast & Archive API | クライアント直接 fetch (CORSフリー) | 気温・湿度・風向風速・日の出日の入り・日照時間・過去30日履歴を完全取得 |
| 月齢・月相 | Conway / Julian Day 天文計算アルゴリズム | 完全クライアントサイド純粋計算 | 朔望周期 29.530588853日によるミリ秒精度の完全リアルタイム算出 |
| 金融市場 | Yahoo Finance Chart API | Vercel Rewrite / Vite Proxy / AllOrigins | 日経平均・NYダウ・上海総合・主要為替の現在値・前日比・30日履歴 |
| 資源市場 | Yahoo Finance Chart API | Vercel Rewrite / Vite Proxy / AllOrigins | 原油（WTI/ブレント）・金・銀・銅・アルミの現在値・前日比・30日履歴 |

※万が一、外部API通信に制限や一時的障害が発生した場合でも、アプリがクラッシュしない「高精度フォールバックモック生成エンジン」を搭載しています。

---

## ⚖️ 免責事項・ライセンス

- 本アプリに掲載されている気象・金融・資源の数値データは、教育および探究学習を目的とした参考情報です。実際の投資判断、商取引、防災行動の唯一の根拠としては使用しないでください。
- 本アプリケーションは、**テラオカ電子の自由探究ゼミ**の教育研究活動の一環として制作されました。

```
© 2026 Teraoka-Denshi. All rights reserved.
「自分が価値を置くものに向かって こつこつ努力する姿ほど 素晴らしいものはない」
```
