import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, className, ...props }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className} {...props}>{children}</a>
  ),
}))

describe('Button', () => {
  describe('rendering', () => {
    it('should render as a button when no href is provided', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Click me')
    })

    it('should render as a link when href is provided', () => {
      render(<Button href="/test">Link me</Button>)
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/test')
      expect(link).toHaveTextContent('Link me')
    })
  })

  describe('variants', () => {
    it('should apply primary variant styles by default', () => {
      render(<Button>Primary</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('bg-blue')
      expect(button.className).toContain('text-white')
    })

    it('should apply secondary variant styles', () => {
      render(<Button variant="secondary">Secondary</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('bg-zinc-100')
    })

    it('should apply outline variant styles', () => {
      render(<Button variant="outline">Outline</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('ring-1')
    })

    it('should apply text variant styles', () => {
      render(<Button variant="text">Text</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('text-blue')
    })

    it('should apply filled variant styles', () => {
      render(<Button variant="filled">Filled</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('bg-blue')
    })
  })

  describe('arrows', () => {
    it('should render right arrow when specified', () => {
      const { container } = render(<Button arrow="right">Next</Button>)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('should render left arrow when specified', () => {
      const { container } = render(<Button arrow="left">Previous</Button>)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveClass('rotate-180')
    })

    it('should not render arrow by default', () => {
      const { container } = render(<Button>No arrow</Button>)
      const svg = container.querySelector('svg')
      expect(svg).not.toBeInTheDocument()
    })
  })

  describe('custom className', () => {
    it('should merge custom className with default styles', () => {
      render(<Button className="custom-class">Custom</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
      expect(button.className).toContain('inline-flex')
    })
  })

  describe('click handling', () => {
    it('should call onClick handler when clicked', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Clickable</Button>)
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })
})
