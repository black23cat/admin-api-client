# Polyraphic Admin API Client

Frontend application for the Polygraphic Administration System.

This application provides a web-based interface for managing purchase orders, invoices, payments, and production job data.

The application communicates with the Polygraphic Admin API Server and requires user authentication before accessing protected pages.

## 📺 Live Preview

Demo : [Admin API](https://admin-api-client.vercel.app)

## 🚀 Features

### 🔐 Authentication

- User login
- JWT-based authentication
- Protected application routes
- Unauthorized users are redirected to the login page

### 📦 Purchase Order Management

- View purchase orders
- Create new purchase orders
- Manage purchase order information
- Upload production files
- Validate production file information
- Filter and search purchase orders

### 🧾 Invoice Management

- View invoice details
- Generate invoices from purchase orders
- Add non-print items
- Apply cashback or discounts
- Track invoice status

### 💳 Payment Management

- Record invoice payments
- Track payment history
- Support partial payments
- Monitor invoice payment status

### 🏭 Job Data

- View production job data
- Track work generated from purchase orders
- Connect production records with invoiced orders

## 🛠 Tech Stack

- React
- Vite
- React Router
- JavaScript
- CSS / Styled Components
- Vitest
- React Testing Library

## ⚙️ Installation

### 1. Clone the repository

```sh
git clone https://github.com/black23cat/admin-api-client.git
```

### 2. Move into the project directory and install dependencies

```sh
cd admin-api-client && npm install
```

## 🔐 Environment Variables

Create .env file in root directory

Example:

```sh
VITE_API_URL=http://localhost:3000
```

The frontend application will use this URL to communicate with the API server.

Make sure the backend server is running before using the application.

## ▶️ Running the Application

Start the development server:

```sh
npm run dev
```

Vite will provide a local development URL, typically:

```sh
http://localhost:5173
```

## 🧪 Testing

This project includes testing configuration using Vitest and React Testing Library.

Run the tests using:

```sh
npm run test
```

## 🔒 Route Protection

The application requires authentication to access its main features.

Users without a valid authentication session will be presented with the login page instead of the application's protected routes.

## 🧭 Main Application Pages

The application includes several primary administrative pages.

### Purchase Orders

/purchase-order

View and manage existing purchase orders.

### Create Purchase Order

/purchase-order/create

Create new purchase orders and add production-related information.

### Invoice

/invoice

View and manage invoices generated from purchase orders.

### Payment

/payment

View Record and track invoice payments.

### Job Data

/job-data

View production job information.

## 🎯 Project Purpose

This project was developed as an administrative system for a polygraphic printing or printing-related business.

The primary goal is to centralize operational and financial workflows, including:

- Purchase order management
- Production file validation
- Invoice generation
- Payment tracking
- Weekly and monthly cash monitoring
- Production job recording

## 🔮 Future Improvements

Potential improvements include:

- Loading and error states
- Improved accessibility
- More comprehensive testing
- Dashboard and financial analytics
- Generate downloadable pdf file for Purchase Order and Invoice
- Change language to Indonesia

## 🔗 Related Repository

Backend API: [Polygraphic Admin API Server](https://github.com/black23cat/admin-api-server)

## 🙏 Acknowledgements

This project was developed as part of my journey in learning full-stack web development.

Special thanks to The Odin Project for providing a comprehensive, free, and open-source curriculum that helped me build a strong foundation in modern web development.

Thank you to The Odin Project and its open-source community for making high-quality programming education accessible to everyone.

🔗 [The Odin Project](https://www.theodinproject.com/)

🔗 [The Odin Project on GitHub](https://github.com/theodinproject)

## 👨‍💻 Author

Developed by Prayogi Pangestu @black23cat

## 📄 License

This project is currently intended as a personal portfolio and internal administration application. Please contact the repository owner before using this project for commercial purposes.
