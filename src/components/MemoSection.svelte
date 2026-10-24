<script>
  import { onMount } from 'svelte';
  import {
    getSavedNotes,
    upsertNote,
    deleteNote,
    getDraft,
    saveDraft,
    getAccessHistory
  } from '../services/storageService';

  export let currentCity = null;
  export let activeTab = 'weather';

  let notes = [];
  let accessLogs = [];
  let noteTitle = '';
  let noteText = '';
  let noteCategory = 'general';
  let editingId = null;
  let saveSuccessMsg = '';

  const CATEGORIES = [
    { id: 'general', name: '全体・総合考察', icon: '🌐' },
    { id: 'weather', name: '気象・自然環境', icon: '🌤️' },
    { id: 'finance', name: '金融・世界経済', icon: '📈' },
    { id: 'resources', name: '資源・産業基盤', icon: '🛢️' },
  ];

  const PROMPT_HINTS = [
    { label: '💡 今日の最大変化', text: '【今日一番大きく動いた指標は？】\nなぜその指標が動いたと考えられるか、最近のニュースや天候との関連を推測してみよう：\n' },
    { label: '🔗 生活とのつながり', text: '【この数値は私たちの生活にどう影響するか？】\n学校生活、身近な買い物、スマートフォンの価格、電気代などにどう跳ね返ってくるか：\n' },
    { label: '🌍 外の世界の発見', text: '【退屈な日常の裏側で動いていること】\n今この瞬間、日本や世界中の大人たちはどんな課題に挑み、どんな価値を生み出そうとしているか：\n' },
    { label: '🎯 明日への自分メモ', text: '【自分ならどう行動するか？】\n世界の動きを知って、今日・明日から自分が勉強や探究で取り組んでみたいこと：\n' },
  ];

  function loadAll() {
    notes = getSavedNotes();
    accessLogs = getAccessHistory();
    const draft = getDraft();
    if (draft && draft.text && !editingId) {
      noteText = draft.text;
      noteTitle = draft.title || '';
      noteCategory = draft.category || 'general';
    }
  }

  function handleInput() {
    if (!editingId) {
      saveDraft({
        text: noteText,
        title: noteTitle,
        category: noteCategory
      });
    }
  }

  function insertHint(hintText) {
    if (noteText.trim()) {
      noteText += '\n\n' + hintText;
    } else {
      noteText = hintText;
    }
    handleInput();
  }

  function handleSave() {
    if (!noteText.trim()) return;

    const saved = upsertNote({
      id: editingId,
      title: noteTitle.trim() || `${new Date().toLocaleDateString('ja-JP')} の探究メモ`,
      text: noteText.trim(),
      category: noteCategory,
      city: currentCity?.name || '未指定',
      tab: activeTab
    });

    notes = saved;
    noteText = '';
    noteTitle = '';
    editingId = null;
    saveDraft({ text: '', title: '', category: 'general' });

    saveSuccessMsg = '探究メモをブラウザに安全に保存しました！';
    setTimeout(() => {
      saveSuccessMsg = '';
    }, 3000);
  }

  function startEdit(note) {
    editingId = note.id;
    noteTitle = note.title;
    noteText = note.text;
    noteCategory = note.category;
  }

  function cancelEdit() {
    editingId = null;
    noteTitle = '';
    noteText = '';
    const draft = getDraft();
    if (draft) {
      noteText = draft.text || '';
      noteTitle = draft.title || '';
      noteCategory = draft.category || 'general';
    }
  }

  function handleDelete(id) {
    if (confirm('この探究メモを削除しますか？')) {
      notes = deleteNote(id);
      if (editingId === id) cancelEdit();
    }
  }

  onMount(() => {
    loadAll();
  });
</script>

<div id="memo-section" class="space-y-6 pt-6 border-t border-slate-800/80">

  <!-- メモ入力セクション -->
  <div class="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-700/80 shadow-2xl">
    
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
      <div>
        <h2 class="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <span class="text-xl">📝</span> 私の探究ノート（気づき・感想・考察メモ）
        </h2>
        <p class="text-xs text-slate-400 mt-0.5">
          数値やグラフを見て感じたこと、疑問に思ったことを記録しましょう。ブラウザ（LocalStorage）に自動保存され、次回訪問時にも前回の履歴が表示されます。
        </p>
      </div>

      <!-- 保存先バッジ -->
      <div class="flex items-center gap-2 text-[11px] text-emerald-400 font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 self-start sm:self-auto">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span>PCローカル保存（外部送信ゼロ）</span>
      </div>
    </div>

    <!-- 思考のヒント（プロンプト）ボタン -->
    <div class="mb-3">
      <span class="text-xs font-semibold text-slate-400 mb-1.5 block">
        💡 思考を深めるヒント（クリックで入力欄に挿入）：
      </span>
      <div class="flex flex-wrap gap-2">
        {#each PROMPT_HINTS as hint}
          <button
            type="button"
            on:click={() => insertHint(hint.text)}
            class="px-2.5 py-1 rounded-lg text-xs bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
          >
            {hint.label}
          </button>
        {/each}
      </div>
    </div>

    <!-- 入力フォーム -->
    <div class="space-y-3">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <!-- タイトル -->
        <div class="sm:col-span-2">
          <input
            type="text"
            bind:value={noteTitle}
            on:input={handleInput}
            placeholder="タイトル（例：原油高と通学定期代の疑問、東京と札幌の気温差について）"
            class="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
          />
        </div>

        <!-- カテゴリ選択 -->
        <div>
          <select
            bind:value={noteCategory}
            on:change={handleInput}
            class="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-sm text-slate-200 focus:outline-none focus:border-cyan-400 transition"
          >
            {#each CATEGORIES as cat}
              <option value={cat.id}>{cat.icon} {cat.name}</option>
            {/each}
          </select>
        </div>
      </div>

      <!-- メモ本文エリア -->
      <div>
        <textarea
          bind:value={noteText}
          on:input={handleInput}
          rows="4"
          placeholder="今日の気象・金融・資源の動きを見て、何に気づきましたか？日常のどんな出来事とつながっていそうですか？自由な発想で書いてみよう..."
          class="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition leading-relaxed"
        ></textarea>
      </div>

      <!-- 送信・キャンセルボタン -->
      <div class="flex items-center justify-between pt-1">
        <div>
          {#if saveSuccessMsg}
            <span class="text-xs font-semibold text-emerald-400 animate-fade-in flex items-center gap-1">
              <span>✓</span> {saveSuccessMsg}
            </span>
          {/if}
        </div>

        <div class="flex items-center gap-2">
          {#if editingId}
            <button
              type="button"
              on:click={cancelEdit}
              class="px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              キャンセル
            </button>
          {/if}

          <button
            type="button"
            on:click={handleSave}
            disabled={!noteText.trim()}
            class="flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>💾</span>
            <span>{editingId ? 'メモを更新する' : '探究メモを記録する'}</span>
          </button>
        </div>
      </div>
    </div>

  </div>

  <!-- 過去の探究メモ履歴一覧 -->
  <div class="glass-panel rounded-2xl p-5 sm:p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm sm:text-base font-bold text-white flex items-center gap-2">
        <span>📚</span> これまでに蓄積された探究メモ履歴 ({notes.length}件)
      </h3>
      <span class="text-xs text-slate-400">ブラウザ内に安全に保存されています</span>
    </div>

    {#if notes.length === 0}
      <div class="py-8 text-center text-slate-500 text-xs sm:text-sm">
        <p>まだ保存された探究メモはありません。</p>
        <p class="mt-1">上のフォームから、今日の指標を見て感じた気づきを記録してみましょう！</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each notes as note}
          <div class="glass-card rounded-xl p-4 flex flex-col justify-between border-slate-800 hover:border-slate-700 transition">
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {CATEGORIES.find(c => c.id === note.category)?.icon || '📝'}
                  {CATEGORIES.find(c => c.id === note.category)?.name || '全体'}
                </span>
                <span class="text-[11px] font-mono text-slate-500">
                  {new Date(note.updatedAt || note.createdAt).toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <h4 class="text-sm font-bold text-white mb-1.5 text-balance-jp">
                {note.title}
              </h4>
              <p class="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed line-clamp-4">
                {note.text}
              </p>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span class="text-[11px] text-slate-500">
                観測都市: {note.city || '未指定'}
              </span>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  on:click={() => startEdit(note)}
                  class="text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  編集
                </button>
                <button
                  type="button"
                  on:click={() => handleDelete(note.id)}
                  class="text-rose-400 hover:text-rose-300 font-semibold"
                >
                  削除
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- 前回のアクセス履歴ログ -->
  {#if accessLogs && accessLogs.length > 0}
    <div class="glass-panel rounded-2xl p-4 sm:p-5">
      <div class="flex items-center justify-between mb-2">
        <h4 class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <span>🕒</span> 前回のブラウザ利用履歴
        </h4>
        <span class="text-[11px] font-mono text-slate-500">次回起動時にも前回の状態が引き継がれます</span>
      </div>
      <div class="flex flex-wrap gap-2 text-[11px] text-slate-400">
        {#each accessLogs.slice(0, 5) as log}
          <span class="px-2 py-1 rounded bg-slate-900 border border-slate-800 font-mono">
            {new Date(log.timestamp).toLocaleDateString('ja-JP')} {new Date(log.timestamp).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })} ({log.city || '東京'})
          </span>
        {/each}
      </div>
    </div>
  {/if}

</div>
