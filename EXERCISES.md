# Angular Learning Exercises

This repository contains multiple independent Angular exercises to help you learn Angular concepts step by step.

## Project Structure

```
angular-learning/
├── projects/
│   ├── exercise-01-basics/
│   ├── exercise-02-components/
│   ├── exercise-03-data-binding/
│   ├── exercise-04-directives/
│   └── exercise-05-services/
├── src/                          # Main application (optional)
├── create-exercise.js            # Script to generate new exercises
└── package.json
```

## Running Exercises

Each exercise is a standalone Angular application that can be run independently on its own port.

### Available Exercises

| Exercise | Topic | Command | URL |
|----------|-------|---------|-----|
| Exercise 01 | Basics | `npm run start:ex01` | http://localhost:4201 |
| Exercise 02 | Components | `npm run start:ex02` | http://localhost:4202 |
| Exercise 03 | Data Binding | `npm run start:ex03` | http://localhost:4203 |
| Exercise 04 | Directives | `npm run start:ex04` | http://localhost:4204 |
| Exercise 05 | Services | `npm run start:ex05` | http://localhost:4205 |

### Quick Start

1. **Install dependencies** (if you haven't already):
   ```bash
   npm install
   ```

2. **Run an exercise**:
   ```bash
   npm run start:ex01
   ```

3. **Open your browser** and navigate to the corresponding URL (e.g., http://localhost:4201)

### Building Exercises

To build a specific exercise for production:

```bash
npm run build:ex01  # Build exercise 01
npm run build:ex02  # Build exercise 02
# ... and so on
```

## Creating New Exercises

We've made it super easy to create new exercises! Just use the automated script:

```bash
npm run create-exercise <exercise-name>
```

### Example

```bash
npm run create-exercise routing
```

This will:
1. ✅ Generate a new Angular application (`exercise-06-routing`)
2. ✅ Automatically assign the next available port (4206)
3. ✅ Add `start:ex06` and `build:ex06` scripts to `package.json`
4. ✅ Create a README.md file in the exercise directory
5. ✅ Display a summary with all the information you need

### What You Get

After running the command, you'll have:
- A new project in `projects/exercise-XX-your-name/`
- Start script: `npm run start:exXX`
- Build script: `npm run build:exXX`
- A README template to fill in exercise details

### Manual Creation (Advanced)

If you prefer to create exercises manually:

1. Generate the application:
   ```bash
   ng generate application exercise-06-your-topic --routing=false --style=css
   ```

2. Add scripts to `package.json`:
   ```json
   "start:ex06": "ng serve exercise-06-your-topic --port 4206",
   "build:ex06": "ng build exercise-06-your-topic"
   ```

## Exercise Topics

### Exercise 01: Basics
- Angular basics
- Project structure
- Templates and interpolation

### Exercise 02: Components
- Creating components
- Component communication
- Input/Output decorators

### Exercise 03: Data Binding
- Property binding
- Event binding
- Two-way binding with ngModel

### Exercise 04: Directives
- Structural directives (ngIf, ngFor)
- Attribute directives
- Creating custom directives

### Exercise 05: Services
- Creating services
- Dependency injection
- HTTP client basics

## Tips

- 🚀 Each exercise runs on a different port, so you can run multiple exercises simultaneously
- 📦 All exercises share the same `node_modules` and dependencies
- 🎯 The main `src/` folder can be used for your primary application or ignored
- ⚙️ Each exercise has its own configuration in `angular.json`
- 🔧 Use the automated script to save time and avoid manual configuration

## Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI Documentation](https://angular.dev/cli)
