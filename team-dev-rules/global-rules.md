# Global Development Rules

## Code Quality Rules

### 1. No Console Statements
- **Rule**: `no-console` - Prohibit console statements in production code
- Use proper logging libraries instead of console methods
- Remove debug statements before committing

### 2. Remove Unused Variables
- **Rule**: `no-unused-vars` - All declared variables must be used
- Clean up unused imports, variables, and function parameters
- Prevents code bloat and improves readability

## ESLint Configuration
```javascript
{
  "no-console": "error",
  "no-unused-vars": "error",
  "no-undef": "error",
  "no-debugger": "error"
}
```

## Workflow Integration
- ESLint runs on save and flags violations
- Pre-commit hooks prevent commits with rule violations
- CI/CD pipeline enforces rules before merging
