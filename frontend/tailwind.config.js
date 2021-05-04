module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            // Costum Colors
            colors: {
                paqyellow: {
                    // Yellow
                    DEFAULT: "#FCC922",
                    50: "#FFFFFF",
                    100: "#FFFAEB",
                    200: "#FEEEB9",
                    300: "#FDE287",
                    400: "#FDD554",
                    500: "#FCC922",
                    600: "#E8B203",
                    700: "#B68C02",
                    800: "#836502",
                    900: "#513E01",
                },
                paqgreen: {
                    // Dark Green / Teal
                    DEFAULT: "#384141",
                    50: "#A9B5B5",
                    100: "#9CA9A9",
                    200: "#809292",
                    300: "#677878",
                    400: "#505C5C",
                    500: "#384141",
                    600: "#202626",
                    700: "#090A0A",
                    800: "#000000",
                    900: "#000000",
                },
                paqteal: {
                    // Teal
                    DEFAULT: "#79A885",
                    50: "#FFFFFF",
                    100: "#F5F8F6",
                    200: "#D6E4D9",
                    300: "#B7D0BD",
                    400: "#98BCA1",
                    500: "#79A885",
                    600: "#5E906B",
                    700: "#4A7154",
                    800: "#36523D",
                    900: "#213426",
                },
                paqred: {
                    // Red
                    DEFAULT: "#894B50",
                    50: "#E7D3D4",
                    100: "#DEC2C4",
                    200: "#CCA1A5",
                    300: "#BA8085",
                    400: "#A85F65",
                    500: "#894B50",
                    600: "#68393D",
                    700: "#47272A",
                    800: "#261516",
                    900: "#050303",
                },
                paqorange: {
                    // Orange
                    DEFAULT: "#EF981E",
                    50: "#FEFAF4",
                    100: "#FDEFDC",
                    200: "#F9D9AD",
                    300: "#F6C47D",
                    400: "#F2AE4E",
                    500: "#EF981E",
                    600: "#CC7D0E",
                    700: "#9C600B",
                    800: "#6C4208",
                    900: "#3D2504",
                },
            },

            fontFamily: {
                raleway: ["Raleway"],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
