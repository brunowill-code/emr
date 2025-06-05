# Electronic Medical Record (EMR) - Fullstack Web Application

This **Electronic Medical Record (EMR) system** is a fullstack web application designed to efficiently manage **patient appointments** and medical records. Built with **Node.js, Express, Angular, CSS, and HTML**, it ensures a smooth, secure, and user-friendly experience for healthcare professionals and patients.

## Tech Stack
- **Frontend:** Developed with **Angular**, offering a responsive and intuitive UI for scheduling and managing appointments.  
- **Backend:** Powered by **Node.js + Express**, handling secure API requests and data processing.  
- **Database:** Uses **MongoDB, PostgreSQL, or MySQL** to store patient records, appointments, and doctor schedules.  
- **Styling:** Built with **CSS + HTML** to ensure a professional and clean design.  

## Key Features
**Patient Appointment Scheduling** – Users can book, reschedule, or cancel appointments easily.  
**Doctor Availability Management** – Healthcare providers can set their working hours and availability.  
**Electronic Health Records (EHR)** – Secure storage and retrieval of patient history, prescriptions, and notes.  
**Role-Based Access Control (RBAC)** – Different access levels for doctors, patients, and administrators.  
**Search & Filtering** – Easily find patients, doctors, and past consultations.  
**Secure Authentication** – JWT-based login system ensuring data privacy.  

## Ideal Use Cases
**Clinics & Hospitals** – Manage appointments and patient records seamlessly.  
**Telemedicine Platforms** – Enable remote consultations and medical history tracking.  
**Specialty Medical Practices** – Organize schedules and streamline workflows.  


## How to Run the Project Locally
Follow the steps below to clone and run the project on your local machine.

**Prerequisites**
- Node.js (v18 or higher)
- Angular CLI → Install globally using npm install -g @angular/cli
- PostgreSQL
- Git

**1. Installation Steps**
```
git clone https://github.com/brunowill-code/emr.git
cd emr
```
**2. Install backend dependencies**
```
cd backend
npm install
```
**3. Set up environment variables:**

Create a .env file inside the backend folder with the following content:

- DataBase infos
- SECRET_KEY=your_secret_key
- AES_SECRET_KEY= your_aes_secret_key

**4. Start the backend server:**
```
npm start
```
**5. Install frontend dependencies:**
```
cd ../frontend
npm install
```
**6. Run the Angular frontend**
```
ng serve
```

**7. Access the application in your browser:**
<http://localhost:4200>