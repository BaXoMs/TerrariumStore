// terrarium-app/theme/tokens.ts
// Fuente única de verdad del sistema visual para RN — mismos valores que
// terrarium-web/styles/tokens.css, en el formato que consume StyleSheet.

export const colors = {
    // Base
    page: '#F7F4EC',
    paper: '#FFFFFF',
    ink: '#16261A',
    inkSoft: '#55635A',
    line: '#E4DFD1',

    // Acento principal — CTAs, precios, WhatsApp, tab activo
    lime: '#5FA832',
    limeSoft: '#E7F3DA',

    // Acento "Tienda" — bordes e íconos del lado comercial
    bamboo: '#B98F4E',
    bambooSoft: '#F4E9D3',

    // Acento "Veterinaria" — exclusivo para lo clínico, nunca decorativo
    red: '#B5342A',
    redSoft: '#FBE7E4',
} as const;

export const radius = {
    sm: 10,
    md: 14,
    lg: 36,
} as const;

export const fonts = {
    // Cargar con expo-font en app/_layout.tsx antes de renderizar
    display: 'FjallaOne-Regular',
    body: 'Inter-Regular',
    bodyMedium: 'Inter-Medium',
    bodySemiBold: 'Inter-SemiBold',
    bodyItalic: 'Inter-Italic', // uso obligatorio para nombres científicos
    mono: 'JetBrainsMono-Medium',
} as const;

export const spacing = (multiplier: number) => multiplier * 4;

// Assets a colocar en terrarium-app/assets/fonts/:
// FjallaOne-Regular.ttf
// Inter-Regular.ttf, Inter-Medium.ttf, Inter-SemiBold.ttf, Inter-Italic.ttf
// JetBrainsMono-Medium.ttf