/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        container: {
            padding: '1rem',
            center: true
        },
        extend: {
            fontFamily: {
                roboto: ['Roboto', 'sans-serif'],
                montserat: ['Montserrat', 'sans-serif']
            }
        }
    },
    plugins: [require('@tailwindcss/forms')]
}
