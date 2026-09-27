# FitLog — Workout Library

FitLog is a responsive fitness and workout web application built with Next.js. It allows users to explore different exercises, view workout details, and organize workouts into their personal plan.

## Live Project

Add your deployed website link here after deployment.

## Features

* Browse a workout library with exercise information.
* View individual workout details including muscle groups, equipment, difficulty, duration, and instructions.
* Add workouts to a personal workout plan.
* Remove workouts from the personal plan.
* Responsive design for desktop, tablet, and mobile devices.
* Reusable React components for the user interface.
* Context API for managing workout and plan state.
* External API integration for workout data.

## Technologies Used

* Next.js
* React
* JavaScript
* Tailwind CSS
* Context API
* REST API

## API

FitLog uses the following API to retrieve workout information:

**All workouts:**

https://api.abcz.workers.dev/api/fitlog

**Single workout:**

https://api.abcz.workers.dev/api/fitlog/:id

The API data is handled through `lib/api.js`, where workout information is normalized before being used by the application.

## Project Structure

```text
fitlog/
├── app/
│   ├── my-plan/
│   ├── workout/
│   ├── globals.css
│   ├── layout.js
│   ├── not-found.js
│   └── page.js
│
├── components/
│   ├── Hero
│   ├── Navbar
│   ├── Footer
│   ├── WorkoutGrid
│   └── other reusable components
│
├── context/
│   └── FitLogContext.js
│
├── lib/
│   └── api.js
│
├── public/
│   ├── hero.png
│   └── logo.png
│
├── package.json
├── package-lock.json
├── jsconfig.json
├── next.config.mjs
└── README.md
```

## Getting Started

First, install the project dependencies:

```bash
npm install
```

Then start the development server:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

If port 3000 is already being used, Next.js will automatically provide another available port.

## Build for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## State Management

FitLog uses React Context API through `FitLogContext.js` to manage application state, including the user's workout plan.

## API Handling

API-related functions are stored in:

```text
lib/api.js
```

The application retrieves workout information from the external API and normalizes the response so the rest of the application can work with a consistent data structure.

## Responsive Design

The application is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

## Author

**Shaswati Mallik**

## License

This project was created for educational purposes.
