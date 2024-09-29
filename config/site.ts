export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Text to Speech Converter',
  description: 'NextJS Template',
  mainNav: [
    {
      title: 'Contact',
      href: '/contact',
      isActive: false
    },
    {
      title: 'Project',
      href: '/project',
      isActive: false
    }
  ],
  links: {
    twitter: 'https://twitter.com/twekaone',
    github: 'https://github.com/ekaone/text-to-speech-converter',
    projects: '/project'
  }
}
