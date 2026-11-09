# Adonit Hatavlinim – WooCommerce demo

A clickable static demo of a new online store for **Adonit Hatavlinim** (אדונית התבלינים), an Israeli spice and deli chain with 8 branches.

The demo shows how the current Konimbo store can look and work after a move to WooCommerce. It uses the real texts, prices and product photos from the current site (adonithatavlinim.co.il), and the features the store team picked from a reference review of 16 food sites.

## What is in the demo

| Page | File |
|---|---|
| Home | `index.html` |
| Category / search | `category.html?c=<key>` · `?m=<menu>` · `?q=<text>` |
| Product | `product.html?id=<id>` |
| Gift boxes + build your own | `gifts.html` |
| My account: reorder, fixed order, wallet, favourites, gift card | `account.html` |
| Business department | `business.html` |
| FAQ, shipping check, returns, kosher | `help.html` |
| Branches and workshops | `branches.html` |
| Recipes | `recipes.html` |
| About | `about.html` |
| Plugin map and costs | `plugins.html` |

Every feature carries a badge with the WooCommerce plugin that would run it, and whether the plugin is free, partly free or paid. The switch in the top bar hides the badges.

## Run locally

```bash
python3 -m http.server 8181
```

Open http://localhost:8181.

## Notes

- Static HTML, CSS and vanilla JS. No build step.
- Product data: `assets/js/data.js` (331 products scraped from the public site). Source: `data/source.json`.
- Cart, favourites and fixed order are kept in the browser (`localStorage`) for the demo only. Nothing is sold.
- Text in `[square brackets]` is a placeholder for content the store still needs to supply.
- `robots.txt` and `noindex` keep the demo out of search engines.
