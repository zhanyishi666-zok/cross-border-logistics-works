;(function () {
  'use strict';

  /* ── 从CSS变量读取颜色 ── */
  var root = getComputedStyle(document.documentElement);
  var accent  = root.getPropertyValue('--accent').trim()  || '#dc2626';
  var accent2 = root.getPropertyValue('--accent2').trim() || '#ea580c';
  var ink     = root.getPropertyValue('--ink').trim()     || '#1c1917';
  var muted   = root.getPropertyValue('--muted').trim()   || '#78716c';
  var rule    = root.getPropertyValue('--rule').trim()    || '#e7e5e4';
  var bg      = root.getPropertyValue('--bg').trim()      || '#fafaf9';

  /* ── 通用配置 ── */
  var baseText = { fontFamily: 'InstrumentSans, sans-serif', color: muted };
  var titleOpt = { left: 'center', top: 8, textStyle: { fontFamily: 'InstrumentSans, sans-serif', fontSize: 15, fontWeight: 700, color: ink } };
  var gridOpt  = { left: 60, right: 30, top: 60, bottom: 40 };
  var tooltipOpt = { trigger: 'axis', backgroundColor: '#fff', borderColor: rule, textStyle: { color: ink, fontFamily: 'InstrumentSans, sans-serif', fontSize: 13 } };
  var legendOpt = { bottom: 6, textStyle: { fontFamily: 'InstrumentSans, sans-serif', fontSize: 12, color: muted }, icon: 'circle', itemWidth: 8, itemHeight: 8 };

  /* ── 工具：初始化图表并监听 resize ── */
  function init(id) {
    var el = document.getElementById(id);
    if (!el) return null;
    var chart = echarts.init(el, null, { renderer: 'canvas' });
    var ro = new ResizeObserver(function () { chart.resize(); });
    ro.observe(el);
    return chart;
  }

  /* ══════════════════════════════════════════
     图表1：面积图 - 中国跨境物流市场规模趋势
     ══════════════════════════════════════════ */
  var areaChart = init('chart-market-size');
  if (areaChart) {
    areaChart.setOption({
      animation: false,
      title: Object.assign({}, titleOpt, { text: '中国跨境物流市场规模趋势（2020-2026E）' }),
      tooltip: tooltipOpt,
      grid: gridOpt,
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2020', '2021', '2022', '2023', '2024', '2025', '2026E'],
        axisLine: { lineStyle: { color: rule } },
        axisLabel: baseText,
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        name: '万亿元',
        nameTextStyle: baseText,
        min: 0,
        max: 4,
        splitLine: { lineStyle: { color: rule, type: 'dashed' } },
        axisLabel: baseText,
        axisLine: { show: false },
        axisTick: { show: false }
      },
      series: [{
        name: '市场规模',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: { width: 2.5, color: accent },
        itemStyle: { color: accent, borderWidth: 2, borderColor: '#fff' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(220,38,38,0.25)' },
            { offset: 1, color: 'rgba(220,38,38,0.02)' }
          ])
        },
        data: [1.2, 1.5, 1.8, 2.1, 2.5, 2.79, 3.1],
        label: {
          show: true,
          position: 'top',
          formatter: '{c}万亿',
          fontSize: 11,
          fontFamily: 'InstrumentSans, sans-serif',
          color: ink
        }
      }]
    });
  }

  /* ══════════════════════════════════════════
     图表2：饼图 - 企业规模分布
     ══════════════════════════════════════════ */
  var pieChart = init('chart-enterprise');
  if (pieChart) {
    pieChart.setOption({
      animation: false,
      title: Object.assign({}, titleOpt, { text: '跨境物流企业规模与市场份额分布' }),
      tooltip: {
        trigger: 'item',
        backgroundColor: '#fff',
        borderColor: rule,
        textStyle: { color: ink, fontFamily: 'InstrumentSans, sans-serif', fontSize: 13 },
        formatter: function (p) { return p.marker + ' ' + p.name + '<br/>企业占比：' + p.data.pct + '%<br/>市场份额：' + p.value + '%'; }
      },
      legend: Object.assign({}, legendOpt, { orient: 'horizontal' }),
      series: [{
        type: 'pie',
        radius: ['38%', '65%'],
        center: ['50%', '48%'],
        avoidLabelOverlap: true,
        padAngle: 2,
        itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
        label: {
          show: true,
          formatter: '{b}\n{d}%',
          fontFamily: 'InstrumentSans, sans-serif',
          fontSize: 13,
          color: ink,
          lineHeight: 18
        },
        labelLine: { length: 16, length2: 20, lineStyle: { color: muted } },
        emphasis: {
          label: { fontSize: 15, fontWeight: 700 },
          itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.1)' }
        },
        data: [
          { value: 40, name: '头部企业（<5%）', pct: '<5%', itemStyle: { color: accent } },
          { value: 35, name: '中型企业（15%）', pct: '15%', itemStyle: { color: accent2 } },
          { value: 25, name: '小微企业（80%）', pct: '80%', itemStyle: { color: '#f97316' } }
        ]
      }]
    });
  }

  /* ══════════════════════════════════════════
     图表3：柱状图 - 各类型卖家数量对比
     ══════════════════════════════════════════ */
  var barChart = init('chart-seller');
  if (barChart) {
    barChart.setOption({
      animation: false,
      title: Object.assign({}, titleOpt, { text: '跨境电商各类型卖家数量对比' }),
      tooltip: tooltipOpt,
      grid: { left: 120, right: 40, top: 60, bottom: 40 },
      xAxis: {
        type: 'value',
        name: '万家',
        nameTextStyle: baseText,
        splitLine: { lineStyle: { color: rule, type: 'dashed' } },
        axisLabel: baseText,
        axisLine: { show: false },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'category',
        data: [
          '全托管/半托管\n(新进入者99%+)',
          '独立站卖家\n(增速25%+)',
          '阿里国际站\n(高质量卖家增长33.2%)',
          '亚马逊自发货\n(22万家)',
          '亚马逊FBA\n(104万家)'
        ],
        axisLine: { lineStyle: { color: rule } },
        axisLabel: {
          fontFamily: 'InstrumentSans, sans-serif',
          fontSize: 12,
          color: ink,
          lineHeight: 16
        },
        axisTick: { show: false }
      },
      series: [{
        type: 'bar',
        barWidth: 22,
        itemStyle: {
          borderRadius: [0, 6, 6, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: accent },
            { offset: 1, color: accent2 }
          ])
        },
        label: {
          show: true,
          position: 'right',
          formatter: function (p) {
            var labels = ['高速增长', '快速增长', '+33.2%', '22万+', '104万+'];
            return labels[p.dataIndex];
          },
          fontFamily: 'InstrumentSans, sans-serif',
          fontSize: 12,
          fontWeight: 700,
          color: accent
        },
        data: [15, 8, 6, 22, 104]
      }]
    });
  }

  /* ══════════════════════════════════════════
     图表4：折线图 - 海外仓数量增长
     ══════════════════════════════════════════ */
  var lineChart = init('chart-warehouse');
  if (lineChart) {
    lineChart.setOption({
      animation: false,
      title: Object.assign({}, titleOpt, { text: '中国海外仓数量增长趋势（2020-2025）' }),
      tooltip: tooltipOpt,
      grid: gridOpt,
      xAxis: {
        type: 'category',
        data: ['2020', '2021', '2022', '2023', '2024', '2025E'],
        axisLine: { lineStyle: { color: rule } },
        axisLabel: baseText,
        axisTick: { show: false },
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        name: '个',
        nameTextStyle: baseText,
        min: 0,
        max: 4500,
        splitLine: { lineStyle: { color: rule, type: 'dashed' } },
        axisLabel: baseText,
        axisLine: { show: false },
        axisTick: { show: false }
      },
      series: [{
        name: '海外仓数量',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { width: 2.5, color: accent },
        itemStyle: { color: accent, borderWidth: 2, borderColor: '#fff' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(234,88,12,0.20)' },
            { offset: 1, color: 'rgba(234,88,12,0.01)' }
          ])
        },
        data: [1200, 1500, 1800, 2200, 2800, 3500],
        label: {
          show: true,
          position: 'top',
          formatter: '{c}',
          fontSize: 12,
          fontWeight: 700,
          fontFamily: 'InstrumentSans, sans-serif',
          color: ink
        },
        markLine: {
          silent: true,
          lineStyle: { color: accent2, type: 'dashed', width: 1 },
          data: [{ yAxis: 3500, label: { formatter: '2025E：3,500个', fontFamily: 'InstrumentSans, sans-serif', fontSize: 11, color: accent2 }, position: 'insideEndTop' }]
        }
      }]
    });
  }

})();