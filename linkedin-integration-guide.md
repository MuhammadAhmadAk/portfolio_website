# LinkedIn API Integration Guide

This guide explains how to set up the LinkedIn API integration in your portfolio website.

## Structure Overview

The LinkedIn integration consists of three main components:

1. **HTML Structure**: The container for LinkedIn data in the About section
2. **Client-side JavaScript**: Fetches and displays LinkedIn data (in `script.js`)
3. **Server-side Proxy**: Securely handles API requests (in `api/linkedin-profile.php`)

## Step 1: Get LinkedIn API Credentials

To use the LinkedIn API, you need to create a LinkedIn Developer app and get credentials:

1. Go to the [LinkedIn Developer Portal](https://www.linkedin.com/developers/apps)
2. Click "Create App" and fill out the required information
3. Under the "Products" tab, request access to:
   - Sign In with LinkedIn
   - Share on LinkedIn
   - Marketing Developer Platform
4. Navigate to the "Auth" tab and set up the OAuth 2.0 settings
5. Generate an Access Token with the necessary scopes:
   - `r_liteprofile`
   - `r_emailaddress`
   - `r_basicprofile`

## Step 2: Update Server-Side Proxy

The server-side proxy keeps your API credentials secure. Update the credentials in `api/linkedin-profile.php`:

```php
// LinkedIn API credentials - Replace with your actual credentials
$apiCredentials = [
    'client_id' => 'YOUR_ACTUAL_CLIENT_ID',
    'client_secret' => 'YOUR_ACTUAL_CLIENT_SECRET', 
    'access_token' => 'YOUR_ACTUAL_ACCESS_TOKEN'
];
```

## Step 3: Update Client-Side Configuration (Optional)

Optionally, you can also update the client-side configuration in `script.js`:

```javascript
const LINKEDIN_API = {
  CLIENT_ID: "YOUR_ACTUAL_CLIENT_ID", 
  CLIENT_SECRET: "YOUR_ACTUAL_CLIENT_SECRET", 
  ACCESS_TOKEN: "YOUR_ACTUAL_ACCESS_TOKEN",
  API_VERSION: "202401",
  API_URL: "https://api.linkedin.com/v2/me"
};
```

However, the recommended approach is to only use the server-side proxy for security reasons.

## Step 4: Test the Integration

1. Upload the updated files to your server
2. Make sure the `api` directory has proper permissions
3. Visit your website and check that the LinkedIn data appears in the About section

## Troubleshooting

- **No Data Appears**: Check the browser console for errors. Make sure your access token is valid.
- **Access Token Expired**: LinkedIn access tokens expire. Generate a new one in the LinkedIn Developer Portal.
- **CORS Errors**: If you're testing locally, you might encounter CORS issues. Consider using a local development server.

## Security Considerations

- Never expose your API credentials in client-side code
- Keep your access token secure and rotate it periodically
- In production, restrict the server proxy's CORS headers to your domain only
- Implement rate limiting to prevent abuse

## Data Format

The LinkedIn data returned by the API will be in this format:

```json
{
  "firstName": "Muhammad",
  "lastName": "Ahmad",
  "headline": "Senior Flutter Developer at Codeminers",
  "currentPosition": {
    "title": "Senior Flutter Developer",
    "company": "Codeminers",
    "startDate": "March 2022",
    "endDate": "Present"
  },
  "education": [
    {
      "school": "University Of Agriculture, Faisalabad",
      "degree": "BS Computer Science",
      "field": "Computer Science",
      "startDate": "2016",
      "endDate": "2020"
    }
  ],
  "skills": [
    {"name": "Flutter", "endorsements": 28},
    {"name": "Dart", "endorsements": 25},
    {"name": "React Native", "endorsements": 22},
    {"name": "JavaScript", "endorsements": 19},
    {"name": "Mobile App Development", "endorsements": 21}
  ],
  "connections": 500
}
```

## Further Customization

You can modify the HTML structure and CSS styling to customize how the LinkedIn data is displayed. Check the `displayLinkedInProfile` function in `script.js` to adjust how the data is rendered. 