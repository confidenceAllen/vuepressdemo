module.exports = {
    //导航栏
    base: '/docs/',
    themeConfig: {
        logo: '/banner.jpg',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'External', link: 'http://www.baidu.com' },
            {
                text: 'Languages',
                ariaLabel: 'Language Menu',
                items: [
                  { text: 'Chinese', link: '/language/chinese/' },
                  { text: 'Japanese', link: '/language/japanese/' }
                ]
              }
          ]
      },
    title: 'Hello VuePress',
    description: 'Just playing around'
  }