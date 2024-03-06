/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    // './node_modules/flowbite-react/**/*.js',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        'flush-mahogany': {
          '50': 'hsl(0, 71%, 97%)',
          '100': 'hsl(0, 80%, 94%)',
          '200': 'hsl(0, 81%, 89%)',
          '300': 'hsl(0, 78%, 82%)',
          '400': 'hsl(0, 76%, 71%)',
          '500': 'hsl(0, 70%, 60%)',
          '600': 'hsl(0, 60%, 49%)',
          '700': 'hsl(0, 62%, 42%)',
          '800': 'hsl(0, 58%, 35%)',
          '900': 'hsl(0, 53%, 31%)',
          '950': 'hsl(0, 62%, 15%)',
      },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          light: 'hsl(var(--primary-light))',
          foreground: 'hsl(var(--primary-foreground))',
          100: '#f8d4d4',
          200: '#f1a9a9',
          300: '#ea7e7e',
          400: '#e35353',
          500: '#dc2828',
          600: '#b02020',
          700: '#841818',
          900: '#2c0808',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          black: {
            100: '#d4d4d4',
            200: '#a8a8a8',
            300: '#7d7d7d',
            400: '#515151',
            500: '#262626',
            600: '#1e1e1e',
            700: '#171717',
            800: '#0f0f0f',
            900: '#080808',
          },
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
