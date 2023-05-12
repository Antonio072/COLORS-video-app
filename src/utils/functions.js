import { CONTRAST_COLORS } from '../utils/constants'

export function getContrastingColor (hex) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1)
  }

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }

  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  // https://stackoverflow.com/a/3943023/112731
  return (r * 0.299 + g * 0.587 + b * 0.114) > 116
    ? CONTRAST_COLORS.white
    : CONTRAST_COLORS.black
}

export function filterDataFromHex (hex, offset = 50, array = []) {
  const filterHexValue = hex
  const filterRgbValue = hexToRgb(filterHexValue)

  array = array.filter(item => {
    const itemRgbValue = hexToRgb(item.predominant_color)
    const rDiff = Math.abs(itemRgbValue.r - filterRgbValue.r)
    const gDiff = Math.abs(itemRgbValue.g - filterRgbValue.g)
    const bDiff = Math.abs(itemRgbValue.b - filterRgbValue.b)
    return rDiff <= offset && gDiff <= offset && bDiff <= offset
  })
  return array
}

function hexToRgb (hexValue) {
  hexValue = hexValue.replace('#', '')
  const r = parseInt(hexValue.substring(0, 2), 16)
  const g = parseInt(hexValue.substring(2, 4), 16)
  const b = parseInt(hexValue.substring(4, 6), 16)
  return { r, g, b }
}
