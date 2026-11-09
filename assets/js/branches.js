/* Branch routing for the demo: every order goes to the branch nearest the customer.
   Coordinates are approximate city/branch centres, good enough to pick the nearest branch. */
(function () {
  'use strict';
  const BRANCHES = [
    { id: 'pardes', name: 'פרדס חנה', addr: 'רח\' החרובים 7', tel: '053-3873680', hours: 'א-ה 7:15-21:00 · ו 7:15-16:00', lat: 32.474, lng: 34.974 },
    { id: 'kfaryona', name: 'כפר יונה', addr: 'קניון כפר יונה, בן גוריון 11', tel: '053-4362202', hours: 'א-ה 9:00-20:30 · ו 8:30-14:00', lat: 32.317, lng: 34.935 },
    { id: 'raanana', name: 'רעננה', addr: 'הנופר 2', tel: '053-3009968', hours: 'א-ה 7:30-20:00 · ו 7:30-15:00', lat: 32.184, lng: 34.871 },
    { id: 'mhaderech', name: 'M הדרך', addr: 'קניון M הדרך, בית חירות', tel: '053-3935334', hours: 'א-ה 8:30-21:00 · ו 8:00-16:30 · שבת 9:00-21:00', lat: 32.388, lng: 34.874 },
    { id: 'rosh', name: 'ראש העין', addr: 'שבזי 225', tel: '050-9948474', hours: 'א-ה 8:00-20:00 · ו 8:00-15:00', lat: 32.095, lng: 34.957 },
    { id: 'afula', name: 'עפולה', addr: 'יהושע חנקין 8', tel: '052-3871376', hours: 'א-ה 8:00-21:00 · ו 8:00-15:00', lat: 32.608, lng: 35.290 },
    { id: 'ono', name: 'קריית אונו', addr: 'לוי אשכול 77', tel: '052-8674910', hours: 'א-ה 8:30-21:00 · ו 8:30-15:00', lat: 32.063, lng: 34.855 },
    { id: 'tlv', name: 'תל אביב', addr: 'ולטר מוזס 12', tel: '052-5575178', hours: 'א-ה 8:00-20:00 · ו 8:00-15:00', lat: 32.110, lng: 34.840 }
  ];
  const CITIES = {
    'פרדס חנה-כרכור': [32.474, 34.974], 'בנימינה': [32.522, 34.945], 'זכרון יעקב': [32.571, 34.952], 'קיסריה': [32.500, 34.900], 'אור עקיבא': [32.507, 34.918],
    'חדרה': [32.434, 34.919], 'נתניה': [32.321, 34.853], 'כפר יונה': [32.317, 34.935], 'אבן יהודה': [32.270, 34.888], 'טייבה': [32.266, 35.009],
    'רעננה': [32.184, 34.871], 'כפר סבא': [32.178, 34.907], 'הוד השרון': [32.150, 34.888], 'הרצליה': [32.166, 34.844], 'רמת השרון': [32.146, 34.839],
    'תל אביב': [32.085, 34.781], 'רמת גן': [32.068, 34.824], 'גבעתיים': [32.072, 34.812], 'בני ברק': [32.083, 34.833], 'גבעת שמואל': [32.078, 34.849],
    'קריית אונו': [32.063, 34.855], 'אור יהודה': [32.029, 34.856], 'יהוד': [32.033, 34.888], 'פתח תקווה': [32.087, 34.887], 'ראש העין': [32.095, 34.957],
    'אלעד': [32.052, 34.951], 'חולון': [32.011, 34.774], 'בת ים': [32.023, 34.751], 'ראשון לציון': [31.964, 34.804], 'רחובות': [31.894, 34.811],
    'מודיעין': [31.899, 35.010], 'ירושלים': [31.778, 35.235], 'אשדוד': [31.804, 34.655], 'אשקלון': [31.669, 34.571], 'באר שבע': [31.252, 34.791],
    'אילת': [29.558, 34.952], 'חיפה': [32.794, 34.989], 'קריית אתא': [32.809, 35.106], 'יקנעם': [32.659, 35.110], 'עפולה': [32.608, 35.290],
    'נצרת': [32.700, 35.303], 'נוף הגליל': [32.705, 35.320], 'בית שאן': [32.497, 35.497], 'טבריה': [32.795, 35.531], 'כרמיאל': [32.914, 35.296],
    'עכו': [32.928, 35.076], 'נהריה': [33.008, 35.095], 'צפת': [32.965, 35.496], 'קריית שמונה': [33.207, 35.571], 'אום אל-פחם': [32.519, 35.153]
  };
  const LOCAL_KM = 15; // inside this radius the branch delivers itself, same or next day
  function km(a, b) {
    const R = 6371, r = x => x * Math.PI / 180;
    const dLat = r(b[0] - a[0]), dLng = r(b[1] - a[1]);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(r(a[0])) * Math.cos(r(b[0])) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  function nearest(lat, lng) {
    return BRANCHES.map(b => ({ b, d: km([lat, lng], [b.lat, b.lng]) })).sort((x, y) => x.d - y.d)[0];
  }
  function routeFor(city) {
    const c = CITIES[city]; if (!c) return null;
    const n = nearest(c[0], c[1]);
    return { city, branch: n.b, km: Math.round(n.d), local: n.d <= LOCAL_KM };
  }
  window.BRANCHES = BRANCHES; window.CITIES = CITIES; window.routeFor = routeFor; window.nearestBranch = nearest; window.LOCAL_KM = LOCAL_KM;

  const KEY = 'adonit-demo-route';
  window.getRoute = () => { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } };
  window.setRoute = r => { try { localStorage.setItem(KEY, JSON.stringify(r)); } catch (e) { } document.dispatchEvent(new CustomEvent('route-change')); };
  window.routeText = r => r.local
    ? `משלוח מסניף ${r.branch.name} עד הבית, היום או מחר`
    : `נשלח עם שליח מסניף ${r.branch.name}, עד 5 ימי עסקים`;

  // ---------- branch picker dialog ----------
  function dialogHtml() {
    return `<dialog class="route-dlg" id="route-dlg" aria-labelledby="route-title">
  <form method="dialog" class="route-box" id="route-form">
    <button class="x" value="cancel" aria-label="סגירה" formnovalidate>×</button>
    <h2 id="route-title">לאן לשלוח?</h2>
    <p class="muted" style="margin:0">ההזמנה שלכם יוצאת מהסניף הכי קרוב אליכם. כך היא מגיעה מהר יותר, וטרייה יותר.</p>
    <label class="field">עיר או יישוב<input id="route-city" list="route-cities" autocomplete="address-level2" placeholder="לדוגמה: נתניה"></label>
    <datalist id="route-cities">${Object.keys(CITIES).map(c => `<option>${c}</option>`).join('')}</datalist>
    <button type="button" class="btn sec sm" id="route-geo" style="align-self:flex-start">השתמשו במיקום שלי</button>
    <div id="route-res" aria-live="polite"></div>
    <div style="display:flex;gap:10px;flex-wrap:wrap"><button type="button" class="btn pri" id="route-save" disabled>שמירה</button><a class="btn sec" href="branches.html#how">איך זה עובד</a></div>
  </form>
</dialog>`;
  }
  let pending = null;
  function showResult(r) {
    const res = document.getElementById('route-res'), save = document.getElementById('route-save');
    if (!r) { res.innerHTML = '<p class="muted" style="margin:0">לא מצאנו את היישוב. נסו עיר קרובה, או השתמשו במיקום.</p>'; save.disabled = true; pending = null; return; }
    pending = r; save.disabled = false;
    res.innerHTML = `<div class="route-card"><span class="tag green">הסניף הכי קרוב: ${r.km} ק"מ</span>
      <b style="font-size:20px">סניף ${r.branch.name}</b><span>${r.branch.addr} · ${r.branch.hours}</span>
      <span>${r.local ? '<b>משלוח מהסניף עד הבית, היום או מחר.</b>' : '<b>משלוח עם שליח מהסניף, עד 5 ימי עסקים.</b>'}</span>
      <span class="muted">אפשר גם לאסוף מהסניף, בלי עלות.</span></div>`;
  }
  window.openRoute = function (after) {
    const d = document.getElementById('route-dlg'); if (!d) return;
    d._after = after || null;
    const cur = getRoute(); document.getElementById('route-city').value = cur ? cur.city : '';
    showResult(cur ? routeFor(cur.city) || cur : null); if (!cur) document.getElementById('route-res').innerHTML = '';
    d.showModal(); document.getElementById('route-city').focus();
  };
  document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('beforeend', dialogHtml());
    const city = document.getElementById('route-city');
    city.addEventListener('input', () => { const r = routeFor(city.value.trim()); if (r || city.value.trim().length > 2) showResult(r); });
    document.getElementById('route-geo').addEventListener('click', () => {
      const res = document.getElementById('route-res');
      if (!navigator.geolocation) { res.textContent = 'הדפדפן לא תומך במיקום. הקלידו עיר.'; return; }
      res.textContent = 'מאתרים את המיקום…';
      navigator.geolocation.getCurrentPosition(pos => {
        const n = nearest(pos.coords.latitude, pos.coords.longitude);
        showResult({ city: 'המיקום שלי', branch: n.b, km: Math.round(n.d), local: n.d <= LOCAL_KM });
      }, () => { res.textContent = 'לא קיבלנו גישה למיקום. הקלידו עיר.'; }, { timeout: 8000 });
    });
    document.getElementById('route-save').addEventListener('click', () => {
      if (!pending) return;
      setRoute({ city: pending.city, branchId: pending.branch.id, branch: pending.branch, km: pending.km, local: pending.local });
      const d = document.getElementById('route-dlg'); d.close();
      if (typeof window.demoToast === 'function') demoToast('ההזמנות שלכם יצאו מסניף ' + pending.branch.name);
      if (d._after) d._after();
    });
    document.addEventListener('click', e => { if (e.target.closest('[data-route]')) { e.preventDefault(); openRoute(); } });
  });
})();
