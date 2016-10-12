var moment = require('moment')
var getUpcoming = function (events) {
  var result = []
  for (var i = 0; i < events.length; i++) {
    if (moment(events[i].date, 'YYYY-MM-DD').isAfter(moment())) {
      result.push(events[i])
    }
  }
  return result
}
var getPast = function (events) {
  var result = []
  for (var i = 0; i < events.length; i++) {
    if (moment(events[i].date, 'YYYY-MM-DD').isSameOrBefore(moment())) {
      result.push(events[i])
    }
  }
  return result
}
module.exports = function () {
  return function database(files, metalsmith, done){
    // TODO connect and read events from database
    var events = [{
      title: 'varnalab.org-static site generator',
      layout: 'event.html',
      date: '2016-10-12',
      collection: 'events',
      contents: new Buffer('a hackaton for static site generator with metalsmith')
    },{
      title: 'varnalab.org launch',
      layout: 'event.html',
      date: '2016-10-13',
      collection: 'events',
      contents: new Buffer('a hackaton for launch')
    }]
    var metadata = metalsmith.metadata()
    for (var i = 0; i < events.length; i++) {
      events[i].next = events[i + 1]
      events[i].previous = events[i - 1]
      var eventFileName = 'events/' + events[i].date + '.html'
      files[eventFileName] = events[i]
    }
    metadata.collections = {}
    metadata.collections.events = events
    metadata.collections.upcoming_events = getUpcoming(events)
    metadata.collections.past_events = getPast(events)
    done()
  }
}
