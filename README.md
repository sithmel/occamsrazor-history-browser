occamsrazor-history-browser
===========================
This function provides a bridge between the history API and the event bus created using [occamsrazor](https://github.com/sithmel/occamsrazor.js)
It exposes a convenient "changestate" event that fires when pushstate/replacestate are called or popstate event is triggered.
See the [history API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
```js
var or = require('occamsrazor');
var registerHistoryAPI = require('occamsrazor-history-browser');

var events = or();
registerHistoryAPI(events);

events.on('changestate', function (evt, newState) {
  // either pushstate was triggered on "events"
  // or popstate fired on "window". For example the user clicked back or forward
});

events.trigger('pushstate', { state: { ... }, title: 'newTitle', url: 'new.html' });
```

Syntax:
**registerHistoryAPI(events, window);**

* events: an occamsrazor instance
* window (optional): the global object, it defaults to "window"

You can interact with the history API using 2 events: **pushstate** and **replacestate**.
They takes as second argument an object with state, title, url: the arguments are then passed to history.pushstate or history.replacestate.

These events trigger 'changestate' that is called with the new state. changestate is also called by the browser when popstate is triggered (clicking the back button for example).
