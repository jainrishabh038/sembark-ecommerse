This project is a React.js frontend assignment built for Sembark Technologies.
It demonstrates product listing, details, and cart management using MobX, Context API, and React Router — following all the given requirements.

🚀 Features Implemented
🏠 Home Page (Product Listing)

Displays a responsive grid of products with name, price, and image.

Each product links to its Product Detail Page.

Category filter and price sort options.

Filter always re-fetches data from API (no local filtering).

Shows a loading spinner until products are fetched.

📄 Product Detail Page

Route: /product/:id/details

Displays product title, description, price, and an Add to MyCart button.

Fetching by id is disabled as per requirements (data comes from session storage).

🛒 Cart Functionality

Users can add or remove products from the cart.

Quantity can be increased or decreased directly on the Home Page.

Cart total value and item count displayed in the footer (always visible).

Cart data persisted using sessionStorage.

🧭 Navigation

Fixed Navbar at top with:

🏠 Home

🛒 Cart

🛍️ Sembark Store (brand logo → navigates to Home)

Footer fixed at bottom with total cart summary.

⚙️ Technical Stack

React 19 (Functional Components)

MobX + React Context API for state management

React Router DOM v7

Got + Express proxy for fetching from FakeStore API

Inline styles for responsiveness

Lazy loading using React.lazy + Suspense

Cypress for end-to-end testing

🧠 Assumptions & Limitations

Products are fetched from the FakeStore API.

No local filtering — category selection triggers API call each time.

Product detail data not fetched individually (comes from cached session data).

No authentication required.

API proxy runs on port 5000, frontend on port 3000.

⚡ Additional Features

Loading spinner for API calls

Responsive grid for mobile & desktop

Fixed Navbar and Footer

Smooth hover animations on cards

Lazy loading for faster performance

🧩 Setup & Run Instructions
1️⃣ Clone the repository
git clone https://github.com/jainrishabh038/sembark-ecommerse.git
cd sembark-ecommerse

2️⃣ Install dependencies
npm install

3️⃣ Start the development server
npm start

This runs:

Express proxy → http://localhost:5000

React frontend → http://localhost:3000

Then open 👉 http://localhost:3000

🧪 Run Cypress Tests
npm run cypress:open

🧱 Folder Structure
sembark-frontend/
├── server/
│ └── index.js # Express API proxy using got
├── src/
│ ├── components/ # All React components
│ ├── context/ # MobX store + Context setup
│ ├── api.js # API helper functions
│ ├── App.js
│ └── index.js
├── package.json
└── README.md

🪪 Author

Rishabh Kumar Jain
Frontend Developer — React.js
