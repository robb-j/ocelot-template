# Ocelot Template

The default template when rendering [Ocelot Docs](https://github.com/robb-j/ocelot)

## Template Structure

This template is compiled through [Webpack](https://webpack.github.io/) and fulfils the requirement for an Ocelot template, providing the `info.yml`, `index.pug` and `error.pug` files.

Webpack is used to build the static assets which are copied in when the template is used, for this it uses [Stylus](http://stylus-lang.com/) for css and [Vue](https://vuejs.org/) for simple js interactions. The stylus compiled to minified css into `assets/css`. The javascript is polyfilled using [Babel](https://babeljs.io/docs/usage/polyfill/) and minified into `assets/js`

## Useful Commands

```bash

# Build the docs once
npm run build

# Watch the webpack
npm run dev

````
