# Velvetta Frontend

Premium talent platform frontend built with Vue 3, Vuetify, and modern web technologies.

## Features

- Modern and simple UI design with purple primary color
- Responsive design for all devices
- Multiple pages: Home, Talent, Product, Casting, QNA, Contact
- WhatsApp integration for communication
- Age verification modal (18+)
- Image carousels and galleries
- News/Blog masonry layout

## Tech Stack

- Vue 3
- Vuetify 3
- Vue Router
- Pinia
- Vite
- Axios

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Configuration

Before deploying, make sure to update:
- WhatsApp phone numbers in components
- Email addresses in contact forms
- API endpoints if using backend services
- Image URLs (currently using placeholders)

## Project Structure

```
src/
├── components/     # Reusable components
├── views/          # Page components
├── layouts/        # Layout components
├── router/         # Vue Router configuration
├── plugins/        # Vuetify and other plugins
└── main.js         # Application entry point
```
