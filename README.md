# ✅ NOT@MRP Backend Developer Intern Assignment

**Inventory & Billing Management System**

This is a simple backend system for small businesses to manage products, customers, vendors, and transactions.

### 📂 Tech Stack

- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT-based authentication
- Password hashing with bcrypt

---

## 🚀 Getting Started

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file in the root folder and add:

```
PORT=8000
MONGO_URI=mongodb://localhost:27017/inventorydb
JWT_SECRET=your_secret_key
```

### 4. Run the server

```bash
npm start
```

The server will be running at `http://localhost:8000/`.

---

## ✅ API Endpoints

### 🔑 Authentication

#### 1. Register

- **URL:** `/api/auth/register`
- **Method:** POST
- **Body:**

```json
{
  "name": "Ashish",
  "email": "ashish@example.com",
  "password": "password123"
}
```

- **Response:**

```json
{
  "message": "User registered successfully"
}
```

#### 2. Login

- **URL:** `/api/auth/login`
- **Method:** POST
- **Body:**

```json
{
  "email": "ashish@example.com",
  "password": "password123"
}
```

- **Response:**

```json
{
  "token": "your_jwt_token"
}
```

#### 3. Logout

- **URL:** `/api/auth/logout`
- **Method:** GET
- **Headers:**
  `Authorization: Bearer your_jwt_token`

---

### 📦 Products

#### 1. List Products

- **URL:** `/api/products`
- **Method:** GET
- **Headers:**
  `Authorization: Bearer your_jwt_token`

#### 2. Add Product

- **URL:** `/api/products`
- **Method:** POST
- **Body:**

```json
{
  "name": "Laptop",
  "description": "Gaming laptop",
  "price": 1500,
  "stock": 10,
  "category": "Electronics"
}
```

- **Response:**

```json
{
  "message": "Product added successfully"
}
```

#### 3. Update Product

- **URL:** `/api/products/:id`
- **Method:** PUT
- **Body:**

```json
{
  "price": 1400,
  "stock": 12
}
```

- **Response:**

```json
{
  "message": "Product updated successfully"
}
```

#### 4. Delete Product

- **URL:** `/api/products/:id`
- **Method:** DELETE
- **Response:**

```json
{
  "message": "Product deleted successfully"
}
```

---

### 📇 Contacts (Customers & Vendors)

#### 1. List Contacts

- **URL:** `/api/contacts`
- **Method:** GET
- **Headers:**
  `Authorization: Bearer your_jwt_token`

#### 2. Add Contact

- **URL:** `/api/contacts`
- **Method:** POST
- **Body:**

```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "email": "john@example.com",
  "address": "Mumbai",
  "type": "customer"
}
```

- **Response:**

```json
{
  "message": "Contact added successfully"
}
```

#### 3. Update Contact

- **URL:** `/api/contacts/:id`
- **Method:** PUT

#### 4. Delete Contact

- **URL:** `/api/contacts/:id`
- **Method:** D
