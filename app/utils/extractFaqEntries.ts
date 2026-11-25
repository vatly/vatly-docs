// Reads the "Frequently asked questions" section of a Nuxt Content page body
// (minimark): every h3 inside it is a question, and the paragraphs up to the
// next heading are its answer, as plain text.
type MinimarkNode = string | [string, Record<string, unknown>, ...MinimarkNode[]]

export interface FaqEntry {
  question: string
  answer: string
}

const FAQ_HEADING_ID = 'frequently-asked-questions'

const textOf = (node: MinimarkNode): string =>
  typeof node === 'string' ? node : node.slice(2).map(child => textOf(child as MinimarkNode)).join('')

export function extractFaqEntries(body: unknown): FaqEntry[] {
  const nodes = (body as { value?: MinimarkNode[] } | undefined)?.value
  if (!Array.isArray(nodes)) {
    return []
  }

  const entries: FaqEntry[] = []
  let inFaq = false
  let current: FaqEntry | null = null

  for (const node of nodes) {
    if (typeof node === 'string') {
      continue
    }

    const [tag, props] = node
    if (tag === 'h2') {
      inFaq = props?.id === FAQ_HEADING_ID
      current = null
    }
    else if (inFaq && tag === 'h3') {
      current = { question: textOf(node).trim(), answer: '' }
      entries.push(current)
    }
    else if (current && tag === 'p') {
      current.answer = [current.answer, textOf(node).trim()].filter(Boolean).join(' ')
    }
  }

  return entries.filter(entry => entry.question && entry.answer)
}
