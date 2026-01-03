/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
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
          border: 'var(--color-border)', /* Subtle white - gentle separation */
          input: 'var(--color-input)', /* Elevated surface - input backgrounds */
          ring: 'var(--color-ring)', /* Classic gold - focus rings */
          background: 'var(--color-background)', /* Rich black - reduces eye strain */
          foreground: 'var(--color-foreground)', /* Pure white - maximum readability */
          primary: {
            DEFAULT: 'var(--color-primary)', /* Classic gold - wealth association */
            foreground: 'var(--color-primary-foreground)', /* Deep charcoal - high contrast on gold */
          },
          secondary: {
            DEFAULT: 'var(--color-secondary)', /* Elevated surface - subtle depth */
            foreground: 'var(--color-secondary-foreground)', /* Pure white - secondary text */
          },
          destructive: {
            DEFAULT: 'var(--color-destructive)', /* Clear red - error communication */
            foreground: 'var(--color-destructive-foreground)', /* Pure white - error text */
          },
          muted: {
            DEFAULT: 'var(--color-muted)', /* Deep charcoal - muted backgrounds */
            foreground: 'var(--color-muted-foreground)', /* Muted gray - supporting info */
          },
          accent: {
            DEFAULT: 'var(--color-accent)', /* Classic gold - accent elements */
            foreground: 'var(--color-accent-foreground)', /* Deep charcoal - accent text */
          },
          popover: {
            DEFAULT: 'var(--color-popover)', /* Elevated popover surface */
            foreground: 'var(--color-popover-foreground)', /* Pure white - popover text */
          },
          card: {
            DEFAULT: 'var(--color-card)', /* Elevated surface - content separation */
            foreground: 'var(--color-card-foreground)', /* Pure white - card text */
          },
          success: {
            DEFAULT: 'var(--color-success)', /* Emerald green - positive returns */
            foreground: 'var(--color-success-foreground)', /* Pure white - success text */
          },
          warning: {
            DEFAULT: 'var(--color-warning)', /* Amber - important notices */
            foreground: 'var(--color-warning-foreground)', /* Deep charcoal - warning text */
          },
          error: {
            DEFAULT: 'var(--color-error)', /* Clear red - error states */
            foreground: 'var(--color-error-foreground)', /* Pure white - error text */
          },
        },
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)',
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
          data: ['JetBrains Mono', 'Courier New', 'monospace'],
        },
        fontSize: {
          'xs': ['0.75rem', { lineHeight: '1rem' }],
          'sm': ['0.875rem', { lineHeight: '1.25rem' }],
          'base': ['1rem', { lineHeight: '1.5rem' }],
          'lg': ['1.125rem', { lineHeight: '1.75rem' }],
          'xl': ['1.25rem', { lineHeight: '1.75rem' }],
          '2xl': ['1.5rem', { lineHeight: '2rem' }],
          '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
          '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
          '5xl': ['3rem', { lineHeight: '1' }],
        },
        boxShadow: {
          'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
          'DEFAULT': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
          'md': '0 6px 8px -2px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
          'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
          'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
          '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        },
        transitionTimingFunction: {
          'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
        transitionDuration: {
          '150': '150ms',
          '200': '200ms',
          '300': '300ms',
        },
        keyframes: {
          'fade-in': {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          'fade-out': {
            '0%': { opacity: '1' },
            '100%': { opacity: '0' },
          },
          'slide-in-up': {
            '0%': { transform: 'translateY(100%)' },
            '100%': { transform: 'translateY(0)' },
          },
          'slide-out-down': {
            '0%': { transform: 'translateY(0)' },
            '100%': { transform: 'translateY(100%)' },
          },
          'scale-in': {
            '0%': { transform: 'scale(0.95)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          },
          'scale-out': {
            '0%': { transform: 'scale(1)', opacity: '1' },
            '100%': { transform: 'scale(0.95)', opacity: '0' },
          },
          'shimmer': {
            '0%': { backgroundPosition: '-1000px 0' },
            '100%': { backgroundPosition: '1000px 0' },
          },
          'pulse-subtle': {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.8' },
          },
        },
        animation: {
          'fade-in': 'fade-in 200ms ease-out',
          'fade-out': 'fade-out 200ms ease-out',
          'slide-in-up': 'slide-in-up 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          'slide-out-down': 'slide-out-down 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          'scale-in': 'scale-in 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          'scale-out': 'scale-out 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          'shimmer': 'shimmer 2s linear infinite',
          'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
      require('tailwindcss-animate'),
    ],
  }

