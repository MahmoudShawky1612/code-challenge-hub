# Coding Challenge Platform

This is a coding challenge platform built using **TypeScript, Node.js, Express, Prisma, and PostgreSQL**. The platform allows users to create coding challenges, submit solutions, comment on solutions, like solutions, and track their rankings via a leaderboard.

---
## Features
- User authentication (Sign up & Login)
- Create, retrieve, and manage coding challenges
- Submit solutions for challenges
- Comment on solutions
- Like solutions
- Accept solutions (by challenge creator)
- Track rankings via leaderboard

---
## Technologies Used

- TypeScript
  
- Node.js - JavaScript runtime

- Express.js - Backend framework

- Prisma - ORM for database interactions

- PostgreSQL - Database

- JWT (JSON Web Token) - Authentication mechanism

- Zod - Schema validation

- Bcrypt - Password hashing
---
## Installation and Setup
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS recommended)
- [PostgreSQL](https://www.postgresql.org/) (Ensure it's running and accessible)

### 1. Clone the Repository
```sh
git clone <repository-url>
cd coding-challenge-platform
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and configure the following:
```env
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<dbname>
JWT_SECRET=your_secret_key
```

### 4. Set Up the Database
```sh
npx prisma migrate dev --name init
npx prisma generate
```
This will create the necessary tables in your PostgreSQL database.

### 5. Start the Server
```sh
npm run dev
```
The server will run on `http://localhost:3000`

---
## API Endpoints

### **Authentication**

#### **Sign Up**
- **Endpoint:** `POST /api/auth/signup`
- **Description:** Register a new user.
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "username": "user123"
}
```
- **Response:**
```json
{
  "message": "User created successfully",
  "token": "jwt_token_here"
}
```

#### **Login**
- **Endpoint:** `POST /api/auth/login`
- **Description:** Login user and get JWT token.
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
- **Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

---
### **Challenges**

#### **Create a Challenge**
- **Endpoint:** `POST /api/challenges`
- **Authorization:** Bearer Token
- **Body:**
```json
{
  "title": "Reverse a String",
  "description": "Write a function to reverse a given string.",
  "difficulty": "EASY"
}
```
- **Response:**
```json
{
  "id": "challenge_id",
  "title": "Reverse a String",
  "description": "Write a function to reverse a given string.",
  "difficulty": "EASY"
}
```

#### **Get All Challenges**
- **Endpoint:** `GET /api/challenges`
- **Response:**
```json
[
  {
    "id": "challenge_id",
    "title": "Reverse a String",
    "difficulty": "EASY"
  }
]
```

#### **Get Challenge by ID**
- **Endpoint:** `GET /api/challenges/:id`
- **Response:**
```json
{
  "id": "challenge_id",
  "title": "Reverse a String",
  "description": "Write a function to reverse a given string.",
  "difficulty": "EASY"
}
```

---
### **Solutions**

#### **Submit a Solution**
- **Endpoint:** `POST /api/challenges/:id/solutions`
- **Authorization:** Bearer Token
- **Body:**
```json
{
  "code": "def reverse_string(s): return s[::-1]"
}
```
- **Response:**
```json
{
  "id": "solution_id",
  "code": "def reverse_string(s): return s[::-1]",
  "likes": 0
}
```

#### **Get Solutions for a Challenge**
- **Endpoint:** `GET /api/challenges/:id/solutions`
- **Response:**
```json
[
  {
    "id": "solution_id",
    "code": "def reverse_string(s): return s[::-1]",
    "likes": 0
  }
]
```

#### **Like a Solution**
- **Endpoint:** `POST /api/solutions/:solutionId/like`
- **Response:**
```json
{
  "id": "solution_id",
  "likes": 1
}
```

#### **Accept a Solution** (Challenge creator only)
- **Endpoint:** `POST /api/challenges/:id/solutions/:solutionId/accept`
- **Authorization:** Bearer Token
- **Response:**
```json
{
  "message": "Solution accepted"
}
```

---
### **Comments**

#### **Add a Comment**
- **Endpoint:** `POST /api/solutions/:solutionId/comments`
- **Authorization:** Bearer Token
- **Body:**
```json
{
  "content": "Great solution!"
}
```
- **Response:**
```json
{
  "id": "comment_id",
  "content": "Great solution!"
}
```

#### **Get Comments for a Solution**
- **Endpoint:** `GET /api/solutions/:solutionId/comments`
- **Response:**
```json
[
  {
    "id": "comment_id",
    "content": "Great solution!"
  }
]
```

---
### **Leaderboard**

#### **Get Leaderboard**
- **Endpoint:** `GET /api/leaderboard`
- **Response:**
```json
[
  {
    "id": "user_id",
    "username": "user123",
    "acceptedSolutions": 5
  }
]
```

---

