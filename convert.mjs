import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

const SRC = '/Users/sandervanhooft/vatly-docs/src/app';

// Navigation structure
const guides = [
  { slug: 'quickstart', title: 'Quickstart' },
  { slug: 'sdks', title: 'SDKs' },
  { slug: 'authentication', title: 'Authentication' },
  { slug: 'pagination', title: 'Pagination' },
  { slug: 'errors', title: 'Errors' },
  { slug: 'webhooks', title: 'Webhooks' },
  { slug: 'idempotency', title: 'Idempotency' },
];

const apiRef = [
  { slug: 'customers', title: 'Customers' },
  { slug: 'checkouts', title: 'Checkouts' },
  { slug: 'subscriptions', title: 'Subscriptions' },
  { slug: 'subscription-plans', title: 'Subscription Plans' },
  { slug: 'orders', title: 'Orders' },
  { slug: 'refunds', title: 'Refunds' },
  { slug: 'global-refunds', title: 'Global Refunds' },
  { slug: 'chargebacks', title: 'Chargebacks' },
  { slug: 'one-off-products', title: 'One-off Products' },
];

function convertMdx(content, title, description) {
  let md = content;
  
  // Remove export const metadata block
  md = md.replace(/export const metadata = \{[\s\S]*?\}\n*/m, '');
  
  // Remove export const sections block
  md = md.replace(/export const sections = \[[\s\S]*?\]\n*/m, '');
  
  // Remove import statements
  md = md.replace(/^import .*\n/gm, '');
  
  // Remove JSX comments {/* ... */}
  md = md.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  
  // Remove {{ className: 'lead' }}
  md = md.replace(/\s*\{\{\s*className:\s*'lead'\s*\}\}/g, '');
  
  // Convert <Note> to ::note
  md = md.replace(/<Note>\s*\n?([\s\S]*?)\n?\s*<\/Note>/g, (_, inner) => {
    return `::note\n${inner.trim()}\n::`;
  });
  
  // Convert <CodeGroup> with tag/label to ::code-group
  md = md.replace(/<CodeGroup[^>]*>/g, '::code-group');
  md = md.replace(/<\/CodeGroup>/g, '::');
  
  // Convert <Properties>/<Property> to tables
  md = md.replace(/<Properties>\s*\n([\s\S]*?)\n\s*<\/Properties>/g, (_, inner) => {
    const props = [];
    const propRegex = /<Property\s+name="([^"]*?)"\s+type="([^"]*?)">\s*\n?([\s\S]*?)\n?\s*<\/Property>/g;
    let match;
    while ((match = propRegex.exec(inner)) !== null) {
      const [, name, type, desc] = match;
      props.push({ name, type, desc: desc.trim().replace(/\n\s*/g, ' ') });
    }
    if (props.length === 0) return inner;
    
    let table = '| Name | Type | Description |\n| --- | --- | --- |\n';
    for (const p of props) {
      table += `| \`${p.name}\` | \`${p.type}\` | ${p.desc} |\n`;
    }
    return table;
  });
  
  // Remove <Row>, </Row>, <Col>, </Col>, <Col sticky>
  md = md.replace(/<\/?Row>/g, '');
  md = md.replace(/<Col[^>]*>/g, '');
  md = md.replace(/<\/Col>/g, '');
  
  // Convert <Button href="..." ...>...</Button> to markdown links
  md = md.replace(/<Button\s+href="([^"]*?)"[^>]*>\s*(?:<>)?([\s\S]*?)(?:<\/>)?\s*<\/Button>/g, (_, href, text) => {
    return `[${text.trim()}](${href})`;
  });
  
  // Remove <div className="not-prose"> wrappers
  md = md.replace(/<div[^>]*className="not-prose"[^>]*>\s*/g, '');
  md = md.replace(/<\/div>\s*/g, '');
  
  // Remove <HeroPattern /> 
  md = md.replace(/<HeroPattern\s*\/>/g, '');
  
  // Remove <Libraries /> 
  md = md.replace(/<Libraries\s*\/>/g, '');
  
  // Convert ## heading {{ tag: 'GET', label: '/v1/...' }} to ## heading {.get .endpoint}
  // Keep tag info as a note below the heading
  md = md.replace(/^(#{1,3})\s+(.*?)\s*\{\{\s*tag:\s*'(\w+)',\s*label:\s*'([^']*)'\s*\}\}\s*$/gm, 
    (_, hashes, title, method, path) => {
      return `${hashes} ${title}\n\n\`${method} ${path}\``;
    });
  
  // Clean up code block metadata {{ title: 'cURL' }} -> keep title comment
  // Actually Docus code blocks support [filename] syntax
  md = md.replace(/```(\w+)\s*\{\{\s*title:\s*'([^']*)'\s*\}\}/g, '```$1 [$2]');
  md = md.replace(/```(\w+)\s*\{\{\s*language:\s*'([^']*)'\s*\}\}/g, '```$1 [$2]');
  
  // Remove &raquo; -> >>
  md = md.replace(/&raquo;/g, '»');
  
  // Clean up excessive blank lines
  md = md.replace(/\n{4,}/g, '\n\n\n');
  
  // Add frontmatter
  const fm = `---
title: "${title}"
description: "${(description || '').replace(/"/g, '\\"')}"
---

`;
  
  return fm + md.trim() + '\n';
}

function processFile(slug, outPath) {
  const srcFile = join(SRC, slug, 'page.mdx');
  if (!existsSync(srcFile)) {
    console.log(`SKIP: ${srcFile} not found`);
    return;
  }
  const content = readFileSync(srcFile, 'utf8');
  
  // Extract metadata
  const titleMatch = content.match(/title:\s*'([^']*)'|title:\s*"([^"]*)"/);
  const descMatch = content.match(/description:\s*\n?\s*'([^']*)'|description:\s*\n?\s*"([^"]*)"/);
  const title = titleMatch ? (titleMatch[1] || titleMatch[2]) : slug;
  const desc = descMatch ? (descMatch[1] || descMatch[2]) : '';
  
  const converted = convertMdx(content, title, desc);
  
  const dir = dirname(outPath);
  mkdirSync(dir, { recursive: true });
  writeFileSync(outPath, converted);
  console.log(`OK: ${slug} -> ${outPath}`);
}

const CONTENT = '/Users/sandervanhooft/vatly-docs-docus/content';

// Landing page
const indexSrc = readFileSync(join(SRC, 'page.mdx'), 'utf8');
const indexConverted = convertMdx(indexSrc, 'Vatly API Documentation', 'Learn everything about the Vatly API.');
writeFileSync(join(CONTENT, 'index.md'), indexConverted);
console.log('OK: index');

// Guides
guides.forEach((g, i) => {
  processFile(g.slug, join(CONTENT, '1.guides', `${i+1}.${g.slug}.md`));
});

// API Reference
apiRef.forEach((a, i) => {
  processFile(a.slug, join(CONTENT, '2.api-reference', `${i+1}.${a.slug}.md`));
});

console.log('Done!');
