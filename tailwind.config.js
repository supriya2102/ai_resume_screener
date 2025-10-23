/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f0ff',
        'neon-purple': '#b026ff',
        'neon-green': '#39ff14',
        'neon-pink': '#ff10f0',
        'dark-bg': '#0a0a0f',
        'dark-card': '#1a1a2e',
        'dark-border': '#2a2a3e',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': {
            'box-shadow': '0 0 5px #00f0ff, 0 0 10px #00f0ff, 0 0 15px #00f0ff',
          },
          '100%': {
            'box-shadow': '0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 30px #00f0ff, 0 0 40px #00f0ff',
          },
        },
      },
    },
  },
  plugins: [],
};
