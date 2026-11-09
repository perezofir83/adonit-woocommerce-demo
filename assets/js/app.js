/* Adonit WooCommerce demo – shared header, footer, cart, favourites and plugin badges. */
(function () {
  'use strict';

  // ---------- Plugin registry: every demo feature maps to a WooCommerce plugin ----------
  // status: free = free plugin covers it, partly = free covers part / needs a small snippet, paid = paid plugin or vendor
  const PLUGINS = {
    core:      ['WooCommerce (ליבה)', 'free', 'בלוקים מובנים: מבצעים, הנמכרים ביותר, קטגוריות, "הזמן שוב".'],
    content:   ['בלוקים של וורדפרס', 'free', 'עמודי תוכן, באנרים, שאלות נפוצות (בלוק Details).'],
    theme:     ['Blocksy', 'free', 'תבנית חינמית שתומכת בעברית. בונה כותרת עם טלפון, עיצוב מעוגל.'],
    megamenu:  ['Max Mega Menu', 'free', 'תפריט עמוק עם תתי-קטגוריות. צריך לבדוק תצוגה מימין לשמאל.'],
    reorder:   ['Repeat Order for WooCommerce', 'partly', 'כפתור "הזמנה חוזרת" באזור האישי. הכפתור בראש האתר דורש קוד קצר.'],
    subs:      ['WooCommerce Subscriptions', 'paid', 'כ-279$ לשנה. התוסף החינמי (WP Swings) מחייב רק דרך Stripe או PayPal, לא דרך סליקה ישראלית.'],
    wallet:    ['TeraWallet', 'free', 'ארנק דיגיטלי עם החזר כספי לפי קטגוריה. מתאים ל-5% על מוצרים בתפזורת.'],
    comax:     ['חיבור לקומקס (Bee1 / Easy-WP)', 'paid', 'ספק ישראלי, מחיר לפי הצעה. מסנכרן מלאי, הזמנות ומבצעים עם הקופות. צריך לוודא סנכרון מועדון.'],
    unitprice: ['Unit Price for WooCommerce', 'partly', 'מכירה בגרמים וק"ג ומחיר ל-100 גרם. הצגה של מחיר לק"ג ולצדו מחיר ל-100 גרם דורשת קוד קצר.'],
    j5:        ['PayPlus (סליקה)', 'free', 'התוסף חינמי. תומך ב-J5 עם "הערכת משקל": החיוב הסופי אחרי הליקוט. חשבון הסליקה בתשלום.'],
    whatsapp:  ['WP Chat App', 'partly', 'כפתור וואטסאפ חינמי. שעות מענה אוטומטיות רק בגרסת PRO (כ-20-50$).'],
    search:    ['FiboSearch', 'partly', 'חיפוש חי עם תמונות בחינם. "חיפושים פופולריים" דורשים קוד קצר.'],
    wishlist:  ['TI WooCommerce Wishlist', 'free', 'רשימת מועדפים לכל לקוח.'],
    giftcard:  ['PW WooCommerce Gift Cards', 'free', 'מכירת גיפט קארד ומימוש היתרה בקופה.'],
    shipbar:   ['Freetop – Free Shipping Bar', 'free', 'פס עליון עם התקדמות למשלוח חינם.'],
    shipcheck: ['אזורי משלוח (ליבה) + קוד קצר', 'partly', 'אין תוסף חינמי עם "בדיקת עיר" לפני הקופה. צריך קוד קצר.'],
    composite: ['WPC Composite Products', 'partly', 'הלקוח בוחר מוצר לכל תא בקופסה. בונה "מלא קופסה" חופשי הוא בדרך כלל בתשלום.'],
    filter:    ['HUSKY Products Filter', 'free', 'סינון לפי מחיר, אירוע, סוג אדם ומאפיינים.'],
    sidecart:  ['Side Cart WooCommerce', 'free', 'עגלה צפה שנפתחת מהצד. קופונים בתוך העגלה בגרסת Pro.'],
    locator:   ['WP Store Locator', 'free', 'מפת סניפים עם שעות. צריך מפתח Google Maps.'],
    workshops: ['מוצר ווקומרס עם מלאי מקומות', 'free', 'כל סדנה היא מוצר, והמלאי הוא מספר המקומות. חלופה בתשלום: Event Tickets Plus.'],
    recipes:   ['WP Recipe Maker', 'partly', 'כרטיסי מתכון בחינם. "הוספת כל המצרכים לעגלה" בגרסה בתשלום (כ-149$). חלופה חינמית: בלוק מוצרים מתחת למתכון.'],
    reviews:   ['Rich Showcase for Google Reviews', 'free', 'מציג דירוג וביקורות מגוגל.'],
    quote:     ['YITH Request a Quote', 'partly', 'סל הצעת מחיר וטופס בסיסי בחינם. שדות מותאמים לעסקים בגרסה בתשלום.'],
    a11y:      ['Ally + הצהרת נגישות', 'partly', 'וידג\'ט והצהרה בחינם. תקן 5568 דורש גם תיקונים בקוד ובדיקה מקצועית.'],
    invoice:   ['Morning (חשבונית ירוקה) / iCount', 'free', 'התוסף חינמי. צריך מנוי במערכת החשבוניות.']
  };
  const ST_LABEL = { free: 'חינם', partly: 'חלקי', paid: 'בתשלום' };
  window.PLUGINS = PLUGINS; window.ST_LABEL = ST_LABEL;

  const PLUG_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0zM12 18v4"/></svg>';
  function plugBadge(key) {
    const p = PLUGINS[key]; if (!p) return '';
    return `<a class="plug" href="plugins.html#${key}" title="${esc(p[2])}">${PLUG_ICON}<b>${esc(p[0])}</b><span class="st ${p[1]}">${ST_LABEL[p[1]]}</span></a>`;
  }
  window.plugBadge = plugBadge;

  // ---------- Catalog structure: 6 main categories (Nuts.com), deep menu (Teva Castel) ----------
  const CATS = {
    pure: 'תבלינים טהורים · טוחנים במקום', blends: 'תערובות של אדונית', whole: 'תבלינים שלמים', greens: 'ירוקים',
    nuts: 'אגוזים טבעיים', roasted: 'פיצוחים · קלייה במקום', dried: 'פירות יבשים ללא סוכר', sugared: 'פירות יבשים מסוכרים',
    coffee: 'פולי קפה טרי', cocoa: 'מוצרי קקאו', tea: 'חליטות תה', halva: 'חלבה', chocolate: 'שוקולדים', honey: 'דבש',
    indian: 'הודו', italy: 'איטליה', asian: 'אסיה', mexico: 'מקסיקו', oils: 'שמנים', baking: 'מוצרי אפייה', legumes: 'קטניות ודגנים',
    gf: 'ללא גלוטן', organic: 'אורגני', vegan: 'טבעוני', keto: 'קיטו', sugarfree: 'ללא סוכר', herbs: 'צמחי מרפא', cosmetics: 'קוסמטיקה טבעית',
    boxes: 'מארזים', kitchen: 'כלי בית ומטבח', sale: 'מבצעים'
  };
  const MENU = [
    { id: 'spices', name: 'תבלינים', groups: [['תבלינים', ['pure', 'blends', 'whole', 'greens']]] },
    { id: 'nuts', name: 'אגוזים ופירות יבשים', groups: [['אגוזים', ['nuts', 'roasted']], ['פירות יבשים', ['dried', 'sugared']]] },
    { id: 'sweet', name: 'קפה, תה ומתוקים', groups: [['קפה ותה', ['coffee', 'cocoa', 'tea']], ['מתוקים', ['halva', 'chocolate', 'honey']]] },
    { id: 'world', name: 'בסטה עולמית', groups: [['מטבחים', ['indian', 'italy', 'asian', 'mexico']], ['מזווה', ['oils', 'baking', 'legumes']]] },
    { id: 'health', name: 'בריאות וטבע', groups: [['לפי צורך', ['gf', 'organic', 'vegan', 'keto', 'sugarfree']], ['טבע', ['herbs', 'cosmetics']]] },
    { id: 'gifts', name: 'מארזים ומתנות', href: 'gifts.html', groups: [['מתנות', ['boxes', 'kitchen']]] }
  ];
  const BULK = ['pure', 'blends', 'whole', 'greens', 'nuts', 'roasted', 'dried', 'sugared', 'legumes', 'coffee', 'tea'];
  window.CATS = CATS; window.MENU = MENU; window.BULK = BULK;

  // ---------- helpers ----------
  function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  window.esc = esc;
  const money = n => (Math.round(n * 100) / 100).toFixed(2).replace(/\.00$/, '') + ' ₪';
  window.money = money;
  const byId = {}; (window.PRODUCTS || []).forEach(p => { byId[p.id] = p; });
  window.productById = id => byId[id];
  window.productsIn = keys => (window.PRODUCTS || []).filter(p => p.cats.some(c => keys.includes(c)));
  const isBulk = p => p.g && p.cats.some(c => BULK.includes(c));
  const own = p => p.cats.includes('pure') || p.cats.includes('blends');
  window.isBulk = isBulk;

  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem('adonit-demo-' + k)) ?? d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('adonit-demo-' + k, JSON.stringify(v)); } catch (e) { } }
  };
  window.demoStore = store;

  // ---------- header / footer ----------
  const ICON = {
    search: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    redo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.5-9.3C1 8 3.4 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.6 0 6 3.5 4.5 7.2C19.5 16.4 12 21 12 21z"/></svg>',
    heartFill: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.5-9.3C1 8 3.4 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.6 0 6 3.5 4.5 7.2C19.5 16.4 12 21 12 21z"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6"/><circle cx="10" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.8-1.1-4.6-4-4.8-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.8-1c.2-.3.4-.2.6-.1l2 .9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>'
  };
  window.ICON = ICON;

  function header() {
    const mega = MENU.map(m => {
      const href = m.href || `category.html?m=${m.id}`;
      const groups = m.groups.map(([t, keys]) => `<div><h5>${esc(t)}</h5>${keys.map(k => `<a href="category.html?c=${k}">${esc(CATS[k])}</a>`).join('')}</div>`).join('');
      return `<div class="mn-item"><a href="${href}">${esc(m.name)}</a><div class="mega">${groups}<div class="note"><a href="${href}"><b>לכל ${esc(m.name)} ←</b></a></div></div></div>`;
    }).join('');
    return `
<div class="demo-bar"><div class="wrap">
  <span><b>הדמיה</b> · אתר אדונית על ווקומרס · הטקסטים והתמונות מהאתר הקיים</span>
  <span style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
    <label class="switch"><input type="checkbox" id="plug-toggle" checked> הצגת הפלאגינים</label>
    <a href="plugins.html">מפת הפלאגינים והעלויות</a>
  </span>
</div></div>
<div class="ship-bar" id="shipbar"><div class="wrap">
  <span><strong>משלוח חינם</strong> בהזמנה מעל 450 ₪</span>
  <span>משלוח עד 5 ימי עסקים, א'-ה'</span>
  <span>איסוף עצמי מ-8 סניפים</span>
  <span>${plugBadge('shipbar')}</span>
</div></div>
<header class="site-head">
  <div class="wrap head-row">
    <a class="logo" href="index.html"><img src="assets/img/site/logo.png" alt=""><span><b>אדונית התבלינים</b><small>שוק קולינרי מכל העולם</small></span></a>
    <form class="search" role="search" onsubmit="event.preventDefault();location.href='category.html?q='+encodeURIComponent(this.q.value)">
      <label class="sr" for="q">חיפוש מוצר</label>
      ${ICON.search}
      <input id="q" name="q" type="search" autocomplete="off" placeholder="חפשו בין יותר מ-1,900 מוצרים">
      <div class="suggest" id="suggest">
        <h4>חיפושים פופולריים ${plugBadge('search')}</h4>
        <div class="chips">${['פפריקה', 'זעתר', 'קשיו', 'טחינה', 'קקאו', 'מארז', 'כורכום', 'תמרים'].map(w => `<a href="category.html?q=${encodeURIComponent(w)}">${w}</a>`).join('')}</div>
        <div class="res" id="suggest-res"></div>
      </div>
    </form>
    <div class="head-actions">
      <a class="hbtn phone" href="branches.html" title="טלפון הזמנות">${ICON.phone}053-3303169</a>
      <a class="hbtn reorder" href="account.html#reorder">${ICON.redo}שחזור הזמנה</a>
      <a class="hbtn" href="account.html#fixed">הזמנה קבועה</a>
      <a class="hbtn" href="account.html#favs" aria-label="מועדפים">${ICON.heart}<span class="count" id="fav-count">0</span></a>
      <a class="hbtn" href="account.html" aria-label="החשבון שלי">${ICON.user}</a>
    </div>
  </div>
  <div class="wrap plug-row" style="padding-bottom:8px">${plugBadge('theme')}${plugBadge('reorder')}${plugBadge('subs')}${plugBadge('wishlist')}</div>
  <nav class="mainnav" aria-label="קטגוריות"><div class="wrap">
    ${mega}
    <div class="mn-item accent"><a href="category.html?c=sale">מבצעים</a></div>
    <div class="nav-extra">
      <a href="recipes.html">מתכונים</a><a href="branches.html">סניפים וסדנאות</a><a href="business.html">המחלקה העסקית</a><a href="help.html">שאלות נפוצות</a>
    </div>
    <span style="padding:6px 0">${plugBadge('megamenu')}</span>
  </div></nav>
</header>`;
  }

  function footer() {
    return `
<footer class="site-foot"><div class="wrap">
  <div class="cols">
    <div><h4>אדונית התבלינים</h4><p style="margin:0">ברוכים הבאים לגן עדן לחובבי אוכל! אלפי מוצרים מכל העולם, תבלינים טהורים ותערובות בייצור עצמי, וקפה שנטחן במקום.</p></div>
    <div><h4>קנייה</h4><a href="help.html#shipping">משלוחים</a><a href="help.html#returns">החזרות</a><a href="help.html#expect">תיאום ציפיות לפני רכישה</a><a href="account.html#giftcard">גיפט קארד</a><a href="help.html">שאלות נפוצות</a></div>
    <div><h4>אדונית</h4><a href="about.html">הסיפור שלנו</a><a href="branches.html">סניפים וסדנאות</a><a href="business.html">המחלקה העסקית</a><a href="help.html#kosher">כשרות</a><a href="#">זכיינות</a></div>
    <div><h4>דברו איתנו</h4><span>שירות לקוחות: 053-3303169</span><br><span>א'-ה' 09:00-17:00</span><br><span>אדונית לעסקים: 053-3013043</span><br><span>adonitoffice@gmail.com</span></div>
  </div>
  <div class="plug-row" style="margin-top:20px">${plugBadge('a11y')}${plugBadge('invoice')}${plugBadge('j5')}</div>
  <div class="legal">אדונית התבלינים בע"מ, ח.פ. 515968394 · החרובים 7, פרדס חנה-כרכור · הדמיה לצורך הצגה בלבד. אין אפשרות לקנות באתר הזה.</div>
</div></footer>
<button class="fcart-btn" id="fcart-btn" aria-label="פתיחת העגלה">${ICON.cart}<span>העגלה</span><span class="count" id="cart-count">0</span></button>
<div class="scrim" id="scrim"></div>
<aside class="fcart" id="fcart" aria-label="עגלת קניות" aria-hidden="true">
  <header><h3>העגלה שלי</h3><button class="x" id="fcart-x" aria-label="סגירת העגלה">×</button></header>
  <div style="padding:8px 20px 0">${plugBadge('sidecart')}</div>
  <div class="items" id="fcart-items"></div>
  <footer id="fcart-foot"></footer>
</aside>
<div class="wa-fab">
  <span>${plugBadge('whatsapp')}</span>
  <a href="https://wa.me/972533303169" target="_blank" rel="noopener">${ICON.wa}<span>הזמנה בוואטסאפ<small>מענה א'-ה' 09:00-17:00</small></span></a>
</div>
<div class="toast" id="toast" role="status"></div>`;
  }

  // ---------- product card ----------
  function card(p, opts) {
    opts = opts || {};
    const favs = store.get('favs', []);
    const fav = favs.includes(p.id);
    const bulk = isBulk(p);
    const per100 = p.g ? p.price / p.g * 100 : null;
    const perKg = p.g ? p.price / p.g * 1000 : null;
    const tags = [];
    if (own(p)) tags.push('<span class="tag green">מתוצרת אדונית</span>');
    if (p.cats.includes('sale')) tags.push('<span class="tag red">מבצע</span>');
    if (p.cats.includes('organic')) tags.push('<span class="tag">אורגני</span>');
    return `<article class="pcard" data-id="${p.id}">
  <div class="badges">${tags.join('')}</div>
  <button class="fav" aria-pressed="${fav}" aria-label="הוספה למועדפים" data-fav="${p.id}">${fav ? ICON.heartFill : ICON.heart}</button>
  <a class="pimg" href="product.html?id=${p.id}"><img loading="lazy" src="${p.img}" alt="${esc(p.name)}"></a>
  <h3><a href="product.html?id=${p.id}">${esc(p.name)}</a></h3>
  ${bulk ? `<div class="uswitch" role="group" aria-label="איך לקנות"><button aria-pressed="true" data-mode="unit">יחידות</button><button aria-pressed="false" data-mode="kg">לפי ק"ג</button></div>` : ''}
  <div class="price-row"><span class="price" data-price>${money(p.price)}</span>
    ${p.g ? `<span class="unit">${money(per100)} ל-100 גרם<br>${money(perKg)} לק"ג</span>` : ''}</div>
  ${bulk ? `<span class="tag green" style="align-self:flex-start">5% חוזר לארנק המועדון</span>` : ''}
  <button class="add" data-add="${p.id}">הוספה לעגלה</button>
  ${opts.plugs !== false && bulk ? `<div class="plug-row">${plugBadge('unitprice')}</div>` : ''}
</article>`;
  }
  window.productCard = card;

  // ---------- cart ----------
  function cartTotal(c) { return Object.entries(c).reduce((s, [id, it]) => { const p = byId[id]; return p ? s + lineTotal(p, it) : s; }, 0); }
  function lineTotal(p, it) { return it.mode === 'kg' && p.g ? p.price / p.g * 1000 * it.q : p.price * it.q; }
  function renderCart() {
    const c = store.get('cart', {});
    const ids = Object.keys(c).filter(id => byId[id]);
    const count = ids.length;
    const el = document.getElementById('cart-count'); if (el) el.textContent = count;
    const box = document.getElementById('fcart-items'); if (!box) return;
    if (!count) box.innerHTML = '<p class="muted">העגלה ריקה. הוסיפו מוצרים מהחנות.</p>';
    else box.innerHTML = ids.map(id => {
      const p = byId[id], it = c[id];
      return `<div class="it"><img src="${p.img}" alt=""><div><b style="font-size:15px">${esc(p.name)}</b><br><small>${it.mode === 'kg' ? it.q + ' ק"ג' : it.q + ' יח\''}</small> · <button class="rm" data-rm="${id}">הסרה</button></div><b>${money(lineTotal(p, it))}</b></div>`;
    }).join('');
    const total = cartTotal(c);
    const bulkTotal = ids.reduce((s, id) => isBulk(byId[id]) ? s + lineTotal(byId[id], c[id]) : s, 0);
    const left = Math.max(0, 450 - total);
    document.getElementById('fcart-foot').innerHTML = `
      <div>${left > 0 ? `חסרים <b>${money(left)}</b> למשלוח חינם` : '<b>יש לכם משלוח חינם!</b>'}</div>
      <div class="progress"><i style="width:${Math.min(100, total / 450 * 100)}%"></i></div>
      <div style="display:flex;justify-content:space-between"><span>סה"כ משוער</span><b style="font-size:20px">${money(total)}</b></div>
      <div class="muted" style="font-size:14px">5% מהמוצרים בתפזורת חוזרים לארנק: <b>${money(bulkTotal * 0.05)}</b> ${plugBadge('wallet')}</div>
      <div class="muted" style="font-size:14px">המחיר במוצרים לפי משקל הוא הערכה. החיוב הסופי רק אחרי הליקוט. ${plugBadge('j5')}</div>
      <a class="btn pri" href="#" onclick="event.preventDefault();demoToast('הדמיה: כאן עוברים לקופה של ווקומרס')">לקופה</a>`;
  }
  function addToCart(id, mode, q) {
    const c = store.get('cart', {});
    const cur = c[id] && c[id].mode === mode ? c[id].q : 0;
    c[id] = { mode: mode || 'unit', q: +(cur + (q || (mode === 'kg' ? 0.25 : 1))).toFixed(2) };
    store.set('cart', c); renderCart();
    toast('נוסף לעגלה: ' + byId[id].name);
  }
  window.addToCart = addToCart;
  function openCart(open) {
    document.getElementById('fcart').classList.toggle('open', open);
    document.getElementById('fcart').setAttribute('aria-hidden', !open);
    document.getElementById('scrim').classList.toggle('open', open);
  }
  window.openCart = openCart;

  let tt;
  function toast(msg) { const t = document.getElementById('toast'); if (!t) return; t.textContent = msg; t.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 2200); }
  window.demoToast = toast;

  function renderFavCount() { const el = document.getElementById('fav-count'); if (el) el.textContent = store.get('favs', []).length; }
  window.renderFavCount = renderFavCount;

  // ---------- boot ----------
  document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('afterbegin', header());
    document.body.insertAdjacentHTML('beforeend', footer());
    document.querySelectorAll('[data-plug]').forEach(el => { el.innerHTML = el.dataset.plug.split(',').map(plugBadge).join(''); el.classList.add('plug-row'); });

    const tgl = document.getElementById('plug-toggle');
    const show = store.get('showPlugs', true);
    tgl.checked = show; document.body.classList.toggle('hide-plugs', !show);
    tgl.addEventListener('change', () => { store.set('showPlugs', tgl.checked); document.body.classList.toggle('hide-plugs', !tgl.checked); });

    const q = document.getElementById('q'), res = document.getElementById('suggest-res');
    q.addEventListener('input', () => {
      const v = q.value.trim();
      const hits = v.length < 2 ? [] : (window.PRODUCTS || []).filter(p => p.name.includes(v)).slice(0, 5);
      res.innerHTML = hits.map(p => `<a href="product.html?id=${p.id}"><img src="${p.img}" alt="">${esc(p.name)}<b style="margin-inline-start:auto">${money(p.price)}</b></a>`).join('');
    });

    document.addEventListener('click', e => {
      const add = e.target.closest('[data-add]');
      if (add) {
        const cardEl = add.closest('.pcard, [data-pd]');
        const mode = cardEl?.querySelector('.uswitch [aria-pressed="true"]')?.dataset.mode || 'unit';
        addToCart(add.dataset.add, mode, +(add.dataset.q || 0) || undefined); return;
      }
      const sw = e.target.closest('.uswitch button');
      if (sw) {
        sw.parentElement.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b === sw));
        const cardEl = sw.closest('.pcard'); const p = cardEl && byId[cardEl.dataset.id];
        if (p) cardEl.querySelector('[data-price]').textContent = sw.dataset.mode === 'kg' ? money(p.price / p.g * 1000) + ' לק"ג' : money(p.price);
        return;
      }
      const fav = e.target.closest('[data-fav]');
      if (fav) {
        let f = store.get('favs', []); const id = fav.dataset.fav;
        f = f.includes(id) ? f.filter(x => x !== id) : f.concat(id);
        store.set('favs', f); fav.setAttribute('aria-pressed', f.includes(id)); fav.innerHTML = f.includes(id) ? ICON.heartFill : ICON.heart;
        renderFavCount(); toast(f.includes(id) ? 'נשמר במועדפים' : 'הוסר מהמועדפים'); return;
      }
      const rm = e.target.closest('[data-rm]');
      if (rm) { const c = store.get('cart', {}); delete c[rm.dataset.rm]; store.set('cart', c); renderCart(); return; }
      if (e.target.closest('#fcart-btn')) openCart(true);
      if (e.target.closest('#fcart-x') || e.target.id === 'scrim') openCart(false);
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') openCart(false); });
    renderCart(); renderFavCount();
    if (typeof window.pageInit === 'function') window.pageInit();
  });
})();
