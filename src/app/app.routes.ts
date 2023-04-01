export const authRoutes = () =>
  import('./auth/routes').then(m => m.AUTH_ROUTES);

export const panelRoutes = () =>
  import('./panel/routes').then(m => m.LAZY_ROUTES);
