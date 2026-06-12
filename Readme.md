# IITR Campus Ride

## Project Overview

IITR Campus Ride is a full-stack web application developed to simplify transportation within the IIT Roorkee campus. The system allows students and staff to book E-Rickshaw rides between campus locations, while drivers (captains) can accept, manage, and complete ride requests in real time.

The application provides separate interfaces for users and captains, live ride status updates using WebSockets, ride tracking, fare management, ride history, captain earnings tracking, and a rating system for service feedback.

---

## Technology Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* GSAP Animations
* Socket.IO Client

### Backend

* Node.js
* Express.js
* Socket.IO

### Database

* MongoDB Atlas
* Mongoose ODM

### Authentication

* JSON Web Tokens (JWT)

---

## Setup Instructions

### Clone Repository

```bash
git clone https://github.com/jhanviudhani/CampusRides.git
cd CampusRides
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=3000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
```

Create a `.env` file inside the frontend directory:

```env
VITE_BASE_URL=http://localhost:3000/api
```

---

## Running the Application

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:3000
```

---

## Features

### User Features

* User Registration and Login
* Secure JWT Authentication
* Book E-Rickshaw Rides
* Select Pickup and Destination Locations
* Real-Time Ride Updates
* Live Driver Assignment
* Ride Tracking
* Ride Completion Notifications
* Driver Rating System

### Captain Features

* Captain Registration and Login
* Ride Request Notifications
* Accept or Reject Ride Requests
* OTP Verification Before Ride Start
* Start and Complete Rides
* Earnings Dashboard
* Ride Statistics
* Average Rating Tracking

### System Features

* Real-Time Communication using Socket.IO
* MongoDB Cloud Database Integration
* Protected Routes
* Responsive User Interface
* Automated Fare Calculation
* Ride Status Management
* Rating and Feedback System

---

## Future Enhancements

* GPS Based Live Location Tracking
* Online Payments
* Ride History Dashboard
* Multiple Vehicle Types
* Campus Route Optimization
* Admin Dashboard

---

## Author

Jhanvi Udhani

IITR Campus Ride Project
