export function getPagePathname(pathname, nextExport) {
  if (!nextExport) return pathname;
  if (pathname === '/') return '/index.js';
  return `${pathname}/index.js`;
}
