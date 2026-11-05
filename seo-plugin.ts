// Plugin Vite exécuté à la fin de « npm run build » :
// 1. crée une page HTML par URL (dist/a-propos/index.html, …) avec son propre titre et sa description,
//    pour que Google voie les bonnes informations même avant d'exécuter le JavaScript ;
// 2. si SITE_URL est renseigné dans src/data/seo.ts : ajoute la balise canonique et og:url,
//    génère dist/sitemap.xml et ajoute la ligne « Sitemap: » à dist/robots.txt.
import { readFileSync, writeFileSync, mkdirSync, existsSync, appendFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Plugin, ResolvedConfig } from 'vite';
import { seoByPath, SITE_URL } from './src/data/seo';

const escapeAttr = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function setTag(html: string, pattern: RegExp, replacement: string) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html;
}

export default function seoPlugin(): Plugin {
  let outDir = 'dist';
  return {
    name: 'pret-rapide-seo',
    apply: 'build',
    configResolved(config: ResolvedConfig) {
      outDir = join(config.root, config.build.outDir);
    },
    closeBundle() {
      const indexPath = join(outDir, 'index.html');
      if (!existsSync(indexPath)) return;
      const base = readFileSync(indexPath, 'utf8');
      const siteUrl = SITE_URL.replace(/\/+$/, '');
      const today = new Date().toISOString().slice(0, 10);

      for (const [path, { title, description }] of Object.entries(seoByPath)) {
        const t = escapeAttr(title);
        const d = escapeAttr(description);
        let html = base;
        html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${t}</title>`);
        html = setTag(html, /<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${d}" />`);
        html = setTag(html, /<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${t}" />`);
        html = setTag(html, /<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${d}" />`);
        html = setTag(html, /<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${t}" />`);
        html = setTag(html, /<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${d}" />`);
        if (siteUrl) {
          const url = escapeAttr(siteUrl + (path === '/' ? '/' : path));
          html = html.replace('</head>', `    <link rel="canonical" href="${url}" />\n    <meta property="og:url" content="${url}" />\n  </head>`);
        }
        const target = path === '/' ? indexPath : join(outDir, path.slice(1), 'index.html');
        mkdirSync(join(target, '..'), { recursive: true });
        writeFileSync(target, html);
      }

      if (siteUrl) {
        const urls = Object.keys(seoByPath)
          .map(
            (path) =>
              `  <url>\n    <loc>${siteUrl}${path === '/' ? '/' : path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${path === '/' ? '1.0' : '0.8'}</priority>\n  </url>`,
          )
          .join('\n');
        writeFileSync(
          join(outDir, 'sitemap.xml'),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        );
        const robots = join(outDir, 'robots.txt');
        if (existsSync(robots)) appendFileSync(robots, `\nSitemap: ${siteUrl}/sitemap.xml\n`);
      }
    },
  };
}
