# Prequalification Form with Firebase Backend

This project includes a multi-step prequalification form that captures lead information and stores it in Firebase Realtime Database.

## Environment Variables Setup

For security reasons, this project uses environment variables to store sensitive Firebase configuration.

1. Create a `.env` file in the root directory (you can copy from `.env.example`)
2. Fill in your Firebase project credentials in this file:

```
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
REACT_APP_FIREBASE_DATABASE_URL=your_database_url_here
REACT_APP_FIREBASE_PROJECT_ID=your_project_id_here
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
REACT_APP_FIREBASE_APP_ID=your_app_id_here
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

**Note:** Never commit your `.env` file to version control. It's already added to `.gitignore`.

## Features

- Multi-step form with input validation
- Firebase Realtime Database integration for storing submissions
- Animation transitions between form steps
- Thank You page with booking calendar integration
- Secure document upload integration
- Admin data viewer page to view submissions

## Form Fields Captured

The prequalification form captures the following information:

- Full Name
- Email
- Phone
- ZIP Code
- First-Time Buyer status (Y/N)
- Credit Score Range
- Household Income
- Loan Type
- Timeline
- Date/Time stamp of submission

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Environment Variables

Follow the instructions in the "Environment Variables Setup" section above.

### 3. Run the Application

```bash
npm start
```

### 4. Build for Production

```bash
npm run build
```

## Viewing Form Submissions

You can view form submissions in two ways:

1. **Firebase Console:**

   - Go to your Firebase project dashboard
   - Navigate to Realtime Database
   - Look for the "leads" node which contains all submissions

2. **Built-in Data Viewer:**
   - Navigate to `/admin/data` in your application
   - This displays a formatted table of all form submissions

## Thank You Page

The Thank You page includes:

- Confirmation animation
- "Book a Quick Preapproval Chat" button - Links to Outlook Bookings calendar
- "Securely Upload Paystubs or W-2s" button - Links to File Valet for document uploads
