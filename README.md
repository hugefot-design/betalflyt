# InvoiceSpark (MVP)

Free invoice generator (EN/NO) that exports a clean PDF. Designed to be a public utility (traffic) with a path to a paid B2B product (tracking, reminders, branded portal).

## Dev

```bash
cd apps/web
npm install
npm run dev -- --port 3005
```

Open:
- http://localhost:3005/
- http://localhost:3005/generator

## Build

```bash
cd apps/web
npm run build
npm run start
```

## Notes

- Drafts are saved locally in the browser via `localStorage`.
- PDF generation uses `jspdf` + `jspdf-autotable`.
