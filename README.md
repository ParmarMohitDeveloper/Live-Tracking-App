# 📍 Real-Time Live Location Tracking App

A **real-time location tracking web application** that allows multiple users to share and track each other's live location on an interactive map.

Built using **Node.js, Express, Socket.IO, and Leaflet**, this application enables users to see live positions of connected users, calculate routes between them, and navigate to their location using **Google Maps**.

---

## 🚀 Features

* 📡 **Real-Time Location Tracking**

  * Users can share their live GPS location.
  * Location updates automatically using `watchPosition()`.

* 👥 **Multi-User Tracking**

  * Multiple users can join and see each other on the map.

* 🗺️ **Interactive Map**

  * Powered by **Leaflet.js** and **OpenStreetMap**.

* 📍 **My Location Button**

  * Quickly center the map on your current location (similar to Google Maps).

* 🚗 **Route & Distance Calculation**

  * Click on any user marker to:
  * View route between you and the selected user
  * See **distance and ETA**

* 🧭 **Open in Google Maps**

  * Navigate directly to a user’s location in **Google Maps navigation**.

* 🔄 **Automatic Location Updates**

  * GPS location updates in real time with high accuracy.

* ❌ **User Disconnect Handling**

  * When a user leaves, their marker automatically disappears.

---

## 🛠️ Tech Stack

**Frontend**

* HTML
* CSS
* JavaScript
* Leaflet.js

**Backend**

* Node.js
* Express.js
* Socket.IO

**Map & Routing Services**

* OpenStreetMap
* OSRM Routing API
* Google Maps Navigation

---

## 📂 Project Structure

```
Live-Tracking-App
│
├── public
│   ├── css
│   │   └── style.css
│   │
│   └── js
│       └── script.js
│
├── views
│   └── index.ejs
│
├── server.js
└── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/ParmarMohitDeveloper/Live-Tracking-App.git
```

### 2️⃣ Navigate to the Project

```
cd Live-Tracking-App
```

### 3️⃣ Install Dependencies

```
npm install
```

### 4️⃣ Start the Server

```
node server.js
```

### 5️⃣ Open in Browser

```
http://localhost:(your port)
```

---

## 🧑‍💻 How It Works

1. A user opens the website and enters their name.
2. The browser requests **GPS permission**.
3. The user's location is tracked using **Geolocation API**.
4. Location is sent to the server via **Socket.IO**.
5. The server broadcasts location updates to all connected users.
6. Each user appears on the **interactive map with a marker**.
7. Clicking a marker:

   * Calculates route
   * Displays **distance & ETA**
   * Option to **open navigation in Google Maps**

---

## 🌍 Use Cases

* Friend & family location sharing
* Fleet vehicle tracking
* Delivery tracking systems
* Real-time event tracking
* Ride-sharing applications

---

## 📸 Demo

*(Add screenshots or GIF here for better presentation)*

Example:

```
<img width="561" height="247" alt="image" src="https://github.com/user-attachments/assets/045a351e-e560-42a2-bac2-69f1598d3e48" />


<img width="1751" height="950" alt="image" src="https://github.com/user-attachments/assets/9c11499f-d18f-4820-8869-3f9758da4b35" />

```

---

## 🔮 Future Improvements

* 📱 Mobile responsive UI
* 🚗 Smooth marker movement animation
* 👤 User avatars instead of markers
* 🔗 Shareable live tracking links
* 📡 Online/offline user indicator
* 📍 Geofencing alerts

---

## 👨‍💻 Author

**Mohit Parmar**

Full-Stack Developer | MERN Stack Specialist
MongoDB • Express • React • Node.js

GitHub:
https://github.com/ParmarMohitDeveloper

Live Project link :
https://live-tracking-app-backend.onrender.com/

LinkedIn:
www.linkedin.com/in/mohit-parmar-0b7514271

---

## ⭐ Support

If you found this project useful, consider **starring the repository ⭐** to support the project.
