import gfwFires from 'assets/logos/gfw-fires.png';
import gfwPro from 'assets/logos/gfw-pro.png';
import forestWatcher from 'assets/logos/gfw-watcher.png';

export default {
  navMain: [
    {
      label: 'Map',
      path: '/map'
    },
    {
      label: 'Dashboard',
      path: '/dashboards'
    },
    {
      label: 'Topics',
      path: '/topics',
      submenu: [
        {
          label: 'Biodiversity',
          path: '/topics/biodiversity'
        },
        {
          label: 'Climate',
          path: '/topics/climate'
        },
        {
          label: 'Commodities',
          path: '/topics/commodities'
        },
        {
          label: 'Water',
          path: '/topics/water'
        }
      ]
    },
    {
      label: 'Blog',
      extLink: 'https://blog.globalforestwatch.org'
    },
    {
      label: 'About',
      path: '/about'
    }
  ],
  myGfwLinks: [
    {
      label: 'My subscriptions',
      extLink: '/my-gfw/subscriptions'
    },
    {
      label: 'My profile',
      path: '/my-gfw'
    },
    {
      label: 'Logout',
      extLink: '/auth/logout',
      onSelect: e => {
        e.preventDefault();
        // logout();
      }
    }
  ],
  apps: [
    {
      label: 'GFW Fires',
      extLink: 'http://fires.globalforestwatch.org',
      image: gfwFires
    },
    {
      label: 'GFW Pro',
      extLink: 'https://pro.globalforestwatch.org',
      image: gfwPro
    },
    {
      label: 'Forest Watcher',
      extLink: 'http://forestwatcher.globalforestwatch.org',
      image: forestWatcher
    }
  ],
  moreLinks: [
    {
      label: 'Developer Tools',
      extLink: 'http://developers.globalforestwatch.org',
      icon: 'icon-developer'
    },
    {
      label: 'How to Portal',
      extLink: 'https://www.globalforestwatch.org/howto',
      icon: 'icon-howto'
    },
    {
      label: 'Grants & Fellowships',
      path: '/grants-and-fellowships',
      icon: 'icon-sgf'
    },
    {
      label: 'Open data portal',
      extLink: 'https://data.globalforestwatch.org/',
      icon: 'icon-opendata'
    },
    {
      label: 'Blog',
      extLink: 'https://blog.globalforestwatch.org',
      icon: 'icon-blog'
    },
    {
      label: 'Discussion Forum',
      extLink: 'https://groups.google.com/forum/#!forum/globalforestwatch',
      icon: 'icon-forum'
    }
  ]
};
