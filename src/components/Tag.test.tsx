import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Tag } from './Tag'

describe('Tag', () => {
  describe('rendering', () => {
    it('should render children text', () => {
      render(<Tag>GET</Tag>)
      expect(screen.getByText('GET')).toBeInTheDocument()
    })

    it('should render as a span element', () => {
      const { container } = render(<Tag>GET</Tag>)
      expect(container.querySelector('span')).toBeInTheDocument()
    })
  })

  describe('HTTP method colors', () => {
    it('should apply blue color for GET requests', () => {
      render(<Tag>GET</Tag>)
      const tag = screen.getByText('GET')
      expect(tag.className).toContain('text-blue')
    })

    it('should apply sky color for POST requests', () => {
      render(<Tag>POST</Tag>)
      const tag = screen.getByText('POST')
      expect(tag.className).toContain('text-sky-500')
    })

    it('should apply amber color for PUT requests', () => {
      render(<Tag>PUT</Tag>)
      const tag = screen.getByText('PUT')
      expect(tag.className).toContain('text-amber-500')
    })

    it('should apply rose color for DELETE requests', () => {
      render(<Tag>DELETE</Tag>)
      const tag = screen.getByText('DELETE')
      expect(tag.className).toContain('text-red-500')
    })
  })

  describe('variants', () => {
    it('should apply medium variant styles by default', () => {
      render(<Tag>GET</Tag>)
      const tag = screen.getByText('GET')
      expect(tag.className).toContain('rounded-lg')
      expect(tag.className).toContain('px-1.5')
      expect(tag.className).toContain('ring-1')
    })

    it('should apply small variant styles', () => {
      render(<Tag variant="small">GET</Tag>)
      const tag = screen.getByText('GET')
      expect(tag.className).not.toContain('rounded-lg')
      expect(tag.className).not.toContain('ring-1')
    })
  })

  describe('custom color', () => {
    it('should allow custom color override', () => {
      render(<Tag color="zinc">Custom</Tag>)
      const tag = screen.getByText('Custom')
      expect(tag.className).toContain('text-zinc-500')
    })

    it('should default to blue for unknown values', () => {
      render(<Tag>PATCH</Tag>)
      const tag = screen.getByText('PATCH')
      expect(tag.className).toContain('text-blue')
    })
  })

  describe('styling', () => {
    it('should have monospace font', () => {
      render(<Tag>GET</Tag>)
      const tag = screen.getByText('GET')
      expect(tag.className).toContain('font-mono')
    })

    it('should have semibold font weight', () => {
      render(<Tag>GET</Tag>)
      const tag = screen.getByText('GET')
      expect(tag.className).toContain('font-semibold')
    })
  })
})
