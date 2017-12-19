/* eslint-env node, mocha */
var assert = require('chai').assert
var registerHistoryAPI = require('..')
var or = require('occamsrazor')
var sinon = require('sinon')

var getWindowObject = function () {
  return {
    addEventListener: sinon.spy(),
    history: {
      pushstate: sinon.spy(),
      replacestate: sinon.spy()
    }
  }
}

describe('register', function () {
  it('is a function', function () {
    assert.typeOf(registerHistoryAPI, 'function')
  })

  it('register on popstate', function () {
    var w = getWindowObject()
    registerHistoryAPI(or(), w)
    assert.isTrue(w.addEventListener.called)
    assert.isTrue(w.addEventListener.calledWith('popstate'))
  })

  it('register once', function () {
    var w = getWindowObject()
    var events = or()
    registerHistoryAPI(events, w)
    registerHistoryAPI(events, w)
    assert.isTrue(w.addEventListener.calledOnce)
  })

  describe('works', function () {
    var events, w

    beforeEach(function () {
      w = getWindowObject()
      events = registerHistoryAPI(or(), w)
    })

    it('manages pushstate', function (done) {
      events.on('changestate', function (evt, state) {
        assert.deepEqual(state, { hello: 'world' })
        assert.isTrue(w.history.pushstate.called)
        assert.isTrue(w.history.pushstate.calledWith({ hello: 'world' }, 'new title', 'new.html'))
        done()
      })
      events.trigger('pushstate', { state: { hello: 'world' }, title: 'new title', url: 'new.html' })
    })

    it('manages replacestate', function (done) {
      events.on('changestate', function (evt, state) {
        assert.deepEqual(state, { hello: 'world' })
        assert.isTrue(w.history.replacestate.called)
        assert.isTrue(w.history.replacestate.calledWith({ hello: 'world' }, 'new title', 'new.html'))
        done()
      })
      events.trigger('replacestate', { state: { hello: 'world' }, title: 'new title', url: 'new.html' })
    })
  })
})
