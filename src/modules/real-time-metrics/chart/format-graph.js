import { CHART_RULES } from '@modules/real-time-metrics/constants'

/**
 * Format data for displaying byte unit
 * @param {number} data - The data to be formatted
 * @param {Object} chartData - The chart data
 * @returns {string} - Returns the formatted data for byte unit display
 */
export function formatBytesDataUnit(data, chartData) {
  let unit = 'byte'

  if (chartData.dataUnit === 'bitsPerSecond' || chartData.dataUnit === 'bites') {
    return 'bits/s'
  }

  if (data > CHART_RULES.DATA_VOLUME.tera) {
    unit = `tb/s`
  } else if (data > CHART_RULES.DATA_VOLUME.giga) {
    unit = `gb/s`
  } else if (data > CHART_RULES.DATA_VOLUME.mega) {
    unit = `mb/s`
  } else if (data > CHART_RULES.DATA_VOLUME.kilo) {
    unit = `kb/s`
  }

  return unit
}
