<footer class="w-full bg-slate-950 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8 py-8 mt-12 text-xs text-slate-500">
  <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
    
    <!-- 左側: コピーライト ＆ ゼミ名 -->
    <div class="flex flex-col text-center md:text-left gap-1">
      <p class="font-bold text-slate-300 text-sm">高校生向け指標トレンドアプリ Hello World</p>
      <p class="text-slate-400">テラオカ電子の自由探究ゼミ 教育・研究プロジェクト</p>
      <p class="font-mono text-slate-500 text-[11px] mt-1">© 2026 Teraoka-Denshi. All rights reserved.</p>
    </div>

    <!-- 中央: 探究メッセージ -->
    <div class="text-center max-w-md text-slate-400 italic text-[11px] leading-relaxed">
      「自分が価値を置くものに向かって こつこつ努力する姿ほど 素晴らしいものはない」<br>
      世界は広く、毎日動いている。君の可能性もまた、果てしなく広がっている。
    </div>

    <!-- 右側: 免責事項 ＆ セキュリティ -->
    <div class="flex flex-col text-center md:text-right text-[11px] text-slate-500 gap-1">
      <p>※本アプリの表示数値は教育探究用の参考情報です（投資判断等への利用不可）。</p>
      <p>完全フロントエンド動作 / Cookie・外部データ追跡なし / 個人情報保護設計</p>
      <div class="flex items-center justify-center md:justify-end gap-3 mt-1 text-slate-400">
        <a href="#memo-section" class="hover:text-cyan-400 transition">探究ノートへ</a>
        <span>•</span>
        <button type="button" on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })} class="hover:text-cyan-400 transition">
          ページ上部へ ↑
        </button>
      </div>
    </div>

  </div>
</footer>
