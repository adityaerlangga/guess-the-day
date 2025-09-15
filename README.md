# Guess The Day Game

A web-based game to practice guessing the day of the week for any given date using the Doomsday Technique.

## Features

- 🎯 5 questions per game session
- 📅 Random dates from 1500-2500
- 🧠 Doomsday Technique explanations
- 📊 Score tracking with high score persistence
- 📱 Mobile-responsive design
- ♿ Accessibility features

## Tech Stack

- React 19 + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- GitHub Pages for deployment

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

### Automatic Deployment

This project is configured with GitHub Actions for automatic deployment:

1. Push your code to the `main` branch
2. GitHub Actions will automatically build and deploy to GitHub Pages
3. Your site will be available at: `https://adityaerlangga.github.io/guess-the-day`

## Configuration

- Update the `homepage` field in `package.json` with your GitHub username
- The number of questions per game can be changed in `src/state/types.ts` (`TOTAL_QUESTIONS`)

## Game Rules

1. You will be shown a random date
2. Guess what day of the week it falls on
3. After answering, see the Doomsday Technique explanation
4. Complete 5 questions to see your final score
5. Try to beat your high score!

## Doomsday Technique

The Doomsday Technique is a method to calculate the day of the week for any date. The game includes:

- Century anchor days (1500-2500)
- Doomsday dates for each month
- Step-by-step explanations for each calculation

## License

© 2025 Aditya Erlangga Wibowo
