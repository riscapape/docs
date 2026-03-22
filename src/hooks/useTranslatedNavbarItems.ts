import { useLocation } from '@docusaurus/router';
import type { Props as NavbarItemConfig } from '@theme/NavbarItem';

// ── i18n config ─────────────────────────────────────────────────────
// To add a new language: add a key here, add whitepaperItems entry,
// and register the corresponding docs plugin + translations folder.

type LangCode = 'en' | 'pt';

const topNavLabels: Record<LangCode, string[]> = {
  en: ['Whitepaper', 'For Investors', 'For Builders', 'For P2P Merchants', 'For Users', 'For Community'],
  pt: ['Whitepaper', 'Para Investidores', 'Para Desenvolvedores', 'Para Comerciantes P2P', 'Para Usuários', 'Para Comunidade'],
};

// docId → { label, slug } per language (slug reuses the EN defined in frontmatter)
interface DocEntry { label: string; slug: string }

const whitepaperItems: Record<Exclude<LangCode, 'en'>, Record<string, DocEntry>> = {
  pt: {
    '00-abstract':                                       { label: 'Resumo',                                                slug: 'abstract' },
    '01-1-the-vision':                                   { label: '1. A Visão',                                            slug: 'the-vision' },
    '02-2-design-goals-and-non-goals':                   { label: '2. Objetivos de Design e Não-Objetivos',                slug: 'design-goals-and-non-goals' },
    '03-3-system-overview':                              { label: '3. Visão Geral do Sistema',                             slug: 'system-overview' },
    '04-4-cryptographic-primitives-proof-integration':   { label: '4. Primitivos Criptográficos e Integração de Provas',   slug: 'cryptographic-primitives-proof-integration' },
    '05-5-trade-protocol-on-and-off-ramp':               { label: '5. Protocolo de Negociação (On-Ramp e Off-Ramp)',       slug: 'trade-protocol-on-and-off-ramp' },
    '06-6-proof-of-credibility-reputation-matching':     { label: '6. Proof-of-Credibility (Reputação e Correspondência)', slug: 'proof-of-credibility-reputation-matching' },
    '07-7-fraud-prevention':                             { label: '7. Prevenção de Fraude',                                slug: 'fraud-prevention' },
    '08-8-dispute-resolution':                           { label: '8. Resolução de Disputas',                              slug: 'dispute-resolution' },
    '09-9-pricing-oracle-mechanics':                     { label: '9. Mecânica de Preços e Oráculos',                      slug: 'pricing-oracle-mechanics' },
    '10-10-liquidity-market-design':                     { label: '10. Liquidez e Design de Mercado',                      slug: 'liquidity-market-design' },
    '11-11-security-model':                              { label: '11. Modelo de Segurança',                               slug: 'security-model' },
    '12-12-privacy-model':                               { label: '12. Modelo de Privacidade',                             slug: 'privacy-model' },
    '13-13-compliance-policy-positioning':               { label: '13. Conformidade e Posicionamento de Política',         slug: 'compliance-policy-positioning' },
    '14-14-accessing-p2p-protocol-clients-sdks':         { label: '14. Acessando o Protocolo P2P: Clientes e SDKs',        slug: 'accessing-p2p-protocol-clients-sdks' },
    '15-15-governance-upgradability':                    { label: '15. Governança e Atualizabilidade',                     slug: 'governance-upgradability' },
    '16-16-token-economics':                             { label: '16. Economia de Tokens',                                slug: 'token-economics' },
    '17-17-disclosures-risks':                           { label: '17. Divulgações e Riscos',                              slug: 'disclosures-risks' },
    '18-18-references':                                  { label: '18. Referências',                                       slug: 'references' },
    '19-appendices':                                     { label: '19. Apêndices',                                         slug: 'appendices' },
  },
};

const forInvestorsItems: Record<Exclude<LangCode, 'en'>, Record<string, DocEntry>> = {
  pt: {
    'start-here':                    { label: 'Comece Aqui',                              slug: 'start-here' },
    'investor-thesis':               { label: 'Tese de Investidor',                       slug: 'investor-thesis' },
    'why-the-token-exists':          { label: 'Por Que o Token Existe',                   slug: 'why-the-token-exists' },
    'token-details':                 { label: 'Detalhes do Token',                        slug: 'token-details' },
    'token-utility':                 { label: 'Utilidade do Token',                       slug: 'token-utility' },
    'token-allocation':              { label: 'Alocação de Tokens',                       slug: 'token-allocation' },
    'past-investors':                { label: 'Investidores Anteriores',                  slug: 'past-investors' },
    'metadao-sale':                  { label: 'Venda MetaDAO',                            slug: 'metadao-sale' },
    'vesting-schedules':             { label: 'Cronogramas de Vesting',                   slug: 'vesting-schedules' },
    'treasury-and-token-value':      { label: 'Tesouro e Valor do Token',                 slug: 'treasury-and-token-value' },
    'staking-mechanics':             { label: 'Mecânica de Staking',                      slug: 'staking-mechanics' },
    'financials-and-estimates':      { label: 'Finanças e Estimativas',                   slug: 'financials-and-estimates' },
    'multichain-strategy':           { label: 'Estratégia Multichain',                    slug: 'multichain-strategy' },
    'token-holder-governance':       { label: 'Governança de Detentores de Tokens',       slug: 'token-holder-governance' },
    'progressive-decentralization':  { label: 'Descentralização Progressiva',             slug: 'progressive-decentralization' },
    'insurance':                     { label: 'Seguro',                                   slug: 'insurance' },
    'disclosures':                   { label: 'Divulgações',                              slug: 'disclosures' },
    'faq':                           { label: 'FAQ',                                      slug: 'faq' },
  },
};

// ── Hook ────────────────────────────────────────────────────────────

function detectLang(pathname: string): LangCode {
  const seg = pathname.split('/').filter(Boolean)[0];
  return (seg && seg in topNavLabels && seg !== 'en') ? seg as LangCode : 'en';
}

export function useTranslatedNavbarItems(items: NavbarItemConfig[]): NavbarItemConfig[] {
  const location = useLocation();
  const lang = detectLang(location.pathname);
  const allowedLabels = topNavLabels[lang];

  return items
    .filter((item) => !item.label || allowedLabels.includes(item.label))
    .map((item) => {
      if (item.type === 'dropdown' && item.items && lang !== 'en') {
        if (item.label === 'Whitepaper') {
          const langItems = whitepaperItems[lang];
          if (!langItems) return item;

          const translatedItems = item.items.map((sub: any) => {
            const docId = sub.docId ?? sub.docID ?? '';
            const entry = langItems[docId];
            if (entry) {
              return { href: `/${lang}/whitepaper/${entry.slug}`, label: entry.label };
            }
            return sub;
          });
          return { ...item, items: translatedItems };
        } else if (item.label === 'Para Investidores' || item.label === 'For Investors') {
          const langItems = forInvestorsItems[lang];
          if (!langItems) return item;

          const translatedItems = item.items.map((sub: any) => {
            const docId = sub.docId ?? sub.docID ?? '';
            const entry = langItems[docId];
            if (entry) {
              return { href: `/${lang}/for-investors/${entry.slug}`, label: entry.label };
            }
            return sub;
          });
          return { ...item, items: translatedItems };
        }
      }
      return item;
    });
}

