# Fetching data with Material UI & Dynamic Import

This example allow you to fetch data from api get news from `techcrunch` using api service: [https://newsapi.org/](https://newsapi.org/). 

In this example, I use:
+ Babel config
+ PostCSS config
+ Webpack config: to add plugins allow develop CSS using SCSS
+ Redux
+ Material UI
+ Custom Document
+ Custom Server
+ Next Routes
+ Data fetching
+ Gulp
+ Dynamic import

Basically, Next.JS allow you to use `style-jsx` package to develop CSS, but in the production mode, html is not minified. I resolved it using `gulp` allow you to bundle final all scss into css & with postCSS to auto prefix the final css.

## Prefix Domain

go to `utils/constants` change prefix name whatever you want. In this demo, I choose `/news`. So I will visit by: 

http://localhost:3000/news

Note: Currently, there is no offical way to configure `prefix` in `next.js`. This demo worked well in version `next@3.0.0-beta13`.

# development

```bash
npm i nodemon -g
npm install
npm run dev
```

# production

```bash
npm i
npm run production
```

# Reference

+ [https://github.com/zeit/next.js/](https://github.com/zeit/next.js/)

