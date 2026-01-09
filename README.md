React API Auth App

Frontend Assignment:

A fully functional React application simulating a real-world API integration with authentication, protected routes, dashboard with user listing, session management, and enhanced UI/UX.

Features
Mandatory Features (as per assignment)

Login

Simple login form with email and password.

Mocked authentication using hardcoded credentials:

Email: eve.holt@reqres.in

Password: cityslicka

On successful login:

Token is stored in localStorage

Token timestamp is stored to manage session expiry

Redirects to the protected dashboard

Protected Dashboard

Dashboard displays a list of users fetched from JSONPlaceholder API

Each user card shows:

Name

Email

City

Click on a user card → shows detailed modal with extra info (company, phone, street, website)

Route Protection

/dashboard is protected

Unauthenticated users or expired sessions are redirected to login

Shows proper error handling

Logout

Clears token and timestamp

Redirects back to login page

Error & Loading Handling

Loader displayed while fetching data

API failures show meaningful error message

Retry button for failed API calls

Bonus / Extra Features Implemented

Axios Interceptors

Axios instance configured with request and response interceptors

Automatically adds Authorization token to all requests

Handles 401 Unauthorized errors globally and redirects to login

Token Expiry

Session expires in 10 minutes

Users are automatically logged out when the token expires

If session expired, user is redirected to login

Enhanced UI / UX

Dashboard uses responsive cards grid

Smooth animations for cards on load, hover, and modal open

User modal opens with fade + scale animation

Buttons, inputs, and modal styled with modern gradients and shadows

Pagination implemented with 4 users per page

Folder Structure
react-api-auth-app/
│
├─ src/
│   ├─ api/
│   │   └─ api.js               # Axios instance with interceptors
│   ├─ auth/
│   │   └─ AuthContext.js       # Auth context, login, logout, token expiry
│   ├─ components/
│   │   ├─ Loader.js            # Loader component
│   │   └─ ErrorMessage.js      # Error message component
│   ├─ pages/
│   │   ├─ Login.js             # Login page
│   │   └─ Dashboard.js         # Protected dashboard page
│   └─ App.js                   # Routing & ProtectedRoute setup
│
├─ package.json
└─ README.md

How to Run Locally

Clone the repository

git clone https://github.com/<your-username>/react-api-auth-app.git


Navigate to project directory

cd react-api-auth-app


Install dependencies

npm install


Start development server

npm start


Open http://localhost:3000
 in browser

Demo Credentials
Email	Password
eve.holt@reqres.in
	cityslicka

After 10 minutes, the token expires, and you will be automatically redirected to login.

Technical Stack

Framework: React

Routing: React Router DOM

HTTP Client: Axios

State Management: React Context API

CSS: Inline styles (for rapid assignment UI)

API: JSONPlaceholder


This project is a full-fledged frontend simulation of a real-world application with proper authentication flow, API handling, UI enhancements, and error management. It satisfies all mandatory requirements and includes the optional bonus features.
