import {
  HOWTO_URL,
  DATA_PORTAL_URL,
  BLOG_URL,
  DEVELOPERS_URL,
} from 'constants';

import gfwFires from 'assets/logos/gfw-fires.png?webp';
import gfwPro from 'assets/logos/gfw-pro.png?webp';
import forestWatcher from 'assets/logos/gfw-watcher.png?webp';

import developer from 'assets/icons/developer.svg?sprite';
import howto from 'assets/icons/howto.svg?sprite';
import sgf from 'assets/icons/sgf.svg?sprite';
import openData from 'assets/icons/open-data.svg?sprite';
import blog from 'assets/icons/blog.svg?sprite';
import forum from 'assets/icons/forum.svg?sprite';

export default {
  navMain: [
    { label: 'Map', href: '/map' },
    { label: 'Dashboard', href: '/dashboards/global' },
    {
      label: 'Topics',
      href: '/topics',
      submenu: [
        {
          label: 'Biodiversity',
          as: '/topics/biodiversity',
          href: '/topics/[topic]',
        },
        { label: 'Climate', as: '/topics/climate', href: '/topics/[topic]' },
        {
          label: 'Commodities',
          as: '/topics/commodities',
          href: '/topics/[topic]',
        },
        { label: 'Water', as: '/topics/water', href: '/topics/[topic]' },
      ],
    },
    { label: 'Blog', extLink: BLOG_URL },
    { label: 'About', href: '/about' },
  ],
  apps: [
    {
      label: 'GFW Fires',
      extLink: 'http://fires.globalforestwatch.org',
      image: gfwFires,
    },
    {
      label: 'GFW Pro',
      extLink: 'https://pro.globalforestwatch.org',
      image: gfwPro,
    },
    {
      label: 'Forest Watcher',
      extLink: 'http://forestwatcher.globalforestwatch.org',
      image: forestWatcher,
    },
  ],
  moreLinks: [
    { label: 'Developer Tools', extLink: DEVELOPERS_URL, icon: developer },
    { label: 'How to Portal', extLink: HOWTO_URL, icon: howto },
    {
      label: 'Grants & Fellowships',
      href: '/grants-and-fellowships',
      icon: sgf,
    },
    { label: 'Open data portal', extLink: DATA_PORTAL_URL, icon: openData },
    { label: 'Blog', extLink: BLOG_URL, icon: blog },
    {
      label: 'Discussion Forum',
      extLink: 'https://groups.google.com/forum/#!forum/globalforestwatch',
      icon: forum,
    },
  ],
  languages: [
    {
      label: 'English',
      value: 'en',
    },
    {
      label: '中文',
      value: 'zh',
    },
    {
      label: 'Français',
      value: 'fr',
    },
    {
      label: 'Bahasa Indonesia',
      value: 'id',
    },
    {
      label: 'Português (Brasil)',
      value: 'pt_BR',
    },
    {
      label: 'Español (Mexico)',
      value: 'es_MX',
    },
  ],
};