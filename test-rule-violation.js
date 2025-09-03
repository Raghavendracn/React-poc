/**
 * Test: What happens when a non-admin user tries to violate rules
 */

// ❌ This would be BLOCKED by Windsurf Enterprise
const apiKey = "sk-1234567890abcdef";
const password = "mySecretPassword123";

// ❌ This would also be BLOCKED
const firebaseConfig = {
  apiKey: "AIzaSyC1234567890abcdef",
  authDomain: "myapp.firebaseapp.com"
};

console.log("This code violates the 'No Hardcoded Secrets' rule");
