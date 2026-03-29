// Initialize Alpine.js
import Alpine from 'alpinejs';

export function initAlpine() {
  // Make Alpine available globally for use in HTML
  window.Alpine = Alpine;
  
  // Start Alpine
  Alpine.start();
}

// Auto-initialize Alpine
initAlpine();
