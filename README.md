# Manrai Portfolio

A motion-led, zero-dependency portfolio built with semantic HTML, CSS, and JavaScript.

## Run locally

```bash
npm run dev
```

Then open `http://localhost:4173`.

## Project structure

```text
portfolio/
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── images/
│   └── js/
│       └── app.js
├── index.html
├── package.json
└── README.md
```

## Customize

- Edit project titles, descriptions, dates, and color treatments in the `portfolio.projects` array in `assets/js/app.js`.
- Replace the email and social links in `index.html`.
- Change `--accent` at the top of `assets/css/styles.css` to recolor the full site in one place.

The site includes reduced-motion support, keyboard-accessible projects, responsive layouts, and no build step.
