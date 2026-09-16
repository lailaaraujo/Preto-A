import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        denim: {
          950: '#0d1017',
          900: '#141924',
          800: '#1c2331',
          700: '#28304380',
          600: '#3b4a63',
          500: '#4d6188'
        },
        bone: '#f2ede1',
        rust: '#9c4a3a',
        brass: '#c9a24a'
      },
      fontFamily: {
        scratch: ['Anarchy', 'var(--font-scratch)', 'cursive'],
        body: ['var(--font-body)']
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")"
      }
    }
  },
  plugins: []
}

export default config
