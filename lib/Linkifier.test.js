"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var jsdom = require("jsdom");
var chai_1 = require("chai");
var Linkifier_1 = require("./Linkifier");
var TestLinkifier = (function (_super) {
    __extends(TestLinkifier, _super);
    function TestLinkifier() {
        var _this = this;
        Linkifier_1.Linkifier.TIME_BEFORE_LINKIFY = 0;
        _this = _super.call(this) || this;
        return _this;
    }
    Object.defineProperty(TestLinkifier.prototype, "linkMatchers", {
        get: function () { return this._linkMatchers; },
        enumerable: true,
        configurable: true
    });
    return TestLinkifier;
}(Linkifier_1.Linkifier));
describe('Linkifier', function () {
    var window;
    var document;
    var container;
    var rows;
    var linkifier;
    beforeEach(function (done) {
        jsdom.env('', function (err, w) {
            window = w;
            document = window.document;
            linkifier = new TestLinkifier();
            done();
        });
    });
    describe('before attachToDom', function () {
        it('should allow link matcher registration', function (done) {
            chai_1.assert.doesNotThrow(function () {
                var linkMatcherId = linkifier.registerLinkMatcher(/foo/, function () { });
                chai_1.assert.isTrue(linkifier.deregisterLinkMatcher(linkMatcherId));
                done();
            });
        });
    });
    describe('after attachToDom', function () {
        beforeEach(function () {
            rows = [];
            linkifier.attachToDom(document, rows);
            container = document.createElement('div');
            document.body.appendChild(container);
        });
        function addRow(text) {
            var element = document.createElement('div');
            element.textContent = text;
            container.appendChild(element);
            rows.push(element);
        }
        function clickElement(element) {
            var event = document.createEvent('MouseEvent');
            event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            element.dispatchEvent(event);
        }
        function assertLinkifiesEntireRow(uri, done) {
            addRow(uri);
            linkifier.linkifyRow(0);
            setTimeout(function () {
                chai_1.assert.equal(rows[0].firstChild.tagName, 'A');
                chai_1.assert.equal(rows[0].firstChild.textContent, uri);
                done();
            }, 0);
        }
        describe('http links', function () {
            it('should allow ~ character in URI path', function (done) { return assertLinkifiesEntireRow('http://foo.com/a~b#c~d?e~f', done); });
        });
        describe('validationCallback', function () {
            it('should enable link if true', function (done) {
                addRow('test');
                linkifier.registerLinkMatcher(/test/, function () { return done(); }, {
                    validationCallback: function (url, element, cb) {
                        cb(true);
                        chai_1.assert.equal(rows[0].firstChild.tagName, 'A');
                        setTimeout(function () { return clickElement(rows[0].firstChild); }, 0);
                    }
                });
                linkifier.linkifyRow(0);
            });
            it('should disable link if false', function (done) {
                addRow('test');
                linkifier.registerLinkMatcher(/test/, function () { return chai_1.assert.fail(); }, {
                    validationCallback: function (url, element, cb) {
                        cb(false);
                        chai_1.assert.equal(rows[0].firstChild.tagName, 'A');
                        setTimeout(function () { return clickElement(rows[0].firstChild); }, 0);
                    }
                });
                linkifier.linkifyRow(0);
                setTimeout(function () { return done(); }, 10);
            });
        });
        describe('priority', function () {
            it('should order the list from highest priority to lowest #1', function () {
                var aId = linkifier.registerLinkMatcher(/a/, function () { }, { priority: 1 });
                var bId = linkifier.registerLinkMatcher(/b/, function () { }, { priority: -1 });
                chai_1.assert.deepEqual(linkifier.linkMatchers.map(function (lm) { return lm.id; }), [aId, 0, bId]);
            });
            it('should order the list from highest priority to lowest #2', function () {
                var aId = linkifier.registerLinkMatcher(/a/, function () { }, { priority: -1 });
                var bId = linkifier.registerLinkMatcher(/b/, function () { }, { priority: 1 });
                chai_1.assert.deepEqual(linkifier.linkMatchers.map(function (lm) { return lm.id; }), [bId, 0, aId]);
            });
            it('should order items of equal priority in the order they are added', function () {
                var aId = linkifier.registerLinkMatcher(/a/, function () { }, { priority: 0 });
                var bId = linkifier.registerLinkMatcher(/b/, function () { }, { priority: 0 });
                chai_1.assert.deepEqual(linkifier.linkMatchers.map(function (lm) { return lm.id; }), [0, aId, bId]);
            });
        });
    });
});

//# sourceMappingURL=Linkifier.test.js.map
