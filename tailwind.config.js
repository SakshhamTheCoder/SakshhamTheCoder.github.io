/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                primary: '#DA0037',
                secondary: '#1C1C1C',
                tertiary: '#444444',
                textColor: '#E5E5E5',
                // primary: '#537FE7',
                // secondary: '#181823',
                // tertiary: '#E9F8F9',
                // textColor: '#C0EEF2',
            },
        },
    },
    plugins: [],
};

