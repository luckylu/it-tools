import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOOLS_DIR = path.resolve(__dirname, '../src/tools');
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const BASE_URL = 'https://kit4.dev';

const STATIC_ROUTES = [
  '/',
  '/blog',
];

async function generateSitemap() {
  console.log('Generating sitemap...');
  
  const routes = [...STATIC_ROUTES];
  
  // Get all tool directories
  const toolDirs = fs.readdirSync(TOOLS_DIR).filter(file => {
    return fs.statSync(path.join(TOOLS_DIR, file)).isDirectory();
  });

  for (const dir of toolDirs) {
    const indexPath = path.join(TOOLS_DIR, dir, 'index.ts');
    if (fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath, 'utf-8');
      // Look for path: '/something'
      const match = content.match(/path:\s*['"]([^'"]+)['"]/);
      if (match && match[1]) {
        const toolRoute = match[1];
        routes.push(toolRoute);
        routes.push(`/blog${toolRoute}`);
      }
    }
  }

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  const outputPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  fs.writeFileSync(outputPath, sitemap);
  console.log(`Sitemap generated at ${outputPath} with ${routes.length} URLs.`);
}

generateSitemap();
