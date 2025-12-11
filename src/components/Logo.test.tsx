import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Logo } from './Logo'

describe('Logo', () => {
  it('should render an SVG element', () => {
    const { container } = render(<Logo />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('should have aria-hidden attribute for accessibility', () => {
    const { container } = render(<Logo />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('should pass through additional props', () => {
    const { container } = render(<Logo data-testid="logo" className="custom-class" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('data-testid', 'logo')
    expect(svg).toHaveClass('custom-class')
  })

  it('should have correct viewBox', () => {
    const { container } = render(<Logo />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 572 230')
  })

  it('should render path elements with correct fill classes', () => {
    const { container } = render(<Logo />)
    const paths = container.querySelectorAll('path')
    expect(paths.length).toBeGreaterThan(0)

    paths.forEach((path) => {
      expect(path.className.baseVal).toContain('fill-[#326bff]')
    })
  })
})
