<script>
  import { onMount } from 'svelte';
  import Header from './components/Header.svelte';
  import TabNav from './components/TabNav.svelte';
  import WeatherTab from './components/WeatherTab.svelte';
  import FinanceTab from './components/FinanceTab.svelte';
  import ResourcesTab from './components/ResourcesTab.svelte';
  import AlgorithmTab from './components/AlgorithmTab.svelte';
  import MemoSection from './components/MemoSection.svelte';
  import SecurityBadge from './components/SecurityBadge.svelte';
  import Footer from './components/Footer.svelte';
  import ExportModal from './components/ExportModal.svelte';

  import { CITIES, fetchCityWeather } from './services/weatherService';
  import { fetchAllFinance, fetchAllResources } from './services/marketService';
  import {
    getUserPrefs,
    saveUserPrefs,
    getSavedNotes,
    logAccessHistory
  } from './services/storageService';

  let activeTab = 'weather';
  let currentCity = CITIES[0];
  let weatherData = null;
  let financeData = [];
  let resourceData = [];
  let notes = [];

  let loadingWeather = false;
  let loadingFinance = false;
  let loadingResources = false;
  let refreshing = false;
  let showExportModal = false;

  // 初期設定とデータロード
  async function initApp() {
    const prefs = getUserPrefs();
    if (prefs.lastTab) activeTab = prefs.lastTab;
    if (prefs.lastCityId) {
      const foundCity = CITIES.find(c => c.id === prefs.lastCityId);
      if (foundCity) currentCity = foundCity;
    }
    notes = getSavedNotes();

    // アクセス履歴を記録
    logAccessHistory({
      city: currentCity.name,
      tab: activeTab
    });

    // 並列で初期データ取得
    await Promise.allSettled([
      loadWeatherData(currentCity),
      loadFinanceData(),
      loadResourceData()
    ]);
  }

  async function loadWeatherData(city) {
    loadingWeather = true;
    try {
      weatherData = await fetchCityWeather(city);
    } catch (e) {
      console.error('Weather load error:', e);
    } finally {
      loadingWeather = false;
    }
  }

  async function loadFinanceData() {
    loadingFinance = true;
    try {
      financeData = await fetchAllFinance();
    } catch (e) {
      console.error('Finance load error:', e);
    } finally {
      loadingFinance = false;
    }
  }

  async function loadResourceData() {
    loadingResources = true;
    try {
      resourceData = await fetchAllResources();
    } catch (e) {
      console.error('Resource load error:', e);
    } finally {
      loadingResources = false;
    }
  }

  async function handleRefresh() {
    refreshing = true;
    notes = getSavedNotes();
    await Promise.allSettled([
      loadWeatherData(currentCity),
      loadFinanceData(),
      loadResourceData()
    ]);
    refreshing = false;
  }

  function handleTabChange(event) {
    activeTab = event.detail;
    saveUserPrefs({ lastTab: activeTab });
  }

  async function handleCityChange(event) {
    currentCity = event.detail;
    saveUserPrefs({ lastCityId: currentCity.id });
    logAccessHistory({
      city: currentCity.name,
      tab: activeTab
    });
    await loadWeatherData(currentCity);
  }

  function scrollToNotes() {
    const el = document.getElementById('memo-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onMount(() => {
    initApp();
  });
</script>

<div class="min-h-screen flex flex-col bg-[#070b14] text-slate-100">
  
  <!-- ヘッダー（左タイトル、右ロゴ） -->
  <Header />

  <!-- タブナビゲーション -->
  <TabNav
    {activeTab}
    {refreshing}
    notesCount={notes.length}
    on:tabChange={handleTabChange}
    on:refreshData={handleRefresh}
    on:scrollToNotes={scrollToNotes}
    on:openExport={() => showExportModal = true}
  />

  <!-- メインコンテンツ -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
    
    <!-- タブ1: 気象情報 -->
    {#if activeTab === 'weather'}
      <WeatherTab
        {weatherData}
        {currentCity}
        loading={loadingWeather}
        on:cityChange={handleCityChange}
      />
    <!-- タブ2: 金融市場 -->
    {:else if activeTab === 'finance'}
      <FinanceTab
        {financeData}
        loading={loadingFinance}
      />
    <!-- タブ3: 資源市場 -->
    {:else if activeTab === 'resources'}
      <ResourcesTab
        {resourceData}
        loading={loadingResources}
      />
    <!-- タブ4: アルゴリズム理論解説 -->
    {:else if activeTab === 'algorithm'}
      <AlgorithmTab />
    {/if}

    <!-- セキュリティ安心バッジ -->
    <SecurityBadge />

    <!-- 探究ノート（気づき・感想メモ ＆ 履歴保存） -->
    <MemoSection
      {currentCity}
      {activeTab}
    />

  </main>

  <!-- フッター -->
  <Footer />

  <!-- レポートダウンロードモーダル -->
  <ExportModal
    show={showExportModal}
    {weatherData}
    {financeData}
    {resourceData}
    {notes}
    {currentCity}
    on:close={() => showExportModal = false}
  />

</div>
