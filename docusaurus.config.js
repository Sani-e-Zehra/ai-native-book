// @ts-check
// `@type` JSDoc annotations allow IDEs and type checkers
// to detect errors and provide intellisense

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Teaching Physical AI & Humanoid Robotics Course',
  tagline: 'A comprehensive course covering the fundamentals to advanced concepts in Physical AI and Humanoid Robotics',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  // For Vercel deployment, use environment variable to handle changing domains
  // VERCEL_URL is automatically provided by Vercel during build (e.g., your-project-abc123.vercel.app)
  // This ensures CSS and assets load correctly on every deployment, even with changing preview URLs
  url: (() => {
    if (process.env.VERCEL_URL) {
      // VERCEL_URL might already include https:// or might not, handle both cases
      const url = process.env.VERCEL_URL.startsWith('http') 
        ? process.env.VERCEL_URL 
        : `https://${process.env.VERCEL_URL}`;
      return url;
    }
    // Fallback for local development or custom domains
    return process.env.URL || 'http://localhost:3000';
  })(),
  // Set the /<baseUrl>/ pathname under which your site is served
  // For Vercel deployment, use '/' for root domain
  baseUrl: '/',
  
  // Trailing slash configuration for Vercel
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/your-username/ai-humanoid-robotics-course/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false, // Disable blog if not needed
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Physical AI & Humanoid Robotics',
        logo: {
          alt: 'Course Logo',
          src: 'img/logo.svg', // You can add a logo to static/img/
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'bookSidebar',
            position: 'left',
            label: 'Course Content',
          },
          {
            href: 'https://github.com/your-username/ai-humanoid-robotics-course',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Course Content',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
              {
                label: 'Fundamentals',
                to: '/docs/chapter-2-fundamentals',
              },
              {
                label: 'Design Principles',
                to: '/docs/chapter-3-design',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} AI-Native Book + RAG Chatbot Platform. Built with Docusaurus.`,
      },
      prism: {
        theme: require('prism-react-renderer').themes.github,
        darkTheme: require('prism-react-renderer').themes.dracula,
      },
    }),
};

module.exports = config;