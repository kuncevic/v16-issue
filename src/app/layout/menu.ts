export interface NavBarItem {
  title: string;
  icon: string;
  route: string;
  enabled: boolean;
  roles?: [];
  children?: NavBarItem[];
}

export const navItems: NavBarItem[] = [
  {
    title: 'Panel',
    icon: 'business',
    route: '/panel',
    enabled: true,
    roles: [],
    children: [
      {
        title: 'lazy1',
        icon: 'receipt',
        route: '/panel/lazy1',
        enabled: true,
      },
      {
        title: 'lazy2',
        icon: 'shopping_bag',
        route: '/panel/lazy2',
        enabled: true,
      },
    ],
  },
  {
    title: 'Log Out',
    icon: 'exit_to_app',
    route: '/auth/login',
    enabled: true,
  },
];
