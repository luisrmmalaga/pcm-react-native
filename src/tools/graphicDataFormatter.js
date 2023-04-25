function randomInteger(max) {
  return Math.floor(Math.random() * (max + 1))
}

function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals)

  return parseFloat(str)
}

function getRGBOColor() {
  return (
    'rgba(' +
    randomInteger(255) +
    ',' +
    randomInteger(255) +
    ', ' +
    randomInteger(255) +
    ',' +
    getRandomFloat(0.9, 1, 2) +
    ')'
  )
}

export function getPieDataFormatted(data) {
  return data.map((item) => {
    return {
      name: item.nombre,
      densidad: item.densidad,
      color: getRGBOColor(),
      legendFontColor: 'black',
      legendFontSize: 15,
    }
  })
}

function getFormattedTimeUnit(value) {
  return value < 10 ? '0' + value : value
}

export function getEndDate() {
  return new Date(Date.now()).toISOString()
}

export function getFormattedDate(date) {
  const newDate = new Date(date)

  return date
    ? getFormattedTimeUnit(newDate.getDate()) +
        '/' +
        getFormattedTimeUnit(newDate.getMonth() + 1) +
        '/' +
        newDate.getFullYear()
    : ''
}

export function getContributionGraphicDataFormatted(data) {
  return data.map((item) => {
    return {
      date: new Date(item.timestamp).toISOString(),
      count: item.usuarios,
    }
  })
}

function getPreviousDays() {
  const days = []
  const today = new Date()

  for (let i = 6; i >= 0; i--) {
    const previousDay = new Date(today)
    previousDay.setDate(today.getDate() - i)
    const dayString = `${previousDay.getDate()}/${previousDay.getMonth() + 1}`
    days.push(dayString)
  }

  return days
}

function getDatasets(data) {
  return data.map((favourite) => {
    return {
      data: favourite.datos.map((checkpoint) => {
        return checkpoint.densidad
      }),
      color: () => getRGBOColor(),
      strokeWidth: 2,
    }
  })
}

function getFavouriteNames(data) {
  return data.map((favourite) => {
    return favourite.favorito
  })
}

export function getLineChartDataFormatted(data) {
  return {
    labels: getPreviousDays(),
    datasets: getDatasets(data),
    legend: getFavouriteNames(data),
  }
}
