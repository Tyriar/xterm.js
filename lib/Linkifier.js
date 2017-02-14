"use strict";
var protocolClause = '(https?:\\/\\/)';
var domainCharacterSet = '[\\da-z\\.-]+';
var negatedDomainCharacterSet = '[^\\da-z\\.-]+';
var domainBodyClause = '(' + domainCharacterSet + ')';
var tldClause = '([a-z\\.]{2,6})';
var ipClause = '((\\d{1,3}\\.){3}\\d{1,3})';
var portClause = '(:\\d{1,5})';
var hostClause = '((' + domainBodyClause + '\\.' + tldClause + ')|' + ipClause + ')' + portClause + '?';
var pathClause = '(\\/[\\/\\w\\.-]*)*';
var negatedPathCharacterSet = '[^\\/\\w\\.-]+';
var bodyClause = hostClause + pathClause;
var start = '(?:^|' + negatedDomainCharacterSet + ')(';
var end = ')($|' + negatedPathCharacterSet + ')';
var strictUrlRegex = new RegExp(start + protocolClause + bodyClause + end);
var HYPERTEXT_LINK_MATCHER_ID = 0;
var TIME_BEFORE_LINKIFY = 200;
var Linkifier = (function () {
    function Linkifier(rows) {
        this._nextLinkMatcherId = HYPERTEXT_LINK_MATCHER_ID;
        this._rows = rows;
        this._rowTimeoutIds = [];
        this._linkMatchers = [];
        this.registerLinkMatcher(strictUrlRegex, null, 1);
    }
    Linkifier.prototype.linkifyRow = function (rowIndex) {
        var timeoutId = this._rowTimeoutIds[rowIndex];
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        this._rowTimeoutIds[rowIndex] = setTimeout(this._linkifyRow.bind(this, rowIndex), TIME_BEFORE_LINKIFY);
    };
    Linkifier.prototype.attachHypertextLinkHandler = function (handler) {
        this._linkMatchers[HYPERTEXT_LINK_MATCHER_ID].handler = handler;
    };
    Linkifier.prototype.registerLinkMatcher = function (regex, handler, matchIndex) {
        if (this._nextLinkMatcherId !== HYPERTEXT_LINK_MATCHER_ID && !handler) {
            throw new Error('handler cannot be falsy');
        }
        var matcher = {
            id: this._nextLinkMatcherId++,
            regex: regex,
            handler: handler,
            matchIndex: matchIndex
        };
        this._linkMatchers.push(matcher);
        return matcher.id;
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
        var text = this._rows[rowIndex].textContent;
        for (var i = 0; i < this._linkMatchers.length; i++) {
            var matcher = this._linkMatchers[i];
            var uri = this._findLinkMatch(text, matcher.regex, matcher.matchIndex);
            if (uri) {
                this._doLinkifyRow(rowIndex, uri, matcher.handler);
                return;
            }
        }
    };
    Linkifier.prototype._doLinkifyRow = function (rowIndex, uri, handler) {
        var nodes = this._rows[rowIndex].childNodes;
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            var searchIndex = node.textContent.indexOf(uri);
            if (searchIndex >= 0) {
                var linkElement = this._createAnchorElement(uri, handler);
                if (node.textContent.trim().length === uri.length) {
                    if (node.nodeType === Node.TEXT_NODE) {
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
    Linkifier.prototype._createAnchorElement = function (uri, handler) {
        var element = document.createElement('a');
        element.textContent = uri;
        if (handler) {
            element.addEventListener('click', function () { return handler(uri); });
        }
        else {
            element.href = uri;
            element.target = '_blank';
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
        if (node.nodeType !== Node.TEXT_NODE) {
            node = node.childNodes[0];
        }
        if (node.childNodes.length === 0 && node.nodeType !== Node.TEXT_NODE) {
            throw new Error('targetNode must be a text node or only contain a single text node');
        }
        var fullText = node.textContent;
        if (substringIndex === 0) {
            var rightText = fullText.substring(substring.length);
            var rightTextNode = document.createTextNode(rightText);
            this._replaceNode(node, newNode, rightTextNode);
        }
        else if (substringIndex === targetNode.textContent.length - substring.length) {
            var leftText = fullText.substring(0, substringIndex);
            var leftTextNode = document.createTextNode(leftText);
            this._replaceNode(node, leftTextNode, newNode);
        }
        else {
            var leftText = fullText.substring(0, substringIndex);
            var leftTextNode = document.createTextNode(leftText);
            var rightText = fullText.substring(substringIndex + substring.length);
            var rightTextNode = document.createTextNode(rightText);
            this._replaceNode(node, leftTextNode, newNode, rightTextNode);
        }
    };
    return Linkifier;
}());
exports.Linkifier = Linkifier;

//# sourceMappingURL=Linkifier.js.map
