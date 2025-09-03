---
description: Remove Unused Variables
---

# Remove Unused Variables Workflow

This workflow helps identify and remove unused variables, imports, and function parameters according to our global development rules.

## Steps

1. **Run ESLint to identify unused variables**
```bash
npx eslint . --ext .js,.jsx,.ts,.tsx
```

2. **Filter for unused variable warnings**
```bash
npx eslint . --ext .js,.jsx,.ts,.tsx | grep "no-unused-vars"
```

3. **Fix unused variables automatically (where possible)**
// turbo
```bash
npx eslint . --ext .js,.jsx,.ts,.tsx --fix
```

4. **Manual review for complex cases**
   - Review remaining unused variables that couldn't be auto-fixed
   - Remove unused imports at the top of files
   - Remove unused function parameters (consider using underscore prefix if needed for API compatibility)
   - Remove unused local variables and constants

5. **Verify fixes**
```bash
npx eslint . --ext .js,.jsx,.ts,.tsx
```

6. **Run tests to ensure nothing broke**
```bash
npm test
```

## Rules Applied
- `no-unused-vars`: All declared variables must be used
- Clean up unused imports, variables, and function parameters
- Prevents code bloat and improves readability