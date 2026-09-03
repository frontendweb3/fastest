// Vite HMR (Hot Module Replacement) Development Client and Entry Scripts
if (import.meta.env.DEV) {
    const host = window.location.hostname || 'localhost';
    const port = 5173;
    const viteBaseUrl = `http://${host}:${port}`;

    console.log(`[Vite HMR] Development mode detected`);

    // Inject Vite HMR client
    const viteClient = document.createElement('script');
    viteClient.type = 'module';
    viteClient.src = `${viteBaseUrl}/@vite/client`;
    document.head.appendChild(viteClient);

    // Inject main entry CSS/JS
    const viteEntry = document.createElement('script');
    viteEntry.type = 'module';
    viteEntry.src = `${viteBaseUrl}/assets/js/main.js`;
    document.head.appendChild(viteEntry);
}
