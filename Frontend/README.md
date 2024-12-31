# RideMate Frontend

## Project Overview

RideMate is a ride-sharing application designed to connect users with drivers. The frontend of this project is built using Vite and React, providing a seamless and responsive user experience. Key features include user and driver sign-up, real-time ride tracking, and fare estimation.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server.
- **TailwindCSS**: A utility-first CSS framework.
- **Mapbox**: A mapping and location service.
- **Socket.io**: Real-time, bidirectional communication.

## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/syrr0143/RideMate
   cd RideMate/Frontend
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Run the development server**:
   ```sh
   npm run dev
   ```

## Usage

- **Landing Page**: The entry point of the application where users can sign up or log in.
- **User Signup/Login**: Allows users to create an account or log in to their existing account.
- **Driver Signup/Login**: Allows drivers to create an account or log in to their existing account.
- **Ride Booking**: Users can book a ride by selecting a pickup and destination location.
- **Real-time Tracking**: Users can track their ride in real-time using Mapbox integration.

## Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the project for production.
- **`npm run preview`**: Previews the production build locally.
- **`npm run lint`**: Runs ESLint to check for code quality issues.

## File Structure

```
Frontend/
├── .env
├── .gitignore
├── bun.lockb
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── public/
│   └── LandingPage/
├── README.md
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── assets/
│   ├── components/
│   │   ├── AuthWrapper/
│   │   ├── BottomNavbar.jsx
│   │   ├── BrandLogo.jsx
│   │   ├── Button.jsx
│   │   ├── Captain_Component/
│   │   ├── ChoseVehicle.jsx
│   │   ├── ConfirmRide.jsx
│   │   ├── DriverAssigned.jsx
│   │   ├── FindTrip.jsx
│   │   ├── index.jsx
│   │   ├── InputBox.jsx
│   │   ├── Loader.jsx
│   │   ├── LocationSearchResult.jsx
│   ├── config/
│   │   └── Api.js
│   ├── context/
│   ├── hooks/
│   ├── index.css
│   ├── main.jsx
│   ├── pages/
│   ├── utils/
├── tailwind.config.js
└── vite.config.js
```

## Contributing

1. **Fork the repository**:
   Click the "Fork" button at the top right of the repository page.

2. **Clone your fork**:

   ```sh
   git clone https://github.com/syrr0143/RideMate
   cd RideMate/Frontend
   ```

3. **Create a new branch**:

   ```sh
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**:
   Implement your feature or fix the bug.

5. **Commit your changes**:

   ```sh
   git add .
   git commit -m "Add your commit message"
   ```

6. **Push to your fork**:

   ```sh
   git push origin feature/your-feature-name
   ```

7. **Submit a pull request**:
   Go to the original repository and click "New Pull Request".
