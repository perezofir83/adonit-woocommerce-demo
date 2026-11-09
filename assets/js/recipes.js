/* Recipe content for the demo. The first three come from Adonit's real blog; the rest are content examples. */
window.RECIPES = [
  { id: 'lentils', hero: 'כמון טחון', title: 'איך מבשלים עדשים בלי השריה ובלי שיתפרקו', tag: 'מהבלוג של אדונית', kind: ['problem', 'winter', 'main'], time: '30 דק\'', find: ['עדשים', 'כמון', 'כורכום'] },
  { id: 'halva', hero: 'פיסטוק מקולף', title: 'חלבה ביתית משלושה מרכיבים', tag: 'מהבלוג של אדונית', kind: ['dessert'], time: 'שעה + לילה', find: ['טחינה', 'פיסטוק', 'סוכר'] },
  { id: 'almonds', hero: 'שקד', title: 'שקדים: טבעיים, קלויים או מולבנים?', tag: 'מהבלוג של אדונית', kind: ['guide'], time: '5 דק\' קריאה', find: ['שקד'] },
  { id: 'quick', hero: 'פפריקה מעושנת', title: 'אין זמן לבשל? שקשוקה של אדונית ב-15 דקות', tag: '', kind: ['problem', 'main'], time: '15 דק\'', find: ['פפריקה', 'כמון', 'חריף'] },
  { id: 'leftovers', hero: 'ראס אל חנות', title: 'מה עושים עם שאריות ירקות? מרק כתום עם ראס אל חנות', tag: '', kind: ['problem', 'winter', 'soup'], time: '40 דק\'', find: ['ראס', 'כורכום', 'זנגביל'] },
  { id: 'chai', hero: 'הל ירוק טחון', title: 'צ\'אי חם לערב חורף', tag: '', kind: ['winter', 'drink'], time: '10 דק\'', find: ['תה', 'קינמון', 'הל'] }
];
window.RECIPE_KINDS = { problem: 'פותרים בעיה', winter: 'לחורף', main: 'מנה עיקרית', soup: 'מרקים', dessert: 'קינוחים', drink: 'משקאות', guide: 'מדריכים' };
window.recipeProducts = function (r) {
  const out = [];
  r.find.forEach(w => { const p = (window.PRODUCTS || []).find(x => x.name.includes(w) && !out.includes(x)); if (p) out.push(p); });
  return out;
};
window.recipeCard = function (r) {
  const ps = recipeProducts(r);
  const heroP = (window.PRODUCTS || []).find(x => r.hero && x.name.includes(r.hero));
  const img = heroP ? heroP.img : (ps[0] ? ps[0].img : '');
  return `<article class="card" style="overflow:hidden;display:flex;flex-direction:column">
    ${img ? `<img src="${img}" alt="" loading="lazy" style="aspect-ratio:16/10;object-fit:cover;width:100%">` : '<div class="ph" style="aspect-ratio:16/10;border-radius:0">[צילום מנה]</div>'}
    <div style="padding:16px 18px;display:flex;flex-direction:column;gap:8px;flex:1">
      ${r.tag ? `<span class="tag green" style="align-self:flex-start">${esc(r.tag)}</span>` : ''}
      <h3 style="font-size:19px">${esc(r.title)}</h3>
      <span class="muted" style="font-size:14px">${esc(r.time)} · ${r.kind.map(k => RECIPE_KINDS[k]).join(' · ')}</span>
      <div style="display:flex;gap:6px;margin-top:auto">${ps.map(p => `<img src="${p.img}" alt="${esc(p.name)}" title="${esc(p.name)}" style="width:40px;height:40px;border-radius:10px;object-fit:contain;background:var(--soft)">`).join('')}</div>
      <button class="btn pri sm" data-recipe="${r.id}">כל המצרכים לעגלה (${ps.length})</button>
    </div></article>`;
};
document.addEventListener('click', e => {
  const b = e.target.closest('[data-recipe]'); if (!b) return;
  const r = RECIPES.find(x => x.id === b.dataset.recipe);
  recipeProducts(r).forEach(p => addToCart(p.id, 'unit', 1));
  demoToast('המצרכים נוספו לעגלה');
});
