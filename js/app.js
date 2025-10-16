document.addEventListener('DOMContentLoaded', () => {
  const COLORS = {
    red: '#FF6B6B',
    yellow: '#FFD166',
    green: '#06D6A0',
    blue: '#118AB2',
    darkBlue: '#073B4C'
  };

  const wrapLabel = (label, maxWidth = 16) => {
    if (label.length <= maxWidth) {
      return label;
    }
    const words = label.split(' ');
    const lines = [];
    let currentLine = '';
    for (const word of words) {
      if ((currentLine + word).length > maxWidth && currentLine.length > 0) {
        lines.push(currentLine.trim());
        currentLine = '';
      }
      currentLine += word + ' ';
    }
    lines.push(currentLine.trim());
    return lines;
  };

  const defaultTooltipCallback = {
    plugins: {
      tooltip: {
        callbacks: {
          title: function (tooltipItems) {
            const item = tooltipItems[0];
            let label = item.chart.data.labels[item.dataIndex];
            if (Array.isArray(label)) {
              return label.join(' ');
            } else {
              return label;
            }
          }
        }
      }
    }
  };

  const specializationCtx = document.getElementById('specializationChart')?.getContext('2d');
  if (specializationCtx) {
    new Chart(specializationCtx, {
      type: 'doughnut',
      data: {
        labels: ['Web Development', 'Mobile Development', 'Design & Creative', 'Writing & Translation', 'Marketing & Sales'],
        datasets: [{
          label: 'Market Share',
          data: [45, 20, 15, 10, 10],
          backgroundColor: [COLORS.blue, COLORS.green, COLORS.yellow, COLORS.red, '#7BC6E0'],
          borderColor: '#ffffff',
          borderWidth: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          ...defaultTooltipCallback.plugins,
          legend: {
            position: 'bottom',
          },
        }
      }
    });
  }

  const techRadarCtx = document.getElementById('techRadarChart')?.getContext('2d');
  if (techRadarCtx) {
    new Chart(techRadarCtx, {
      type: 'radar',
      data: {
        labels: ['Спрос на рынке', 'Порог входа', 'Средний рейт', 'Сложность', 'Перспективы'],
        datasets: [{
          label: 'React/Next.js',
          data: [9, 5, 8, 7, 9],
          backgroundColor: 'rgba(255, 107, 107, 0.2)',
          borderColor: COLORS.red,
          pointBackgroundColor: COLORS.red,
        }, {
          label: 'Vue.js',
          data: [7, 3, 7, 5, 8],
          backgroundColor: 'rgba(6, 214, 160, 0.2)',
          borderColor: COLORS.green,
          pointBackgroundColor: COLORS.green,
        },
        {
          label: 'Angular',
          data: [6, 7, 8, 8, 7],
          backgroundColor: 'rgba(17, 138, 178, 0.2)',
          borderColor: COLORS.blue,
          pointBackgroundColor: COLORS.blue,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...defaultTooltipCallback
      }
    });
  }

  const profitCtx = document.getElementById('profitChart')?.getContext('2d');
  if (profitCtx) {
    new Chart(profitCtx, {
      type: 'bar',
      data: {
        labels: ['Junior ($15-25/h)', 'Middle ($30-50/h)', 'Senior ($55-80/h)', 'Expert ($85+/h)'],
        datasets: [{
          label: 'Средний доход в месяц ($)',
          data: [2500, 6000, 9500, 14000],
          backgroundColor: [COLORS.red, COLORS.yellow, COLORS.green, COLORS.blue],
          borderRadius: 5,
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          ...defaultTooltipCallback.plugins,
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    });
  }

  const incomeTimelineCtx = document.getElementById('incomeTimelineChart')?.getContext('2d');
  if (incomeTimelineCtx) {
    const labels = ['Старт', '3 мес', '6 мес', '1 год', '2 года', '3 года+'];
    new Chart(incomeTimelineCtx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Ежемесячный доход ($)',
          data: [500, 1500, 3000, 5000, 8000, 12000],
          fill: true,
          backgroundColor: 'rgba(17, 138, 178, 0.1)',
          borderColor: COLORS.blue,
          tension: 0.3,
          pointRadius: 5,
          pointBackgroundColor: COLORS.blue,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...defaultTooltipCallback,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  const downloadPdfButton = document.getElementById('downloadPdf');
  const loader = document.getElementById('loader');

  downloadPdfButton.addEventListener('click', async () => {
    loader.classList.remove('hidden');
    downloadPdfButton.classList.add('hidden');

    const pdfPath = 'pdf/Анализ рынка фриланса_ PDF-презентация.pdf';
    try {
      const response = await fetch(pdfPath);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Анализ рынка фриланса_ PDF-презентация.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF download failed:', error);
      alert('Не удалось загрузить PDF. Попробуйте позже.');
    } finally {
      loader.classList.add('hidden');
      downloadPdfButton.classList.remove('hidden');
    }
  });
});