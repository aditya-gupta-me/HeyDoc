# HeyDoc

HeyDoc is a cross-platform smart health consultation application designed to bridge the gap between patients and healthcare providers. It facilitates efficient appointment booking, personalized health recommendations, and secure symptom tracking, specifically addressing the challenge of doctor unavailability.

> **Note:** This project implements **Naive Bayes classification** to recommend consultations based on symptom severity and disease likelihood.

## Project Overview

Traditional healthcare scheduling is often lengthy and inefficient. HeyDoc addresses this by offering a unified platform where users can:

* **Report Symptoms:** Users can document health issues and symptoms in real-time for immediate analysis.
* **Smart Scheduling:** View doctor availability and book appointments directly.
* **Digital Records:** Maintain medical history and physical health details (BMI, Blood Pressure, etc.) for continuity of care.
* **Automated Reminders:** Receive notifications to reduce appointment no-shows.
* **Hospital Discovery:** Locate premium hospitals and clinics filtered by category (e.g., Cardiology, Dentistry).

## Tech Stack

**Client-Side**
* **Framework:** React Native (Expo)
* **Authentication:** Clerk (OAuth/Google Sign-In)
* **Styling:** StyleSheet, Custom Components
* **Font Management:** Expo-Font

**Server-Side & Database**
* **CMS:** Strapi (Headless CMS)
* **Database:** PostgreSQL
* **Media Storage:** Cloudinary
* **API:** RESTful architecture via Strapi

## Key Features

* **Secure Authentication:** Robust user registration and login utilizing Clerk with Google OAuth integration.
* **Symptom Analysis:** Leveraging Naive Bayes to assess reported symptoms and suggest appropriate medical consultations.
* **Healthcare Integration:** Designed to integrate with existing healthcare systems and Electronic Health Records (EHR).
* **User Dashboard:** comprehensive management of appointments, medical history, and profile settings.
* **Responsive UI:** Optimized for mobile devices with a focus on accessibility and user experience.

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites
* Node.js (v14 or higher)
* npm or yarn
* Expo Go app (for testing on mobile devices)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/aditya-gupta-me/HeyDoc.git
    cd HeyDoc
    ```

2.  **Install Frontend Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory. You must configure the following keys based on your Clerk and Cloudinary setup:

    ```env
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLOUDINARY_NAME=your_cloud_name
    CLOUDINARY_KEY=your_api_key
    CLOUDINARY_SECRET=your_api_secret
    ```

4.  **Run the Application**
    ```bash
    npx expo start
    ```

### Backend Setup (Strapi)

Ensure your Strapi server is running. You need to configure the following Content Types in the Strapi Content-Type Builder to match the frontend schema:

* **Doctor:** Name, Address, Years of Experience, About, Education Level, Image.
* **Hospital:** Name, Address, Email, Website, Phone, Premium (Boolean), Image.
* **Appointment:** UserName, Email, Date, Time, Note.
* **Category:** Name, Icon.
* **Slider:** Name, Image (for home screen banners).

## Future Scope

* **Live Consultation:** Integration of in-app video and audio consultation with specialists.
* **Remote Monitoring:** Connectivity with wearable devices to track vital signs remotely.
* **Insurance Integration:** Features to handle coverage checks and claims processing directly within the app.

## License

This project is open-source.
