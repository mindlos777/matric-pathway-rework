<div align="center">

# 🎓 Tertiary SA

### Your pathway from matric to tertiary education in South Africa

**Discover courses • Match with institutions • Find bursaries • Track opportunities • Build your student profile**

[![React Native](https://img.shields.io/badge/React_Native-Expo-61DAFB?logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-Mobile_App-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Backend-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Platform](https://img.shields.io/badge/Platform-South_Africa-4F46E5)](#)

</div>

---

## About Tertiary SA

**Tertiary SA** is a mobile platform designed to help South African learners move from matric into tertiary education with less confusion.

Instead of searching across multiple websites for courses, institutions, bursaries, application information and student opportunities, Tertiary SA brings the important parts of that journey into one place.

Students can build an academic profile, enter their subjects and marks, calculate their APS, discover suitable courses and institutions, explore bursaries, follow application opportunities and access tools that support their next step after school.

> **One profile. More opportunities. A clearer path after matric.**

---

## ✨ Core Features

### 👤 Student Profile & Onboarding

Tertiary SA starts by learning enough about the student to make the experience more relevant.

- Guided onboarding flow
- Student name and personal information
- Province selection
- Interests / hobbies selection
- Editable profile
- Subject and mark management
- Up to 10 subjects
- Mathematics and Mathematical Literacy handled separately
- Automatic APS calculation
- Profile completion tracking
- Persistent user data

### 🎯 APS-Based Matching

Students can use their academic results to discover opportunities that fit their current profile.

- Automatic APS score calculation
- Filter courses using the student's APS
- Compare course minimum APS requirements
- Match subject requirements against the student's subjects
- Identify institutions offering a selected course
- APS match alerts for relevant opportunities

### 🎓 Courses

The Courses section helps students explore study options beyond simply knowing a course name.

- Search courses
- Filter by field / sector
- Filter by demand level
- Filter by duration
- APS-based filtering
- Course images
- Minimum APS requirements
- Required subjects and minimum marks
- Course duration
- Career / industry demand indicators
- Detailed course information
- Institutions offering each course
- Planned price-range filtering

### 🏫 Universities & Institutions

Students can explore South African tertiary institutions and determine which options fit their academic profile.

- Public universities
- Private institutions
- TVET colleges
- Search and filtering
- Institution type filters
- Application status filters
- APS requirement filtering
- Open / Closing Soon / Closed application states
- Application closing dates
- Institution requirements
- Direct links to official application pages
- Detailed institution information
- Accommodation access
- Planned map/location integration in institution details

### 💰 Bursaries & Funding

Funding opportunities are integrated into the same student journey.

- Browse available bursaries
- Search bursaries
- Public, private and TVET-related funding
- Open / Closing Soon / Closed statuses
- Opening and closing dates
- Eligibility requirements
- Fields of study covered
- Funding information
- Contact details
- Direct application links
- Bursary detail views

### 🏠 Student Accommodation

Tertiary SA includes accommodation discovery connected to institutions.

- Institution-specific accommodation listings
- Accommodation information cards
- Empty-state handling when no accommodation is available
- Planned map support for accommodation locations

### 🔔 Notifications & Opportunity Alerts

The notification system is designed to help students avoid missing important opportunities.

- Application deadline reminders
- Bursary deadline reminders
- Profile completion reminders
- Missing subject reminders
- APS match alerts
- In-app notifications
- Push notification architecture using Expo Notifications

> Android remote push notifications require an Expo development build rather than relying only on Expo Go on newer Expo SDK versions.

### 📄 Student & Application Tools

The application architecture also includes supporting tools intended to make applications easier.

- CV templates
- CV editor
- Email templates
- Email editor
- Institution comparison screen
- WebView support for external application pages
- Opportunity and application navigation

---

## 🧠 How Matching Works

Tertiary SA uses the student's saved academic profile as the foundation for personalised discovery.

```text
Student Profile
      ↓
Subjects + Marks
      ↓
APS Calculation
      ↓
Course Requirements
      ↓
Institution Requirements
      ↓
Relevant Study Opportunities
      ↓
Bursaries + Applications + Alerts
```

The goal is not simply to show every available option, but to make it easier for a learner to understand **which opportunities are relevant to them and why**.

---

## 🛠️ Technology Stack

| Area | Technology |
|---|---|
| Mobile | React Native |
| Framework | Expo |
| Navigation | React Navigation |
| Authentication | Firebase Authentication |
| Database | Cloud Firestore |
| Local Storage | AsyncStorage |
| Notifications | Expo Notifications |
| External Pages | React Native WebView |
| Language | JavaScript |
| Version Control | Git & GitHub |

---

## ☁️ Data Architecture

The project is moving from static local datasets toward a Firestore-backed architecture.

Primary collections include:

```text
universities_db
courses_db
bursaries_db
```

For selected data, the application follows an offline-friendly strategy:

```text
Firestore
   ↓
AsyncStorage Cache
   ↓
Local Fallback Data
```

This allows the app to progressively support current cloud data while retaining resilience when connectivity is limited.

---

## 🔐 Authentication & User Data

Firebase Authentication handles user accounts, while Firestore stores application data and student profile information.

The authentication flow supports:

```text
Launch App
    ↓
Authentication / User State
    ↓
Onboarding (new users)
    ↓
Profile Setup
    ↓
Main Application
```

Profile information can then be reused across courses, universities, bursaries, matching and notifications.

---

## 📱 Main Navigation

After onboarding, the primary mobile experience is organised around five main areas:

```text
Dashboard
Courses
Universities
Bursaries
Profile
```

Additional screens include notifications, settings, accommodation, comparison tools, CV tools, email tools and external application pages.

---

## 🚀 Getting Started

### Prerequisites

Install the following before running the project:

- Node.js
- npm
- Git
- VS Code (recommended)
- Expo Go for basic testing, or an Expo development build for native functionality that Expo Go does not support

### Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
```

### Install dependencies

```bash
npm install
```

### Environment variables

Create your local environment file and add the Firebase configuration required by the project.

Example:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Do **not** commit private environment files to the repository.

Expo environment variables are accessed directly, for example:

```js
process.env.EXPO_PUBLIC_FIREBASE_API_KEY
```

### Start the app

```bash
npx expo start
```

If Metro behaves unexpectedly after dependency or environment changes:

```bash
npx expo start -c
```

---

## 🤝 Contributing

Tertiary SA is being developed collaboratively. Contributors should work on separate branches instead of making unfinished changes directly on `main`.

### Get the latest code

```bash
git checkout main
git pull origin main
```

### Create a feature branch

```bash
git checkout -b feature/your-feature-name
```

### Commit your work

```bash
git add .
git commit -m "Add your feature description"
```

### Push the branch

```bash
git push -u origin feature/your-feature-name
```

Then create a **Pull Request** on GitHub so the changes can be reviewed before being merged into `main`.

To work with another contributor's branch:

```bash
git fetch origin
git branch -a
git switch branch-name
git pull
```

---

## 🗺️ Development Roadmap

Tertiary SA is still evolving. Current and planned improvements include stronger Firestore integration, offline caching across all opportunity datasets, richer course fee filtering, institution and accommodation maps, production-ready push notifications, improved matching logic, application tracking, and further refinement of the CV/application tools.

---

## 🇿🇦 Why Tertiary SA?

For many matriculants, the difficult part is not only deciding **what to study**. They also need to understand:

- whether their marks qualify them,
- which institutions offer the course,
- when applications close,
- where funding may be available,
- what requirements they are missing, and
- what they should do next.

Tertiary SA is being built around that complete journey.

---

<div align="center">

### Tertiary SA

**From matric results to real opportunities.**

Built for the South African student journey 🇿🇦

</div>
