import { defineThemeConfig } from '@utils/defineThemeConfig'
import previewImage from '@assets/img/social-preview-image.png'
import logoImage from '@assets/img/logo.svg'

export default defineThemeConfig({
  name: 'Accessible Astro',
  id: 'accessible-astro-starter',
  logo: logoImage,
  seo: {
    title: 'Accessible Astro Starter',
    description:
      'An Accessible Starter Theme for Astro including several accessibility features and tools to help you build faster.',
    author: 'Incluud',
    image: previewImage, // Can also be a string e.g. '/social-preview-image.png',
  },
  colors: {
    primary: '#d648ff',
    secondary: '#00d1b7',
    neutral: '#b9bec4',
    outline: '#ff4500',
  },
  navigation: {
    darkmode: true,
    items: [
      {
        type: 'link',
        label: 'Home',
        href: '/',
      },
      {
        label: 'Portfolio',
        type: 'dropdown',
        items: [
          {
            label: 'Korea Holidays',
            href: 'https://finalneodev.github.io/Korea_Holidays/',
            external: true,
          },
          {
            label: 'Korea Holidays (Overtime)',
            href: 'https://finalneodev.github.io/Korea_Holidays/overtime.html',
            external: true,
          },
          {
            label: 'KERIS OFL Fonts',
            href: 'https://finalneodev.github.io/KERIS_OFL_fonts/',
            external: true,
          }
        ]
      },
      {
        type: 'link',
        label: 'GitHub',
        href: 'https://github.com/FinalNeoDev',
        icon: 'lucide:github',
        external: true,
        excludeFromLauncher: true,
      },
    ],
  },
  socials: [
    {
      label: 'GitHub',
      href: 'https://github.com/incluud/',
      icon: 'lucide:github',
    },
    {
      label: 'Bluesky',
      href: 'https://bsky.app/profile/incluud.dev',
      icon: 'lucide:bot-message-square',
    },
    {
      label: 'Open Collective',
      href: 'https://opencollective.com/incluud',
      icon: 'lucide:hand-heart',
    },
  ],
})
