function registerHistoryAPI (events, w) {
  w = w || window

  if (events.size(/pushstate|replacestate/)) {
    return events
  }
  events.on(/pushstate|replacestate/, function pushstate (event, args) {
    var state = args.state
    var title = args.title
    var url = args.url
    w.history[event](state, title, url)
    events.trigger('changestate', state)
  })

  w.addEventListener('popstate', function (e) {
    events.trigger('changestate', e.state)
  })

  return events
}

module.exports = registerHistoryAPI
