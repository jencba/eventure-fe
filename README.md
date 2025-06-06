# Eventure-fe

A full-featured, responsive event management application built with React, React Router, and Axios. Users can view events, register/login, manage their own events, and view profiles. Authentication-protected routes are supported, and the UI is styled with both custom CSS and Bootstrap.


#### 🚀 Features:

Responsive design for mobile, tablet, and desktop
User registration and login
Protected routes (e.g., My Events, My Profile)
View all events and individual event details
Create and manage your own events
Token-based authentication (JWT)
React Router for client-side routing
Axios setup for API requests with automatic token handling


### 🛠️ Tech Stack:
- React
- React Router DOM
- Axios
- Bootstrap
- Custom CSS (responsive)
- Express (backend, assumed on port 5001)


### 📦 Installation:

1. **Clone the repository**

```bash
git clone https://github.com/jencba/eventure-fe.git
cd eventure-fe

```

2. **Install Dependencies**

```bash
npm install

```


2. **Start the Server**

```bash
npm start

```

## 📖 Using the Beevents App

### 👤 As a User

#### 🔐 Sign Up / Onboarding

1. Click **Login** at the top of the page.
2. In the pop-up dialog, select **User Login**.
3. Enter your email and password, then click **Sign Up**.
4. **For testing**, you can:
   - A. Sign up using your own email/password, **OR**
   - B. Use this test account:
     - Email: `hayley@example.com"`
     - Password: `yourpassword`
   


---

#### 📝 Booking an Event

1. Browse events on the **Homepage** or **Events** page.
2. Click on an event to visit its details page.
3. To book:
   - Click on event and click **sign up**


---



##### 🗂 My Events Tab

- View **upcoming active events**.
  - You can **cancel** these events.
  - Cancelled events become unbookable for users.
- View **past events** you created.



---

#### ➕ Creating a New Event

1. Go to the **My Events** from **My Profile**.
2. Click **Create New**.
3. Fill out the event creation form (all fields are required).





