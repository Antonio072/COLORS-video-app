import { test, expect } from 'vitest'

import { getContrastingColor, filterDataFromHex, hexToRgb } from './functions'

test('getContrastingColor', () => {
  expect(getContrastingColor('#000000')).toBe('#ffffff')
  expect(getContrastingColor('#ffffff')).toBe('#000000')
  expect(getContrastingColor('#ff0000')).toBe('#000000')
  expect(getContrastingColor('#00ff00')).toBe('#000000')
  expect(getContrastingColor('#0000ff')).toBe('#ffffff')
}
)

test('filterDataFromHex', () => {
  const hex = '#000000'
  const offset = 50
  const array = [
    {
      video_id: '1',
      predominant_color: '#000000'
    },
    {
      video_id: '2',
      predominant_color: '#ffffff'
    },
    {
      video_id: '3',
      predominant_color: '#ff0000'
    },
    {
      video_id: '4',
      predominant_color: '#00ff00'
    },
    {
      video_id: '5',
      predominant_color: '#0000ff'
    }
  ]
  const result = filterDataFromHex(hex, offset, array)
  expect(result).toEqual([
    {
      video_id: '1',
      predominant_color: '#000000'
    },
    {
      video_id: '3',
      predominant_color: '#ff0000'
    },
    {
      video_id: '4',
      predominant_color: '#00ff00'
    }
  ])
}
)

test('hexToRgb', () => {
  expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 })
  expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 })
  expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 })
  expect(hexToRgb('#00ff00')).toEqual({ r: 0, g: 255, b: 0 })
  expect(hexToRgb('#0000ff')).toEqual({ r: 0, g: 0, b: 255 })
}
)
