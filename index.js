var Metalsmith = require('metalsmith')

var pipeline = Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .use(require('./lib/events')())
  .use(require('metalsmith-drafts')())
  .use(require('metalsmith-markdown')())
  .use(require('metalsmith-permalinks')({
    patten: ':collection/:date',
    relative: false
  }))
  .use(require('metalsmith-layouts')({engine: 'handlebars'}))

if (process.env.NODE_ENV !== 'production') {
  pipeline
    .use(require('metalsmith-serve')())
    .use(require('metalsmith-watch')())
}

pipeline.build(function(err) {
  if (err) throw err
})
