# Remix App with PandaCSS and i18n

This project is a blog built with Remix, using MDX for content and supporting i18n.

## Project Structure

- The app is based on Remix framework
- PandaCSS is used for styling
- Internationalization (i18n) is implemented for multiple language support

## Installation

To install the necessary dependencies, run:

```shellscript
npm install
```

## Run

Spin up the Vite dev server:

```shellscript
npm run dev
```

You can access the app at: [http://localhost:5173](http://localhost:5173)

Or build your app for production and run it:

```shellscript
npm run build
npm run start
```

## Custom API Route

You can access the custom API route to get the most recent articles about space flights:

```
GET /api/articles
```

This endpoint returns the 100 most recent articles related to space flights.