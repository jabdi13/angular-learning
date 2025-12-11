#!/usr/bin/env node

/**
 * Create Exercise Script
 *
 * This script automates the creation of new Angular exercise applications.
 * It handles the entire setup process including:
 * - Generating a new Angular application
 * - Automatically numbering exercises sequentially
 * - Assigning unique ports for each exercise
 * - Updating package.json with start and build scripts
 * - Creating a README template for the exercise
 *
 * Usage:
 *   npm run create-exercise <exercise-name>
 *
 * Example:
 *   npm run create-exercise routing
 *   This creates: exercise-06-routing on port 4206
 *
 * @author Jarvis (Claude Code)
 * @version 1.0.0
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get exercise name from command line arguments
const exerciseName = process.argv[2];

// Validate input
if (!exerciseName) {
  console.error('Error: Please provide an exercise name');
  console.error('Usage: npm run create-exercise <exercise-name>');
  console.error('Example: npm run create-exercise routing');
  process.exit(1);
}

/**
 * Determine the next exercise number by scanning existing projects
 * Looks for all directories matching 'exercise-XX-*' pattern
 * and increments from the highest number found
 */
const projectsDir = path.join(__dirname, 'projects');
let nextNumber = 1;

if (fs.existsSync(projectsDir)) {
  const projects = fs.readdirSync(projectsDir)
    .filter(dir => dir.startsWith('exercise-'))
    .map(dir => {
      // Extract the number from exercise-XX-name format
      const match = dir.match(/^exercise-(\d+)-/);
      return match ? parseInt(match[1]) : 0;
    });

  if (projects.length > 0) {
    nextNumber = Math.max(...projects) + 1;
  }
}

// Generate exercise identifiers
const paddedNumber = String(nextNumber).padStart(2, '0'); // e.g., "06"
const fullExerciseName = `exercise-${paddedNumber}-${exerciseName}`; // e.g., "exercise-06-routing"
const port = 4200 + nextNumber; // e.g., 4206

console.log(`\n🚀 Creating new exercise: ${fullExerciseName}`);
console.log(`📍 Port: ${port}\n`);

try {
  /**
   * STEP 1: Generate Angular Application
   * Uses Angular CLI to create a new application in the projects/ directory
   * - No routing by default (can be added later if needed)
   * - CSS for styling (can be changed to scss/sass if preferred)
   */
  console.log('Step 1: Generating Angular application...');
  execSync(`ng generate application ${fullExerciseName} --routing=false --style=css`, {
    stdio: 'inherit' // Show Angular CLI output in real-time
  });

  /**
   * STEP 2: Update package.json with Scripts
   * Adds convenient npm scripts for starting and building the exercise
   * Format: start:exXX and build:exXX
   */
  console.log('\nStep 2: Updating package.json...');
  const packageJsonPath = path.join(__dirname, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Add new scripts with shortened names for convenience
  const shortName = `ex${paddedNumber}`; // e.g., "ex06"
  packageJson.scripts[`start:${shortName}`] = `ng serve ${fullExerciseName} --port ${port}`;
  packageJson.scripts[`build:${shortName}`] = `ng build ${fullExerciseName}`;

  // Sort scripts alphabetically to keep them organized
  const sortedScripts = {};
  Object.keys(packageJson.scripts).sort().forEach(key => {
    sortedScripts[key] = packageJson.scripts[key];
  });
  packageJson.scripts = sortedScripts;

  // Write back to package.json with proper formatting
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

  /**
   * STEP 3: Create Exercise README
   * Generates a template README with exercise information
   * Can be customized with specific learning objectives and tasks
   */
  console.log('Step 3: Creating exercise README...');
  const exerciseReadme = `# Exercise ${paddedNumber}: ${exerciseName.charAt(0).toUpperCase() + exerciseName.slice(1).replace(/-/g, ' ')}

## Description

Add your exercise description here.

## Running This Exercise

\`\`\`bash
npm run start:${shortName}
\`\`\`

Then open http://localhost:${port} in your browser.

## Learning Objectives

- Objective 1
- Objective 2
- Objective 3

## Tasks

- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

## Resources

- [Angular Documentation](https://angular.dev)
`;

  // Write README to the exercise directory
  const exerciseDir = path.join(projectsDir, fullExerciseName);
  fs.writeFileSync(path.join(exerciseDir, 'README.md'), exerciseReadme);

  /**
   * SUCCESS: Display Summary and Next Steps
   * Provides all the information needed to start working on the exercise
   */
  console.log('\n✅ Exercise created successfully!\n');
  console.log('📋 Summary:');
  console.log(`   Name: ${fullExerciseName}`);
  console.log(`   Port: ${port}`);
  console.log(`   Start command: npm run start:${shortName}`);
  console.log(`   Build command: npm run build:${shortName}`);
  console.log(`   Location: projects/${fullExerciseName}`);
  console.log('\n🎯 Next steps:');
  console.log(`   1. Edit projects/${fullExerciseName}/README.md with exercise details`);
  console.log(`   2. Run: npm run start:${shortName}`);
  console.log(`   3. Start coding!\n`);

} catch (error) {
  // Handle any errors during the creation process
  console.error('\n❌ Error creating exercise:', error.message);
  process.exit(1);
}
