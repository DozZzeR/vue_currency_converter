# Vue Crypto Currency Converter

A small educational project built with **Vue 3 + Vite**.  
The app converts crypto and fiat currencies using the `crypto-convert` library and is meant as a hands-on introduction to Vue’s Composition API and basic application architecture.

## Features

- Select source and target currencies
- Enter an amount to convert
- Currency conversion via `crypto-convert`
- Basic validation and error handling:
  - same currency pair
  - empty or zero amount
  - unsupported conversion pair
- Light / Dark theme switcher (CSS variables based)

## Tech Stack

- Vue 3 (Composition API, `<script setup>`)
- Vite
- SCSS (semantic tokens + theme support via CSS variables)
- `crypto-convert` for exchange rates

## Getting Started

### Install dependencies
```sh
npm install
````

### Run in development mode

```sh
npm run dev
```

### Build for production

```sh
npm run build
```

### Preview production build

```sh
npm run preview
```

## Notes

* `crypto-convert` is initialized as a singleton (the library does not allow multiple instances).
* If a currency pair is not supported by the library, the app will display an error message instead of crashing.

## Project Structure (high level)

* `src/components` — UI components (Input, Selector, Button, etc.)
* `src/composables` — reusable logic (`useTheme`, etc.)
* `src/styles` — global styles, theme definitions, and design tokens
* `src/services` — application services (e.g. `crypto-convert` singleton)

## Possible Improvements / Roadmap

* [ ] Display formatted conversion result
* [ ] Auto-convert on input with debounce
* [ ] Favorite currency pairs
* [ ] Exchange rate caching and refresh indicator
* [ ] Unit tests for conversion logic

## License

MIT

```

- или написать короткое описание проекта под CV / GitHub bio.
```
