/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://horizon-hosting-template.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [],
  },
  exclude: ['/server-sitemap.xml'],
  generateIndexSitemap: false,
  outDir: 'public',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
};