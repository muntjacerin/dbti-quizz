# DBTI Quiz — Deployment Guide

This is a React + Vite quiz app.

## Local test

```bash
npm install
npm run dev
```

Open `http://localhost:5173/`.

## Build test

```bash
npm run build
npm run preview
```

## Deploy with Vercel

1. Create a GitHub repository and upload all files in this folder.
2. Go to Vercel and import the repository.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Click Deploy.

## Deploy with Netlify

1. Create a GitHub repository and upload all files in this folder.
2. Go to Netlify and add a new site from Git.
3. Build command: `npm run build`.
4. Publish directory: `dist`.
5. Click Deploy.

## Optional image

The app looks for `image.png` in the public root. If you want the full DBTI roster chart to appear at the bottom, place an image called `image.png` inside the `public/` folder.
