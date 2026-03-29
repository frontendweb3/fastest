// Import styles
import '../css/styles.css';

// Import utilities
import './alpine.js';  // Initialize Alpine.js
import './icons.js';   // Initialize Lucide icons
import './brand-icon.js';   // Initialize Brand icons with @thesvg/icons.


// Help Vite discover images for optimization
import.meta.glob('../images/**/*.{png,jpg,jpeg,svg,webp,avif}', { eager: true });