/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        difficulty: {
          easy: '#10b981',
          medium: '#f59e0b',
          hard: '#ef4444',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
