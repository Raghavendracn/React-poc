# Global Rules - ENTERPRISE ADMIN CONTROLLED
# ⚠️ WARNING: These rules are set by Windsurf Enterprise Admins and CANNOT be modified by users

## Security Rules

### No Hardcoded Secrets ⚠️
**Rule:** Never put passwords, API keys, or secrets directly in your React code.

**Why:** Hardcoded secrets in React apps are visible to anyone who views the source code or inspects the bundle. This is a major security risk.

**Instead, use:**
- Environment variables: `process.env.REACT_APP_API_KEY`
- Configuration files (not in git): `config.json`
- Secret management services: Azure Key Vault, AWS Secrets Manager

**Examples of what NOT to do:**
```javascript
// ❌ BAD - Hardcoded secrets (visible in browser)
const apiKey = "sk-1234567890abcdef";
const dbPassword = "mySecretPassword123";
const firebaseConfig = {
  apiKey: "AIzaSyC1234567890abcdef",
  authDomain: "myapp.firebaseapp.com"
};
```

**Examples of what TO do:**
```javascript
// ✅ GOOD - Use environment variables
const apiKey = process.env.REACT_APP_API_KEY;
const dbPassword = process.env.REACT_APP_DB_PASSWORD;
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
};
```

**For React Apps:**
- All environment variables must start with `REACT_APP_`
- Set them in `.env` file (already configured in this project)
- Access via `process.env.REACT_APP_VARIABLE_NAME`

**This rule is enforced automatically by Windsurf Enterprise.**
