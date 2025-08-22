# Solar Housing Project

## Problem Statement

Many property owners and city planners lack accessible tools to quickly visualize and compare the solar potential of different locations. This project aims to solve that by providing an interactive web app that displays solar suitability scores on a map, making it easier to identify optimal spots for solar panel installation.

## Tech Stack

- **React** — Frontend framework for building the user interface
- **Vite** — Fast development server and build tool
- **React Router** — Client-side routing for navigation between pages
- **Bootstrap** — Responsive UI components and layout
- **Google Maps JavaScript API** — Interactive map and marker visualization
- **@react-google-maps/api** — React bindings for Google Maps
- **Node.js / Express** (optional, for backend API if needed)

## Features

- **Search Bar:** Search for a location to view its solar score.
- **Google Map:** Displays locations with color-coded markers (green, yellow, red) based on solar suitability.
- **Results Panel:** Lists search results and their solar scores.
- **UV Index Legend:** Visual guide for interpreting marker colors.
- **Test Component:** A sandbox for experimenting with UI and features, accessible at `/test`.

## Project Structure

```
src/
  components/
    test.jsx
    title.jsx
  App.jsx
  App.css
  ...
```

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Set up environment variables:**
   - Create a `.env` file in the root of your project.
   - Add your Google Maps API key:
     ```
     VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
     ```

3. **Run the app locally:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Routing

- `/` — Main app with map and search.
- `/test` — Test component for UI/feature sandboxing.

## Deployment

You can deploy this app to any static hosting provider (Vercel, Netlify, Azure Static Web Apps, etc.).

### Example: Deploy to Azure Static Web Apps

1. **Push your code to GitHub.**
2. **In the Azure Portal:**
   - Create a new Static Web App.
   - Connect your GitHub repo.
   - Set the build output folder to `dist`.
   - Add your environment variable `VITE_GOOGLE_MAPS_API_KEY` in the Azure Portal.
3. **Azure will automatically build and deploy your app.**

### Example: Deploy to Vercel

1. [Sign up for Vercel](https://vercel.com/) and install the Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Run the deploy command in your project directory:
   ```sh
   vercel
   ```
3. When prompted, set your environment variable `VITE_GOOGLE_MAPS_API_KEY`.

### Example: Deploy to Netlify

1. [Sign up for Netlify](https://www.netlify.com/) and install the Netlify CLI:
   ```sh
   npm install -g netlify-cli
   ```
2. Run the deploy command:
   ```sh
   netlify deploy
   ```
3. Set your environment variable in the Netlify dashboard.

---

**For Azure Static Web Apps:**  
- Push your code to GitHub.
- Create a new Static Web App in the Azure Portal.
- Connect your GitHub repo and set the build output folder to `dist`.
- Add your environment variable in the Azure Portal.

---

## Notes

- Make sure your Google Maps API key has Maps JavaScript API enabled.
- The `/test` route is for development and experimentation.

---

**Enjoy building with the Solar Housing