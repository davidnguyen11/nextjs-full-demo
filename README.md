# Fetching data with Material UI

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

Basically, Next.JS allow you to use `style-jsx` package to develop CSS, but in the production mode, html is not minified. So that, gulp allow you to bundle final all scss into css.

## Prefix Domain

go to `utils/constants` change prefix name whatever you want. In this demo, I choose `/news`. So I will visit by: 

http://localhost:3000/news

Note: There is no offical way to configure `prefix` in `next.js`. Currently, this demo worked well in version `next@3.0.0-beta13`.

## How to use

Download the example [or clone the repo](https://github.com/zeit/next.js):

Install it and run:

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


