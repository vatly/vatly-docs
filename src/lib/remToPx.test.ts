import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { remToPx } from './remToPx'

describe('remToPx', () => {
  describe('client-side (with window)', () => {
    beforeEach(() => {
      // Set default font size on document element
      document.documentElement.style.fontSize = '16px'
    })

    it('should convert rem to pixels using root font size', () => {
      expect(remToPx(1)).toBe(16)
      expect(remToPx(2)).toBe(32)
      expect(remToPx(0.5)).toBe(8)
      expect(remToPx(0)).toBe(0)
    })

    it('should handle negative values', () => {
      expect(remToPx(-1)).toBe(-16)
    })

    it('should handle decimal values', () => {
      expect(remToPx(1.5)).toBe(24)
      expect(remToPx(0.75)).toBe(12)
    })

    it('should handle custom root font sizes', () => {
      document.documentElement.style.fontSize = '20px'
      expect(remToPx(1)).toBe(20)
      expect(remToPx(2)).toBe(40)
    })

    it('should handle larger root font sizes', () => {
      document.documentElement.style.fontSize = '24px'
      expect(remToPx(1)).toBe(24)
      expect(remToPx(0.5)).toBe(12)
    })
  })
})
