const path = require('path')

module.exports = themeOptions => {
  return {
    siteMetadata: {
      siteUrl: themeOptions.siteUrl,
      domain: themeOptions.domain,
      social: themeOptions.social,
      scrollOffset: themeOptions.scrollOffset,
      menuItems: themeOptions.menuItems
    },
    plugins: [
      'gatsby-plugin-react-helmet',
      {
        resolve: 'gatsby-plugin-robots-txt',
        options: {
          host: themeOptions.siteUrl,
          sitemap: `${themeOptions.siteUrl}/sitemap.xml`,
          policy: [{ userAgent: '*', allow: '/' }]
        }
      },
      {
        resolve: `gatsby-plugin-sass`,
        options: {
          data: '@import "variables.scss";',
          includePaths: [
            path.resolve('./src'),
          ],
        },
      },
      {
        // keep as first gatsby-source-filesystem plugin for gatsby image support
        resolve: 'gatsby-source-filesystem',
        options: {
          path: path.resolve('./static/media'),
          name: 'uploads',
        },
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: path.resolve('./src/pages')
        }
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: path.resolve('./src/content'),
          name: 'content',
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: path.resolve('./src/img'),
          name: 'images',
        },
      },
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
      {
        resolve: 'gatsby-transformer-remark',
        options: {
          plugins: [
            {
              resolve: 'gatsby-remark-relative-images',
              options: {
                // [Optional] The root of "media_folder" in your config.yml
                // Defaults to "static"
                staticFolderName: 'static',
              }
            },
            {
              resolve: 'gatsby-remark-images',
              options: {
                // It's important to specify the maxWidth (in pixels) of
                // the content Switcher as this plugin uses this as the
                // base for generating different widths of each image.
                maxWidth: 2048,
              },
            },
          ],
        },
      },
      {
        resolve: 'gatsby-plugin-netlify-cms',
        options: {
          modulePath: `${__dirname}/src/cms.js`,
          manualInit: true,
          enableIdentityWidget: false,
          publicPath: 'admin',
          htmlTitle: 'Content Manager'
        },
      },
      {
        resolve: 'gatsby-plugin-sitemap',
        options: {
          exclude: ["/kruidvat", "/abn", "/vakantieveilingen"],
        }
      },
      {
        resolve: `gatsby-plugin-google-tagmanager`,
        options: {
          id: themeOptions.tagManager,

          // Include GTM in development.
          // Defaults to false meaning GTM will only be loaded in production.
          includeInDevelopment: false,
        },
      },
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: themeOptions.title,
          short_name: themeOptions.titleShort,
          start_url: `/`,
          icon: path.resolve('./src/img/icon.png'),
          background_color: themeOptions.background_color,
          theme_color: themeOptions.theme_color,
          display: `standalone`,
        },
      },
      'gatsby-plugin-offline',
    ],
    mapping: {
      'MarkdownRemark.frontmatter.artist': `MarkdownRemark.frontmatter.title`,
      'MarkdownRemark.frontmatter.event': `MarkdownRemark.frontmatter.title`,
      'MarkdownRemark.frontmatter.events': `MarkdownRemark.frontmatter.title`,
      'MarkdownRemark.frontmatter.info1': `MarkdownRemark.frontmatter.title`,
      'MarkdownRemark.frontmatter.info2': `MarkdownRemark.frontmatter.title`,
      'MarkdownRemark.frontmatter.stages.acts.artist': `MarkdownRemark.frontmatter.title`,
    },
  }
}
