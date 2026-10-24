<script>
  import { onMount, onDestroy } from 'svelte';
  import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Filler,
    Tooltip
  } from 'chart.js';

  // Chart.js 必要なコンポーネントを登録
  Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Filler,
    Tooltip
  );

  export let data = [];
  export let labels = [];
  export let category = 'finance'; // 'weather' | 'finance' | 'resources'
  export let unit = '';
  export let height = 150;
  export let decimals = 1;

  let canvasEl;
  let chartInstance = null;

  const THEMES = {
    weather: {
      line: '#06b6d4', // cyan-500
      fillStart: 'rgba(6, 182, 212, 0.25)',
      fillEnd: 'rgba(6, 182, 212, 0.0)',
      point: '#22d3ee'
    },
    finance: {
      line: '#6366f1', // indigo-500
      fillStart: 'rgba(99, 102, 241, 0.25)',
      fillEnd: 'rgba(99, 102, 241, 0.0)',
      point: '#818cf8'
    },
    resources: {
      line: '#f59e0b', // amber-500
      fillStart: 'rgba(245, 158, 11, 0.25)',
      fillEnd: 'rgba(245, 158, 11, 0.0)',
      point: '#fbbf24'
    }
  };

  function initChart() {
    if (!canvasEl) return;
    if (chartInstance) chartInstance.destroy();

    const theme = THEMES[category] || THEMES.finance;
    const ctx = canvasEl.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, theme.fillStart);
    gradient.addColorStop(1, theme.fillEnd);

    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels && labels.length ? labels : data.map((_, i) => `${i + 1}`),
        datasets: [{
          data,
          borderColor: theme.line,
          borderWidth: 2.2,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: theme.point,
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 2,
          fill: true,
          backgroundColor: gradient,
          tension: 0.35,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 500,
          easing: 'easeOutQuart'
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleColor: '#94a3b8',
            bodyColor: '#f8fafc',
            borderColor: 'rgba(51, 65, 85, 0.8)',
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            callbacks: {
              title: (items) => {
                const item = items[0];
                return item ? `日付: ${item.label}` : '';
              },
              label: (item) => {
                const val = typeof item.raw === 'number' ? item.raw.toLocaleString('ja-JP', { maximumFractionDigits: decimals }) : item.raw;
                return `値: ${val} ${unit}`;
              }
            }
          }
        },
        scales: {
          x: {
            display: false,
            grid: { display: false }
          },
          y: {
            display: false,
            grid: { display: false }
          }
        }
      }
    });
  }

  $: if (data || labels || category) {
    if (chartInstance) {
      initChart();
    }
  }

  onMount(() => {
    initChart();
  });

  onDestroy(() => {
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
  });
</script>

<div class="w-full relative" style="height: {height}px;">
  <canvas bind:this={canvasEl}></canvas>
</div>
