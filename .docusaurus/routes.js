import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/ai-chat',
    component: ComponentCreator('/ai-chat', 'c2c'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search', '822'),
    exact: true
  },
  {
    path: '/whitepaper',
    component: ComponentCreator('/whitepaper', '4cc'),
    routes: [
      {
        path: '/whitepaper',
        component: ComponentCreator('/whitepaper', '2a3'),
        routes: [
          {
            path: '/whitepaper',
            component: ComponentCreator('/whitepaper', 'b4a'),
            routes: [
              {
                path: '/whitepaper/abstract',
                component: ComponentCreator('/whitepaper/abstract', '6cf'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/whitepaper/accessing-p2p-protocol-clients-sdks',
                component: ComponentCreator('/whitepaper/accessing-p2p-protocol-clients-sdks', 'af2'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/whitepaper/appendices',
                component: ComponentCreator('/whitepaper/appendices', '518'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/whitepaper/compliance-policy-positioning',
                component: ComponentCreator('/whitepaper/compliance-policy-positioning', '6a8'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/whitepaper/cryptographic-primitives-proof-integration',
                component: ComponentCreator('/whitepaper/cryptographic-primitives-proof-integration', '26b'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/whitepaper/design-goals-and-non-goals',
                component: ComponentCreator('/whitepaper/design-goals-and-non-goals', '2af'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/whitepaper/disclosures-risks',
                component: ComponentCreator('/whitepaper/disclosures-risks', '987'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/whitepaper/dispute-resolution',
                component: ComponentCreator('/whitepaper/dispute-resolution', 'eed'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/whitepaper/fraud-prevention',
                component: ComponentCreator('/whitepaper/fraud-prevention', '9a5'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/whitepaper/governance-upgradability',
                component: ComponentCreator('/whitepaper/governance-upgradability', '5e9'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/whitepaper/how-the-protocol-works-today-high-level-not-vendor-locked',
                component: ComponentCreator('/whitepaper/how-the-protocol-works-today-high-level-not-vendor-locked', '30d'),
                exact: true
              },
              {
                path: '/whitepaper/liquidity-market-design',
                component: ComponentCreator('/whitepaper/liquidity-market-design', 'd7b'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/whitepaper/pricing-oracle-mechanics',
                component: ComponentCreator('/whitepaper/pricing-oracle-mechanics', '185'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/whitepaper/privacy-model',
                component: ComponentCreator('/whitepaper/privacy-model', 'f0c'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/whitepaper/proof-of-credibility-reputation-matching',
                component: ComponentCreator('/whitepaper/proof-of-credibility-reputation-matching', 'cf5'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/whitepaper/references',
                component: ComponentCreator('/whitepaper/references', 'd84'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/whitepaper/security-model',
                component: ComponentCreator('/whitepaper/security-model', '243'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/whitepaper/system-overview',
                component: ComponentCreator('/whitepaper/system-overview', '26a'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/whitepaper/the-vision',
                component: ComponentCreator('/whitepaper/the-vision', '38b'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/whitepaper/token-economics',
                component: ComponentCreator('/whitepaper/token-economics', 'a1b'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/whitepaper/trade-protocol-on-and-off-ramp',
                component: ComponentCreator('/whitepaper/trade-protocol-on-and-off-ramp', 'e52'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/whitepaper/why-credibility-matters-and-why-over-collateralization-shouldnt-be-the-only-answer',
                component: ComponentCreator('/whitepaper/why-credibility-matters-and-why-over-collateralization-shouldnt-be-the-only-answer', '657'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
