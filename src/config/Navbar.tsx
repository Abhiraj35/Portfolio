export interface NavItem {
  label: string;
  href: string;
}

export const navbarConfig = {
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Skills',
      href: '/skills',
    },
    {
      label: 'Blogs',
      href: '/blog',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
  ] as NavItem[],
};

