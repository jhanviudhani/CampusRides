# IITR Campus Ride

## Project Overview

IITR Campus Ride is a full-stack web application developed to simplify transportation within the IIT Roorkee campus. The platform enables students, faculty members, and staff to book E-Rickshaw rides between campus locations, while drivers (captains) can accept, manage, and complete ride requests in real time.

The application provides separate interfaces for users and captains, real-time ride updates using Socket.IO, ride tracking, captain earnings management, and a rating system for service feedback.

---

## Demo Video

https://drive.google.com/file/d/1llp2pIcs9CWc7GL6YTPxW3ZwlS6voI7G/view?usp=sharing
---

## Design Document

https://drive.google.com/file/d/1-JlodkuCDJheSleHA13kfGnYsSP_saO9/view?usp=sharing

---

## Technology Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* GSAP
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

### Configure Environment Variables

Backend `.env`

```env
PORT=3000
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
```

Frontend `.env`

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

Frontend URL:

```text
http://localhost:5173
```

Backend URL:

```text
http://localhost:3000
```

---

## Features

### User Features

* User Registration and Login
* Secure JWT Authentication
* Book Campus E-Rickshaw Rides
* Pickup and Destination Selection
* Real-Time Ride Updates
* Live Driver Assignment
* Ride Completion Notifications
* Driver Rating System

### Captain Features

* Captain Registration and Login
* Ride Request Notifications
* Accept Ride Requests
* OTP Verification Before Ride Start
* Complete Rides
* Earnings Dashboard
* Completed Ride Statistics
* Rating Tracking

### System Features

* Real-Time Communication using Socket.IO
* MongoDB Atlas Integration
* Protected Routes
* Responsive User Interface
* Fixed Fare Campus Ride System
* Ride Status Management
* Rating and Feedback System

---

## Future Enhancements

* GPS-Based Live Location Tracking
* Online Payment Integration
* Ride History Dashboard
* Multiple Vehicle Categories
* Route Optimization
* Admin Dashboard

---

## Author

**Jhanvi Udhani**

IITR Campus Ride – E-Rickshaw Transportation System
