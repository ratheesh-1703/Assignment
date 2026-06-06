# PopX Assignment Project

This is my React assignment project where I built the user onboarding screens (Landing screen, Login screen, Signup screen, and Profile Settings page) based on the PopX mockups. 

I built this with React JS, Vite for fast development, React Router DOM for page routing, and CSS for styling the UI.

## What I Did

- I made four pages: Landing, Login, Signup, and Profile.
- I used standard CSS to align everything.
- For the input fields, I used absolute positioning to make the labels sit on the borders.
- I custom-styled the radio buttons to make sure they look identical across all browsers.
- I set up an Auth Context to handle signup and login flow. The user data and base64 profile picture are saved in localStorage so the profile doesn't reset when refreshing the page.

## File Structure

- src/components/Button.jsx: Reusable button component.
- src/components/InputField.jsx: Reusable input field with cutout labels.
- src/context/AuthContext.jsx: Saves user state in localStorage.
- src/pages/Landing.jsx: First page with welcome text.
- src/pages/Login.jsx: Signin form.
- src/pages/Signup.jsx: Register form.
- src/pages/Profile.jsx: Shows logged-in user details.
- src/index.css: CSS files for the screen layouts and custom components.

## How to Run the Project

1. Open your terminal in this project folder.
2. Install npm packages:
   npm install
3. Start the local server:
   npm run dev
4. Open the link http://localhost:5173 in your browser.

## How to Build

- To build the project files:
  npm run build
- To preview the build:
  npm run preview