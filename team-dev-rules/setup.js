#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up team development rules...');

const projectRoot = process.cwd();
const rulesDir = __dirname;

// Files to copy
const filesToCopy = [
  { src: '.eslintrc.js', dest: '.eslintrc.js' },
  { src: 'global-rules.md', dest: '.windsurf/memories/global_rules.md' }
];

// Create directories if they don't exist
const dirsToCreate = ['.windsurf', '.windsurf/memories'];

dirsToCreate.forEach(dir => {
  const dirPath = path.join(projectRoot, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// Copy files
filesToCopy.forEach(file => {
  const srcPath = path.join(rulesDir, file.src);
  const destPath = path.join(projectRoot, file.dest);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✅ Copied: ${file.src} → ${file.dest}`);
  }
});

console.log('\n🎉 Team rules setup complete!');
console.log('Next steps:');
console.log('1. Run: npm install');
console.log('2. Run: npm run install-hooks');
console.log('3. Start coding with enforced rules!');
