var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-funnel');
var babelTranspiler = require('broccoli-babel-transpiler');
var browserify = require('broccoli-fast-browserify');
var sourceMap = require('broccoli-source-map');
var less = require('broccoli-less-single');
var browserSync = require('broccoli-browser-sync');

/// - JavaScript ---------------------------------------------------------------

var jsTree = pickFiles('app', {
  srcDir: '/js'
});

jsTree = babelTranspiler(jsTree);

// Browserify
jsTree = browserify(jsTree, {
  bundles: {
    'js/app.js': { entryPoints: ['app.js'] }
  }
});

// Extract source maps
jsTree = sourceMap.extract(jsTree);

/// - CSS ----------------------------------------------------------------------

var cssTree = 'app/style';

// Compile LESS
cssTree = less(cssTree, 'main.less', 'css/main.css');

/// - HTML ---------------------------------------------------------------------

var htmlTree = pickFiles('app/html', { destDir: 'html' });

/// - BrowserSync --------------------------------------------------------------

var bsTree = browserSync([ jsTree, cssTree, htmlTree ]);

/// - Export -------------------------------------------------------------------

module.exports = mergeTrees([ jsTree, cssTree, htmlTree, bsTree ]);