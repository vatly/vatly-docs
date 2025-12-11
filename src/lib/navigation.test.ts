import { describe, it, expect } from 'vitest'
import { siteNavigation } from './navigation'

describe('siteNavigation', () => {
  it('should be an array', () => {
    expect(Array.isArray(siteNavigation)).toBe(true)
  })

  it('should have navigation groups', () => {
    expect(siteNavigation.length).toBeGreaterThan(0)
  })

  it('should have Guides section', () => {
    const guidesSection = siteNavigation.find((section) => section.title === 'Guides')
    expect(guidesSection).toBeDefined()
    expect(guidesSection?.links).toBeDefined()
    expect(guidesSection?.links.length).toBeGreaterThan(0)
  })

  it('should have API Reference section', () => {
    const apiSection = siteNavigation.find((section) => section.title === 'API Reference')
    expect(apiSection).toBeDefined()
    expect(apiSection?.links).toBeDefined()
    expect(apiSection?.links.length).toBeGreaterThan(0)
  })

  it('should have Introduction as the first guide link', () => {
    const guidesSection = siteNavigation.find((section) => section.title === 'Guides')
    expect(guidesSection?.links[0]).toEqual({ title: 'Introduction', href: '/' })
  })

  it('all links should have title and href properties', () => {
    siteNavigation.forEach((section) => {
      expect(section.title).toBeDefined()
      expect(typeof section.title).toBe('string')
      expect(section.links).toBeDefined()
      expect(Array.isArray(section.links)).toBe(true)

      section.links.forEach((link) => {
        expect(link.title).toBeDefined()
        expect(typeof link.title).toBe('string')
        expect(link.href).toBeDefined()
        expect(typeof link.href).toBe('string')
        expect(link.href.startsWith('/')).toBe(true)
      })
    })
  })

  it('should not have duplicate hrefs', () => {
    const allHrefs = siteNavigation.flatMap((section) =>
      section.links.map((link) => link.href)
    )
    const uniqueHrefs = new Set(allHrefs)
    expect(allHrefs.length).toBe(uniqueHrefs.size)
  })
})
