/** @type {import('tailwindcss').Config} */
export default {
	mode: 'jit',
    darkMode: ["class", 'class'],
    content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}', // Add your content paths here
	  ],
  theme: {
  	extend: {
  		fontSize: {
  			xss: '0.6rem'
  		},
  		keyframes: {
  			spinSlow: {
  				from: {
  					transform: 'rotate(0deg)'
  				},
  				to: {
  					transform: 'rotate(360deg)'
  				}
  			},
  			bounceThrice: {
  				'0%, 10%, 30%, 40%, 60%, 70%, 90%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'20%, 50%, 80%': {
  					transform: 'translateY(-20%)'
  				}
  			},
  			glow: {
  				'0%, 100%': {
  					filter: 'drop-shadow(0 0 10px rgba(255, 255, 0, 0.8)) drop-shadow(0 0 20px rgba(255, 255, 0, 0.5))'
  				},
  				'50%': {
  					filter: 'drop-shadow(0 0 15px rgba(255, 255, 0, 1)) drop-shadow(0 0 30px rgba(255, 255, 0, 0.7))'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'spin-slow': 'spinSlow 3s linear infinite',
  			'bounce-thrice': 'bounceThrice 3s ease-in-out 1',
  			glow: 'glow 1.5s ease-in-out infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		transitionTimingFunction: {
  			slow: 'cubic-bezier(.405, 0, .025, 1)',
  			'minor-spring': 'cubic-bezier(0.18,0.89,0.82,1.04)'
  		}
  	}
  },
  variants: {
    extend: {
      animation: ['group-hover'],
      textColor: ['group-hover'],
    },
  },
  plugins: [require("tailwindcss-animate")],
}

