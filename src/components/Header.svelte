<script>
  import { onMount } from 'svelte';

  let currentTime = '';
  let currentDate = '';

  function updateClock() {
    const now = new Date();
    currentTime = now.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    currentDate = now.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  }

  onMount(() => {
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  });
</script>

<header class="w-full bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-4">
  <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
    
    <!-- タイトル（左） -->
    <div class="flex flex-col text-center md:text-left">
      <div class="flex items-center justify-center md:justify-start gap-2">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
          高校生向け探究ダッシュボード
        </span>
        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          ● リアルタイム稼働中
        </span>
      </div>
      <h1 class="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white mt-1">
        指標トレンドアプリ <span class="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Hello World</span>
      </h1>
      <p class="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl text-balance-jp leading-relaxed">
        変わりない日常に退屈している君へ。世界は今この瞬間も猛烈なスピードで動き、無数の人々が挑んでいる。外の世界のダイナミズムを覗いてみよう。
      </p>
    </div>

    <!-- 右側: 時計 ＋ 指定ロゴ（水平配置） -->
    <div class="flex items-center justify-center md:justify-end gap-3 sm:gap-4 flex-wrap">
      
      <!-- リアルタイムデジタル時計 -->
      <div class="hidden lg:flex flex-col text-right px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800">
        <span class="text-lg font-bold font-mono tracking-wider text-slate-100">{currentTime}</span>
        <span class="text-[11px] text-slate-400">{currentDate} (JST)</span>
      </div>

      <!-- プロフィール / 指定ロゴ（仕様書そのまま） -->
      {@html `<!-- プロフィール -->
            <div class="flex items-center mt-6 md:mt-0 bg-slate-900/80 p-3 pr-6 rounded-full border border-slate-700 shadow-xl ml-4 hover:border-cyan-500/50 transition-colors cursor-default">
                <img src="./teraoka.png" onerror="this.src='https://ui-avatars.com/api/?name=Teraoka&background=0f172a&color=fff'" alt="Profile" class="w-14 h-14 rounded-full object-cover border-2 border-cyan-500/30">
                <div class="text-right ml-4">
                    <p class="font-bold text-sm text-cyan-400">テラオカ電子の自由探究ゼミ</p>
                    <p class="text-xs text-gray-400 max-w-[200px] leading-tight mt-1">自分が価値を置くものに向かって<br>こつこつ努力する姿ほど<br>素晴らしいものはない</p>
                </div>
            </div>`}

    </div>

  </div>
</header>
