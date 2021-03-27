'use strict';

var _websiteComponentClass = require('../../classes/websiteComponentClass');

var _websiteComponentClass2 = _interopRequireDefault(_websiteComponentClass);

var _websiteCheck = require('../websiteCheck');

var _websiteCheck2 = _interopRequireDefault(_websiteCheck);

var _mockWebsiteCheckClass = require('./mockWebsiteCheckClass');

var _mockWebsiteCheckClass2 = _interopRequireDefault(_mockWebsiteCheckClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('chai'),
    expect = _require.expect;

var mockServiceConfigObject = {
  key: 0,
  name: 'Name of the check',
  description: 'The description',
  checkType: 'The type of check',
  expectedResponseCode: 200,
  expectedResponseTime: 500,
  url: 'some url',
  resolveWithFullResponse: true
};

var Log = require('../../common/__tests__/mockLogger');

var log = void 0;

describe('#WebsiteCheckClass', function () {

  beforeEach(function () {
    log = new Log();
  });

  it('should reject an invalid URL and log an error', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var websiteComponent, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            websiteComponent = new _websiteComponentClass2.default(mockServiceConfigObject);
            _context.next = 3;
            return _websiteCheck2.default.makeHttpRequest(websiteComponent, log);

          case 3:
            response = _context.sent;


            expect(response.getActualResponseCode()).to.equal('Error: Invalid URI "some%20url"');

            expect(log.getLogEntries()[0].type).to.equal('error');
            expect(log.getLogEntries().length).to.equal(1);
            expect(log.getLogEntries()[0].message).to.contain('Error: Invalid URI "some%20url"');

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  })));

  it('should test a website and return a 200', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var websiteComponent, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            websiteComponent = new _websiteComponentClass2.default(mockServiceConfigObject);

            websiteComponent.setUrl('http://bbc.co.uk');
            _context2.next = 4;
            return _mockWebsiteCheckClass2.default.makeValidHttpRequest(websiteComponent, log);

          case 4:
            response = _context2.sent;


            expect(response.getActualResponseCode()).to.equal(200);

            expect(log.getLogEntries()[0].type).to.equal('info');
            expect(log.getLogEntries().length).to.equal(1);
            expect(log.getLogEntries()[0].message).to.contain('Called http://bbc.co.uk.  Response code 200.  Response time 0ms.');

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  })));

  it('should attempt to check a website but return a 404', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var websiteComponent, response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            websiteComponent = new _websiteComponentClass2.default(mockServiceConfigObject);

            websiteComponent.setUrl('http://bbc.co.uk');
            websiteComponent.setExpectedResponseCode(404);

            _context3.next = 5;
            return _mockWebsiteCheckClass2.default.makePageNotFoundHttpRequest(websiteComponent, log);

          case 5:
            response = _context3.sent;


            expect(response.getActualResponseCode()).to.equal(404);

            expect(log.getLogEntries()[0].type).to.equal('info');
            expect(log.getLogEntries().length).to.equal(1);
            expect(log.getLogEntries()[0].message).to.contain('Called http://bbc.co.uk.  Response code 404.  Response time 0ms.');

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  })));

  it('should attempt to check a website but return a 500', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var websiteComponent, response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            websiteComponent = new _websiteComponentClass2.default(mockServiceConfigObject);

            websiteComponent.setUrl('http://bbc.co.uk');
            websiteComponent.setExpectedResponseCode(500);

            _context4.next = 5;
            return _mockWebsiteCheckClass2.default.makeServerErrorHttpRequest(websiteComponent, log);

          case 5:
            response = _context4.sent;


            expect(response.getActualResponseCode()).to.equal(500);

            expect(log.getLogEntries()[0].type).to.equal('info');
            expect(log.getLogEntries().length).to.equal(1);
            expect(log.getLogEntries()[0].message).to.contain('Called http://bbc.co.uk.  Response code 500');

          case 10:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  })));
});