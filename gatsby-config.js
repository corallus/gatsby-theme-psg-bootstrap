const path = require('path')

module.exports = themeOptions => {
  return {
    plugins: [
      {
        resolve: `gatsby-theme-psg`,
        options: {
          ...themeOptions
        },
      },
      {
        resolve: `gatsby-plugin-sass`,
        options: {
          additionalData: `@import "${path.resolve('./src')}/variables.scss";`,
        },
      }
    ]
  }
}
