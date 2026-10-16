(function () {
  let saved = '';
  try { saved = localStorage.getItem('freeutil-language') || ''; } catch (error) {}
  const raw = (new URLSearchParams(location.search).get('lang') || saved || navigator.language || 'en').toLowerCase();
  const locale = ['ko', 'ja', 'zh'].find(code => raw.startsWith(code)) || 'en';
  const parts = location.pathname.split('/').filter(Boolean);
  const page = parts.at(-1) === 'index.html' ? parts.at(-2) : parts.at(-1);
  const entries = window.FreeUtilReading?.[page];
  document.documentElement.lang = locale;
  try { localStorage.setItem('freeutil-language', locale); } catch (error) {}
  if (!entries || locale === 'ko') return;
  const column = { en: 0, ja: 1, zh: 2 }[locale];
  document.querySelectorAll('[data-reading-key]').forEach(element => {
    const key = Number(element.dataset.readingKey);
    const html = Array.isArray(entries) ? entries[key]?.[column] : entries[locale]?.[key];
    if (typeof html !== 'string') {
      console.error(`Missing reading translation: ${page}.${key}.${locale}`);
      return;
    }
    // Authored translation markup only; user inputs never enter this dictionary.
    if (element.innerHTML !== html) element.innerHTML = html;
  });
  if (page?.endsWith('.html')) document.title = `Free Util · ${document.querySelector('h1')?.textContent || 'Free Util'}`;
  if (page?.endsWith('.html')) { const meta=document.querySelector('meta[name="description"]'); if(meta)meta.content=document.querySelector('main p')?.textContent || meta.content; }
  if (location.protocol === 'file:') document.querySelectorAll('a[href="./"]').forEach(link => link.setAttribute('href', 'index.html'));
})();
