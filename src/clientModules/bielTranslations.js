import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  const translations = {
    en: { searchPlaceholder: 'Search' },
    pt: { searchPlaceholder: 'Pesquisar' },
  };

  let bielStyleInjected = false;

  function getCurrentLanguage() {
    const firstSegment = window.location.pathname.split('/').filter(Boolean)[0];
    return firstSegment === 'pt' ? 'pt' : 'en';
  }

  function hideBielInPortuguese() {
    if (bielStyleInjected) return;
    const lang = getCurrentLanguage();
    if (lang === 'pt') {
      const style = document.createElement('style');
      style.textContent = `
        biel-button,
        [data-biel],
        .biel-widget,
        .biel-button {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
      bielStyleInjected = true;
    }
  }

  function updateSearchBarPlaceholder() {
    const lang = getCurrentLanguage();
    const placeholder = translations[lang].searchPlaceholder;

    document.querySelectorAll(
      'input[placeholder="Search"], input[placeholder="Pesquisar"]'
    ).forEach((input) => {
      input.placeholder = placeholder;
    });

    document.querySelectorAll('.DocSearch-Button-Placeholder').forEach((btn) => {
      btn.textContent = placeholder;
    });
  }

  function updateTranslations() {
    hideBielInPortuguese();
    updateSearchBarPlaceholder();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateTranslations);
  } else {
    updateTranslations();
  }

  const observer = new MutationObserver(() => {
    updateTranslations();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

