"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var INVALID_LINK_CLASS = 'xterm-invalid-link';
var protocolClause = '(https?:\\/\\/)';
var domainCharacterSet = '[\\da-z\\.-]+';
var negatedDomainCharacterSet = '[^\\da-z\\.-]+';
var domainBodyClause = '(' + domainCharacterSet + ')';
var tldClause = '([a-z\\.]{2,6})';
var ipClause = '((\\d{1,3}\\.){3}\\d{1,3})';
var localHostClause = '(localhost)';
var portClause = '(:\\d{1,5})';
var hostClause = '((' + domainBodyClause + '\\.' + tldClause + ')|' + ipClause + '|' + localHostClause + ')' + portClause + '?';
var pathClause = '(\\/[\\/\\w\\.\\-%~]*)*';
var queryStringHashFragmentCharacterSet = '[0-9\\w\\[\\]\\(\\)\\/\\?\\!#@$%&\'*+,:;~\\=\\.\\-]*';
var queryStringClause = '(\\?' + queryStringHashFragmentCharacterSet + ')?';
var hashFragmentClause = '(#' + queryStringHashFragmentCharacterSet + ')?';
var negatedPathCharacterSet = '[^\\/\\w\\.\\-%]+';
var bodyClause = hostClause + pathClause + queryStringClause + hashFragmentClause;
var start = '(?:^|' + negatedDomainCharacterSet + ')(';
var end = ')($|' + negatedPathCharacterSet + ')';
var strictUrlRegex = new RegExp(start + protocolClause + bodyClause + end);
var HYPERTEXT_LINK_MATCHER_ID = 0;
var Linkifier = (function () {
    function Linkifier() {
        this._nextLinkMatcherId = HYPERTEXT_LINK_MATCHER_ID;
        this._rowTimeoutIds = [];
        this._linkMatchers = [];
        this.registerLinkMatcher(strictUrlRegex, null, { matchIndex: 1 });
    }
    Linkifier.prototype.attachToDom = function (document, rows) {
        this._document = document;
        this._rows = rows;
    };
    Linkifier.prototype.linkifyRow = function (rowIndex) {
        if (!this._document) {
            return;
        }
        var timeoutId = this._rowTimeoutIds[rowIndex];
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        this._rowTimeoutIds[rowIndex] = setTimeout(this._linkifyRow.bind(this, rowIndex), Linkifier.TIME_BEFORE_LINKIFY);
    };
    Linkifier.prototype.setHypertextLinkHandler = function (handler) {
        this._linkMatchers[HYPERTEXT_LINK_MATCHER_ID].handler = handler;
    };
    Linkifier.prototype.setHypertextValidationCallback = function (callback) {
        this._linkMatchers[HYPERTEXT_LINK_MATCHER_ID].validationCallback = callback;
    };
    Linkifier.prototype.registerLinkMatcher = function (regex, handler, options) {
        if (options === void 0) { options = {}; }
        if (this._nextLinkMatcherId !== HYPERTEXT_LINK_MATCHER_ID && !handler) {
            throw new Error('handler must be defined');
        }
        var matcher = {
            id: this._nextLinkMatcherId++,
            regex: regex,
            handler: handler,
            matchIndex: options.matchIndex,
            validationCallback: options.validationCallback,
            priority: options.priority || 0
        };
        this._addLinkMatcherToList(matcher);
        return matcher.id;
    };
    Linkifier.prototype._addLinkMatcherToList = function (matcher) {
        if (this._linkMatchers.length === 0) {
            this._linkMatchers.push(matcher);
            return;
        }
        for (var i = this._linkMatchers.length - 1; i >= 0; i--) {
            if (matcher.priority <= this._linkMatchers[i].priority) {
                this._linkMatchers.splice(i + 1, 0, matcher);
                return;
            }
        }
        this._linkMatchers.splice(0, 0, matcher);
    };
    Linkifier.prototype.deregisterLinkMatcher = function (matcherId) {
        for (var i = 1; i < this._linkMatchers.length; i++) {
            if (this._linkMatchers[i].id === matcherId) {
                this._linkMatchers.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    Linkifier.prototype._linkifyRow = function (rowIndex) {
        var row = this._rows[rowIndex];
        if (!row) {
            return;
        }
        var text = row.textContent;
        var _loop_1 = function (i) {
            var matcher = this_1._linkMatchers[i];
            var uri = this_1._findLinkMatch(text, matcher.regex, matcher.matchIndex);
            if (uri) {
                var linkElement_1 = this_1._doLinkifyRow(rowIndex, uri, matcher.handler, matcher.id === HYPERTEXT_LINK_MATCHER_ID);
                if (linkElement_1 && matcher.validationCallback) {
                    matcher.validationCallback(uri, linkElement_1, function (isValid) {
                        if (!isValid) {
                            linkElement_1.classList.add(INVALID_LINK_CLASS);
                        }
                    });
                }
                return { value: void 0 };
            }
        };
        var this_1 = this;
        for (var i = 0; i < this._linkMatchers.length; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    Linkifier.prototype._doLinkifyRow = function (rowIndex, uri, handler, isHttpLinkMatcher) {
        var nodes = this._rows[rowIndex].childNodes;
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            var searchIndex = node.textContent.indexOf(uri);
            if (searchIndex >= 0) {
                var linkElement = this._createAnchorElement(uri, handler, isHttpLinkMatcher);
                if (node.textContent.length === uri.length) {
                    if (node.nodeType === 3) {
                        this._replaceNode(node, linkElement);
                    }
                    else {
                        var element = node;
                        if (element.nodeName === 'A') {
                            return;
                        }
                        element.innerHTML = '';
                        element.appendChild(linkElement);
                    }
                }
                else {
                    this._replaceNodeSubstringWithNode(node, linkElement, uri, searchIndex);
                }
                return linkElement;
            }
        }
    };
    Linkifier.prototype._findLinkMatch = function (text, regex, matchIndex) {
        var match = text.match(regex);
        if (!match || match.length === 0) {
            return null;
        }
        return match[typeof matchIndex !== 'number' ? 0 : matchIndex];
    };
    Linkifier.prototype._createAnchorElement = function (uri, handler, isHypertextLinkHandler) {
        var element = this._document.createElement('a');
        element.textContent = uri;
        element.draggable = false;
        if (isHypertextLinkHandler) {
            element.href = uri;
            element.target = '_blank';
            element.addEventListener('click', function (event) {
                if (handler) {
                    return handler(event, uri);
                }
            });
        }
        else {
            element.addEventListener('click', function (event) {
                if (element.classList.contains(INVALID_LINK_CLASS)) {
                    return;
                }
                return handler(event, uri);
            });
        }
        return element;
    };
    Linkifier.prototype._replaceNode = function (oldNode) {
        var newNodes = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            newNodes[_i - 1] = arguments[_i];
        }
        var parent = oldNode.parentNode;
        for (var i = 0; i < newNodes.length; i++) {
            parent.insertBefore(newNodes[i], oldNode);
        }
        parent.removeChild(oldNode);
    };
    Linkifier.prototype._replaceNodeSubstringWithNode = function (targetNode, newNode, substring, substringIndex) {
        var node = targetNode;
        if (node.nodeType !== 3) {
            node = node.childNodes[0];
        }
        if (node.childNodes.length === 0 && node.nodeType !== Node.TEXT_NODE) {
            throw new Error('targetNode must be a text node or only contain a single text node');
        }
        var fullText = node.textContent;
        if (substringIndex === 0) {
            var rightText = fullText.substring(substring.length);
            var rightTextNode = this._document.createTextNode(rightText);
            this._replaceNode(node, newNode, rightTextNode);
        }
        else if (substringIndex === targetNode.textContent.length - substring.length) {
            var leftText = fullText.substring(0, substringIndex);
            var leftTextNode = this._document.createTextNode(leftText);
            this._replaceNode(node, leftTextNode, newNode);
        }
        else {
            var leftText = fullText.substring(0, substringIndex);
            var leftTextNode = this._document.createTextNode(leftText);
            var rightText = fullText.substring(substringIndex + substring.length);
            var rightTextNode = this._document.createTextNode(rightText);
            this._replaceNode(node, leftTextNode, newNode, rightTextNode);
        }
    };
    return Linkifier;
}());
Linkifier.TIME_BEFORE_LINKIFY = 200;
exports.Linkifier = Linkifier;

//# sourceMappingURL=Linkifier.js.map
