// This is a simple script to help with cleaning and reinstalling dependencies
// when executed with: node clean-install.js

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Cleaning project...');

// Path to node_modules
const nodeModulesPath = path.join(__dirname, 'node_modules');
// Path to .next folder
const nextPath = path.join(__dirname, '.next');

// Delete node_modules if it exists
if (fs.existsSync(nodeModulesPath)) {
  console.log('Removing node_modules...');
  try {
    // On Windows, recursive deletion can sometimes fail due to file locks
    // Using a simple command instead
    execSync('rmdir /s /q node_modules', { stdio: 'inherit' });
    console.log('node_modules removed successfully');
  } catch (error) {
    console.error('Error removing node_modules:', error.message);
    // Fallback: suggest manual deletion
    console.log('Please manually delete the node_modules folder and try again.');
    process.exit(1);
  }
}

// Delete .next if it exists
if (fs.existsSync(nextPath)) {
  console.log('Removing .next folder...');
  try {
    execSync('rmdir /s /q .next', { stdio: 'inherit' });
    console.log('.next folder removed successfully');
  } catch (error) {
    console.error('Error removing .next folder:', error.message);
  }
}

// Clean npm cache
console.log('Cleaning npm cache...');
try {
  execSync('npm cache clean --force', { stdio: 'inherit' });
  console.log('npm cache cleaned successfully');
} catch (error) {
  console.error('Error cleaning npm cache:', error.message);
}

// Install dependencies
console.log('Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('Dependencies installed successfully');
} catch (error) {
  console.error('Error installing dependencies:', error.message);
  process.exit(1);
}

console.log('Clean install completed successfully!'); 