var bs = require('browser-sync').create();

bs.init({
  server: 'app',
  files: ['dist/*', 'html/index.html']
});