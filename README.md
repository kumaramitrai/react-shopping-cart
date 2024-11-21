# React Shopping Cart

This project is a React application built with Vite. It utilizes the React Router for navigation, and state management is handled using the context API.

## Features

- **Shop Page:** Displays a list of products retrieved from the `productData` json file.
- **Product Detail Page:** Displays detailed information about a specific product and buttons for add to cart and quantity increase.
- **Error Page:** Shown when there's a routing error.
- **Local storage implement** Implemented a feature to persist the cart state using localStorage.
- **Image Optimization:** Image optimization with the `ViteImagemin` plugin and lazy loading.

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository
2. `npm install`
3. `npm run dev`

### Testing

Testing is done using Cypress. Run the tests with the following :

## Run the Tests

1.  Start your development server:
    npm run dev
2.  Run Cypress:
    npx cypress run

### Technologies Used

- React
- React Router
- Context API
- Vite (build)
