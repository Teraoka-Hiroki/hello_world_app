<script>
  import { createEventDispatcher } from 'svelte';
  import { downloadTextReport, triggerPdfExport } from '../services/exportService';

  export let show = false;
  export let weatherData = null;
  export let financeData = [];
  export let resourceData = [];
  export let notes = [];
  export let currentCity = null;

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }

  function handleDownloadText() {
    downloadTextReport({
      weatherData,
      financeData,
      resourceData,
      notes,
      currentCity
    });
  }

  function handlePrintPdf() {
    close();
    setTimeout(() => {
      triggerPdfExport();
    }, 300);
  }
</script>

{#if show}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in no-print">
    
    <div class="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-7 border border-slate-700 shadow-2xl relative">
      
      <!-- 閉じるボタン -->
      <button
        type="button"
        on:click={close}
        class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
        aria-label="閉じる"
      >
        ✕
      </button>

      <div class="flex items-center gap-3 mb-4">
        <span class="text-3xl p-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">📥</span>
        <div>
          <h3 class="text-lg sm:text-xl font-bold text-white">
            探究レポート出力センター
          </h3>
          <p class="text-xs text-slate-400">
            今日の指標データとあなたの記録した探究メモを一括でエクスポートできます。
          </p>
        </div>
      </div>

      <!-- 出力内容サマリー -->
      <div class="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-2 text-xs text-slate-300 mb-6">
        <p class="font-bold text-cyan-400">【含まれるレポート内容】</p>
        <ul class="list-disc list-inside space-y-1 text-slate-400">
          <li>気象情報: {currentCity?.name || '東京'}の現在気温、湿度、風向風速、日の出入、月齢</li>
          <li>金融市場: 日経平均、NYダウ、上海総合、主要為替レート（現在値・前日比）</li>
          <li>資源市場: WTI原油、ブレント原油、金、銀、銅、アルミニウム（現在値・前日比）</li>
          <li>探究メモ: あなたが記録した全探究ノート（計 {notes.length} 件）</li>
        </ul>
      </div>

      <!-- 出力選択ボタン -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <!-- テキストファイルダウンロード -->
        <button
          type="button"
          on:click={handleDownloadText}
          class="flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-cyan-500/30 hover:border-cyan-400 text-center transition group shadow-lg"
        >
          <span class="text-3xl mb-2 group-hover:scale-110 transition-transform">📄</span>
          <span class="text-sm font-bold text-white group-hover:text-cyan-300">テキスト（TXT）で保存</span>
          <span class="text-[11px] text-slate-400 mt-1">構造化テキスト形式で即座にPCへ保存</span>
        </button>

        <!-- PDF印刷出力 -->
        <button
          type="button"
          on:click={handlePrintPdf}
          class="flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-indigo-500/30 hover:border-indigo-400 text-center transition group shadow-lg"
        >
          <span class="text-3xl mb-2 group-hover:scale-110 transition-transform">🖨️</span>
          <span class="text-sm font-bold text-white group-hover:text-indigo-300">PDF形式で印刷・保存</span>
          <span class="text-[11px] text-slate-400 mt-1">ブラウザの印刷画面から「PDFに保存」</span>
        </button>

      </div>

      <div class="mt-6 pt-4 border-t border-slate-800 flex justify-end">
        <button
          type="button"
          on:click={close}
          class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
        >
          閉じる
        </button>
      </div>

    </div>

  </div>
{/if}
