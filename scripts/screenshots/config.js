export const BASE_URL = 'http://localhost:2368';

export const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];

export const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/about/', name: 'about' },
  { path: '/privacy-policy/', name: 'privacy-policy' },
  { path: '/tag/ai/', name: 'tag-ai' },
  { path: '/tag/javascript/', name: 'tag-javascript' },
  { path: '/understanding-ebpf-how-the-linux-kernel-became-programmable-and-why-it-matters/', name: 'post-ebpf' },
  { path: '/the-rise-of-ai-coding-assistants-how-llms-are-transforming-developer-workflows-in-2026/', name: 'post-ai' },
  { path: '/author/henry-harrison/', name: 'author-henry-harrison' },
];
