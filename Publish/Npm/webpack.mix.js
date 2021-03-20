const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
// Normal js files
mix.js('resources/vendor/Canvas/js/main.js', 'public/vendor/Canvas/js')
    .sourceMaps()
    .version();

// Vue js example
// mix.js('resources/vendor/Canvas/js/vue.js', 'public/vendor/Canvas/js')
//     .vue({version: 3})
//     .sourceMaps()
//     .version();

mix.js('resources/vendor/Canvas/js/app.js', 'public/vendor/Canvas/js')
.vue();

const tailwindcss = require('tailwindcss')

mix.sass('resources/vendor/Canvas/sass/app.scss', 'public/vendor/Canvas/css')
   .options({
      processCssUrls: false,
      postCss: [ tailwindcss('tailwind.config.js') ],
});
