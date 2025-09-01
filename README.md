# React MUI Sample Project

A sample React application demonstrating Material-UI (MUI) components with a contact management interface.

## Features

- **Modern UI**: Built with Material-UI components for a professional look
- **Contact Management**: Add, edit, and delete contacts
- **Responsive Design**: Works on desktop and mobile devices
- **Interactive Components**: Dialogs, snackbars, floating action buttons
- **Statistics Dashboard**: View contact statistics
- **Theme Support**: Custom Material-UI theme

## MUI Components Used

- AppBar & Toolbar
- Cards & Paper
- Buttons & Floating Action Button
- Text Fields & Forms
- Lists & List Items
- Dialogs & Modals
- Snackbars & Alerts
- Icons from Material Icons
- Grid System
- Typography
- Chips & Avatars

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd "C:\Users\cnragha\Documents\New folder\New folder"
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file to customize your application settings.

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and visit `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Environment Variables

The application uses environment variables for configuration. All React environment variables must be prefixed with `REACT_APP_`.

### Available Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_NAME` | React MUI Sample App | Application name displayed in header |
| `REACT_APP_VERSION` | 1.0.0 | Application version |
| `REACT_APP_DESCRIPTION` | A sample React application... | App description text |
| `REACT_APP_API_BASE_URL` | https://api.example.com | Base URL for API calls |
| `REACT_APP_API_TIMEOUT` | 5000 | API request timeout in milliseconds |
| `REACT_APP_ENABLE_ANALYTICS` | true | Enable/disable analytics logging |
| `REACT_APP_ENABLE_DEBUG_MODE` | false | Show debug information and version |
| `REACT_APP_SHOW_CONTACT_STATS` | true | Display statistics card |
| `REACT_APP_PRIMARY_COLOR` | #1976d2 | Primary theme color |
| `REACT_APP_SECONDARY_COLOR` | #dc004e | Secondary theme color |
| `REACT_APP_THEME_MODE` | light | Theme mode (light/dark) |
| `REACT_APP_MAX_CONTACTS` | 100 | Maximum number of contacts allowed |
| `REACT_APP_DEFAULT_COUNTRY_CODE` | +1 | Default country code for phone numbers |

### Environment Files

- `.env` - Main environment file (not committed to git)
- `.env.example` - Template file with example values

## Project Structure

```
src/
├── App.js          # Main application component with env config
├── index.js        # React DOM entry point
├── index.css       # Global styles
public/
├── index.html      # HTML template
├── .env            # Environment variables (create from .env.example)
├── .env.example    # Environment template
package.json        # Dependencies and scripts
```

## Usage

- Click the **+** floating button to add a new contact
- Use the **edit** icon to modify existing contacts
- Use the **delete** icon to remove contacts
- View statistics in the sidebar card

## Dependencies

- React 18.2.0
- Material-UI 5.14.20
- Emotion (for styling)
- Material Icons

## License

This project is for educational purposes.
