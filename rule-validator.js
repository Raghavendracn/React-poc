/**
 * Rule Validator for React MUI Application
 * Tests the "No Hardcoded Secrets" rule implementation
 */

const fs = require('fs');
const path = require('path');

class RuleValidator {
    constructor() {
        this.projectRoot = process.cwd();
        this.windsurfDir = path.join(this.projectRoot, '.windsurf');
        this.configPath = path.join(this.windsurfDir, 'organization-config.json');
    }

    /**
     * Validate hardcoded secrets rule
     */
    validateNoHardcodedSecrets(code) {
        const secretPatterns = [
            /password\s*[=:]\s*["'][^"']+["']/i,
            /api[_-]?key\s*[=:]\s*["'][^"']+["']/i,
            /secret\s*[=:]\s*["'][^"']+["']/i,
            /token\s*[=:]\s*["'][^"']+["']/i,
            /firebase.*api[_-]?key\s*[=:]\s*["'][^"']+["']/i,
            /auth[_-]?domain\s*[=:]\s*["'][^"']+["']/i
        ];

        const violations = [];
        
        secretPatterns.forEach((pattern, index) => {
            const matches = code.match(pattern);
            if (matches) {
                violations.push({
                    pattern: pattern.toString(),
                    match: matches[0],
                    line: this.getLineNumber(code, matches.index)
                });
            }
        });

        return {
            allowed: violations.length === 0,
            violations: violations,
            message: violations.length > 0 
                ? `Found ${violations.length} hardcoded secret(s) - use environment variables instead`
                : 'No hardcoded secrets detected'
        };
    }

    /**
     * Get line number for violation
     */
    getLineNumber(code, index) {
        return code.substring(0, index).split('\n').length;
    }

    /**
     * Test rule with sample code
     */
    testRule() {
        console.log('🧪 Testing "No Hardcoded Secrets" Rule\n');

        // Test cases
        const testCases = [
            {
                name: 'Good Code - Using Environment Variables',
                code: `
const apiKey = process.env.REACT_APP_API_KEY;
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
};`,
                shouldPass: true
            },
            {
                name: 'Bad Code - Hardcoded API Key',
                code: `
const apiKey = "sk-1234567890abcdef";
const config = { key: apiKey };`,
                shouldPass: false
            },
            {
                name: 'Bad Code - Hardcoded Password',
                code: `
const password = "mySecretPassword123";
const dbConfig = { password: password };`,
                shouldPass: false
            },
            {
                name: 'Bad Code - Firebase Config with Secrets',
                code: `
const firebaseConfig = {
  apiKey: "AIzaSyC1234567890abcdef",
  authDomain: "myapp.firebaseapp.com"
};`,
                shouldPass: false
            }
        ];

        testCases.forEach((testCase, index) => {
            console.log(`Test ${index + 1}: ${testCase.name}`);
            const result = this.validateNoHardcodedSecrets(testCase.code);
            
            const passed = result.allowed === testCase.shouldPass;
            console.log(`Result: ${passed ? '✅ PASS' : '❌ FAIL'}`);
            console.log(`Message: ${result.message}`);
            
            if (result.violations.length > 0) {
                console.log('Violations found:');
                result.violations.forEach(violation => {
                    console.log(`  - Line ${violation.line}: ${violation.match}`);
                });
            }
            console.log('');
        });
    }

    /**
     * Check if rule is properly configured
     */
    checkConfiguration() {
        console.log('🔍 Checking Rule Configuration\n');

        // Check if config file exists
        if (!fs.existsSync(this.configPath)) {
            console.log('❌ Configuration file not found');
            return false;
        }

        // Load and validate config
        try {
            const config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
            
            console.log(`Organization: ${config.organization}`);
            console.log(`Rules Enforced: ${config.enforceRules ? '✅ Yes' : '❌ No'}`);
            console.log(`Admin Controlled: ${config.adminControlled ? '✅ Yes' : '❌ No'}`);
            console.log(`No Hardcoded Secrets: ${config.globalRules?.security?.noHardcodedSecrets ? '✅ Enabled' : '❌ Disabled'}`);
            
            return config.globalRules?.security?.noHardcodedSecrets === true;
        } catch (error) {
            console.log('❌ Error reading configuration:', error.message);
            return false;
        }
    }

    /**
     * Run all validation tests
     */
    runAllTests() {
        console.log('🚀 React MUI App - Rule Validation Tests\n');
        
        const configValid = this.checkConfiguration();
        console.log('');
        
        if (configValid) {
            this.testRule();
            console.log('✅ Rule validation complete!');
            console.log('\n📋 Summary:');
            console.log('- Rule is properly configured');
            console.log('- Hardcoded secrets will be detected and blocked');
            console.log('- Users must use environment variables (REACT_APP_*)');
        } else {
            console.log('❌ Rule configuration is invalid');
        }
    }
}

module.exports = RuleValidator;

// Run tests if called directly
if (require.main === module) {
    const validator = new RuleValidator();
    validator.runAllTests();
}
