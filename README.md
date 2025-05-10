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
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
REACT_APP_UPLOAD_DOCS_LINK=your_upload_docs_link_here
REACT_APP_BOOKING_LINK=your_booking_link_here
```

**Note:** Never commit your `.env` file to version control. It's already added to `.gitignore`.

## Features

- Multi-step form with input validation
- Firebase Realtime Database integration for storing submissions
- Animation transitions between form steps
- Thank You page with booking calendar integration
- Secure document upload integration
- Admin data viewer page to view submissions
- OriginatorOS™ AI Assistant powered by GPT-3.5-Turbo

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

## AI Assistant Feature

The application includes an AI Assistant powered by OpenAI's GPT-3.5-Turbo model:

- Floating chat bubble in the bottom right corner of all pages
- Answers questions about loan types (FHA, VA, conventional, etc.)
- Guides users through the pre-qualification process
- Provides links to upload documents or book a call
- Stores chat history in local storage
- Quick reply suggestions for common questions
- Built-in fallback responses when API is unavailable

### AI Assistant Setup

1. Make sure your `.env` file includes your OpenAI API key and important links:

```
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
REACT_APP_UPLOAD_DOCS_LINK=your_upload_docs_link_here
REACT_APP_BOOKING_LINK=your_booking_link_here
```

2. The AI Assistant is automatically integrated into all pages

3. The assistant uses a custom system prompt to ensure it provides helpful, accurate information about mortgage lending and the application process

4. For security, in production you should consider using a proxy server to handle OpenAI API calls instead of directly calling from the client-side

### Development and Troubleshooting

The AI Assistant includes a development mode with console-based debugging tools:

1. The `DEV_MODE` constant in `AIAssistant.jsx` controls development features:

   - When `true`, detailed debug logs are output to the console
   - The first 10 characters of your API key are logged (to confirm it's loaded)
   - Response source tracking happens internally but isn't shown to users

2. Fallback Mechanism:

   - If the OpenAI API is unavailable, the assistant will fall back to pre-defined responses
   - When the API key is missing, it will use simulated AI responses
   - This ensures users always get helpful answers, even if the API is down
   - Users will not see any indication that fallback responses are being used

3. Console Debugging (Developer Tools):

   - Detailed, color-coded logs show the source of each response
   - API errors are logged to the console with detailed information
   - Use `window.checkAIResponseSources()` in the browser console to see stats about response sources
   - All debugging information is hidden from users

4. Admin Controls (Optional):

   - Developer controls can be enabled by setting `REACT_APP_SHOW_ADMIN_CONTROLS=true` in your .env file
   - This adds toggle buttons to switch between GPT and fallback responses
   - Includes a reset button to clear chat history
   - These controls are hidden by default even in development mode

5. To disable all debugging:
   - Set `DEV_MODE = false` in the AIAssistant component
   - This will disable all console logging and developer functions

### Troubleshooting OpenAI Connection Issues

If you see the error "I'm having trouble connecting right now" or your API calls are failing:

1. **Check your API key**:

   - Ensure your OpenAI API key is correctly set in the `.env` file
   - Make sure it's a valid API key with enough credits/quota
   - For project API keys (starting with `sk-proj-`), you may need to adjust permissions

2. **Browser CORS issues**:

   - OpenAI's API has CORS restrictions for direct browser calls
   - You may need to use a proxy server or backend API route
   - In development, you can use the built-in fallback responses

3. **Using the fallback system**:

   - If you can't resolve API issues, you can leave `DEV_MODE` enabled
   - The fallback system will ensure users still get intelligent responses
   - Set the API key to an empty string to force using simulated responses
   - For persistent issues, set `FORCE_FALLBACK = true` in AIAssistant.jsx to always use local responses

4. **Model compatibility**:

   - By default, the assistant uses the "gpt-3.5-turbo" model which is widely available
   - If you have access to GPT-4, you can change the model in AIAssistant.jsx
   - The fallback system automatically handles model-related errors

5. **Testing OpenAI connectivity**:
   - You can test your API key with this cURL command:
     ```
     curl https://api.openai.com/v1/chat/completions \
       -H "Content-Type: application/json" \
       -H "Authorization: Bearer YOUR_API_KEY" \
       -d '{"model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": "Hello"}]}'
     ```

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
