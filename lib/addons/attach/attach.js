"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function attach(term, socket, bidirectional, buffered) {
    var addonTerminal = term;
    bidirectional = (typeof bidirectional === 'undefined') ? true : bidirectional;
    addonTerminal.__socket = socket;
    addonTerminal.__flushBuffer = function () {
        addonTerminal.write(addonTerminal.__attachSocketBuffer);
        addonTerminal.__attachSocketBuffer = null;
    };
    addonTerminal.__pushToBuffer = function (data) {
        if (addonTerminal.__attachSocketBuffer) {
            addonTerminal.__attachSocketBuffer += data;
        }
        else {
            addonTerminal.__attachSocketBuffer = data;
            setTimeout(addonTerminal.__flushBuffer, 10);
        }
    };
    var myTextDecoder;
    addonTerminal.__getMessage = function (ev) {
        var str;
        if (typeof ev.data === 'object') {
            if (ev.data instanceof ArrayBuffer) {
                if (!myTextDecoder) {
                    myTextDecoder = new TextDecoder();
                }
                str = myTextDecoder.decode(ev.data);
            }
            else {
                throw 'TODO: handle Blob?';
            }
        }
        if (buffered) {
            addonTerminal.__pushToBuffer(str || ev.data);
        }
        else {
            addonTerminal.write(str || ev.data);
        }
    };
    addonTerminal.__sendData = function (data) {
        if (socket.readyState !== 1) {
            return;
        }
        socket.send(data);
    };
    socket.addEventListener('message', addonTerminal.__getMessage);
    if (bidirectional) {
        addonTerminal.on('data', addonTerminal.__sendData);
    }
    socket.addEventListener('close', function () { return detach(addonTerminal, socket); });
    socket.addEventListener('error', function () { return detach(addonTerminal, socket); });
}
exports.attach = attach;
function detach(term, socket) {
    var addonTerminal = term;
    addonTerminal.off('data', addonTerminal.__sendData);
    socket = (typeof socket === 'undefined') ? addonTerminal.__socket : socket;
    if (socket) {
        socket.removeEventListener('message', addonTerminal.__getMessage);
    }
    delete addonTerminal.__socket;
}
exports.detach = detach;
function apply(terminalConstructor) {
    terminalConstructor.prototype.attach = function (socket, bidirectional, buffered) {
        attach(this, socket, bidirectional, buffered);
    };
    terminalConstructor.prototype.detach = function (socket) {
        detach(this, socket);
    };
}
exports.apply = apply;

//# sourceMappingURL=attach.js.map
