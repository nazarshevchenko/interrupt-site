# Interrupt — interrupt.it.com

Сайт-візитка. Vite + React 19 + HeroUI v3 + Tailwind v4.

## Локально
```bash
npm install
npm run dev
```

## Деплой на GitHub Pages
1. Запуште репозиторій у гілку `main`.
2. Settings → Pages → Source: **GitHub Actions**.
3. Settings → Pages → Custom domain: `interrupt.it.com` (файл `public/CNAME` вже є), увімкніть **Enforce HTTPS**.
4. DNS у реєстратора:
   - `A` для `@` → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - `CNAME` для `www` → `<username>.github.io`

## Що міняти
- Email і тексти — вгорі `src/App.tsx` (`EMAIL`, об'єкт `t`).
- Колір акценту — `--accent` у `src/index.css`.
