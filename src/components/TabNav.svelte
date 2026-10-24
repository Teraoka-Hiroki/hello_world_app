<script>
  import { createEventDispatcher } from 'svelte';

  export let activeTab = 'weather';
  export let refreshing = false;
  export let notesCount = 0;

  const dispatch = createEventDispatcher();

  const TABS = [
    {
      id: 'weather',
      name: '気象情報',
      subtitle: '全国10都市・地球環境',
      icon: '🌤️',
      color: 'cyan'
    },
    {
      id: 'finance',
      name: '金融市場',
      subtitle: '株価・為替・資本フロー',
      icon: '📈',
      color: 'indigo'
    },
    {
      id: 'resources',
      name: '資源市場',
      subtitle: '原油・貴金属・産業基盤',
      icon: '🛢️',
      color: 'amber'
    },
    {
      id: 'algorithm',
      name: 'アルゴリズム理論解説',
      subtitle: '数学・天文学・データサイエンス',
      icon: '🧠',
      color: 'purple'
    }
  ];

  function selectTab(id) {
    dispatch('tabChange', id);
  }
</script>

<div class="w-full bg-slate-900/60 border-b border-slate-800 backdrop-blur-sm sticky top-[73px] z-30 px-4 sm:px-6 lg:px-8 py-2.5">
  <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
    
    <!-- タブボタン一覧 -->
    <nav class="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none" aria-label="ダッシュボードタブ">
      {#each TABS as tab}
        <button
          type="button"
          on:click={() => selectTab(tab.id)}
          class="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border
            {activeTab === tab.id
              ? tab.id === 'weather'
                ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                : tab.id === 'finance'
                ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/40 shadow-lg shadow-indigo-500/10'
                : tab.id === 'resources'
                ? 'bg-amber-500/15 text-amber-400 border-amber-500/40 shadow-lg shadow-amber-500/10'
                : 'bg-purple-500/15 text-purple-400 border-purple-500/40 shadow-lg shadow-purple-500/10'
              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
            }"
        >
          <span class="text-base">{tab.icon}</span>
          <div class="flex flex-col text-left">
            <span class="leading-tight">{tab.name}</span>
            <span class="text-[10px] font-normal opacity-70 hidden sm:inline">{tab.subtitle}</span>
          </div>
        </button>
      {/each}
    </nav>

    <!-- アクションボタン群 -->
    <div class="flex items-center gap-2 w-full md:w-auto justify-end">
      
      <!-- 探究メモ移動ボタン -->
      <button
        type="button"
        on:click={() => dispatch('scrollToNotes')}
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
        title="探究メモ欄へスクロール"
      >
        <span>📝</span>
        <span>探究ノート</span>
        {#if notesCount > 0}
          <span class="px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
            {notesCount}
          </span>
        {/if}
      </button>

      <!-- レポート出力ボタン -->
      <button
        type="button"
        on:click={() => dispatch('openExport')}
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-600/30 to-indigo-600/30 hover:from-cyan-600/40 hover:to-indigo-600/40 text-cyan-300 border border-cyan-500/40 transition shadow-sm"
        title="テキスト/PDFでダウンロード"
      >
        <span>📥</span>
        <span>レポート出力</span>
      </button>

      <!-- データ更新ボタン -->
      <button
        type="button"
        on:click={() => dispatch('refreshData')}
        disabled={refreshing}
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700 transition disabled:opacity-50"
        title="最新データを再取得"
      >
        <span class={refreshing ? 'animate-spin inline-block' : ''}>🔄</span>
        <span class="hidden sm:inline">{refreshing ? '取得中...' : '更新'}</span>
      </button>

    </div>

  </div>
</div>
