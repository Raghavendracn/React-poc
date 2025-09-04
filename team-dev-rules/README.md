# Team Development Rules

## Quick Setup
```bash
# Clone this repository
git clone https://github.com/your-org/team-dev-rules.git

# Copy rules to your project
cp team-dev-rules/.eslintrc.js your-project/
cp team-dev-rules/global-rules.md your-project/.windsurf/memories/
```

## Rules Overview
- **No Console Statements**: Use proper logging libraries
- **No Unused Variables**: Keep code clean and maintainable
- **ESLint Integration**: Automated enforcement

## Implementation
1. Copy `.eslintrc.js` to your project root
2. Install dependencies: `npm install --save-dev eslint`
3. Add pre-commit hooks for enforcement

## Updates
Rules are versioned and updated centrally. Pull latest changes regularly.
