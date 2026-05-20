export default [
    {
        files: ['src/assets/js/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                window: 'readonly',
                document: 'readonly',
                IntersectionObserver: 'readonly',
                $: 'readonly',
                WOW: 'readonly',
                wow: 'readonly',
                Typed: 'readonly',
                LottieInteractivity: 'readonly',
            },
        },
        rules: {
            'no-undef': 'error',
            'no-unreachable': 'error',
            'no-dupe-keys': 'error',
            'no-redeclare': 'error',
        },
    },
];
