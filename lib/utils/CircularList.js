"use strict";
/**
 * Represents a circular list; a list with a maximum size that wraps around when push is called,
 * overriding values at the start of the list.
 * @module xterm/utils/CircularList
 * @license MIT
 */
var CircularList = (function () {
    function CircularList(maxLength) {
        this._array = new Array(maxLength);
        this._startIndex = 0;
        this._length = 0;
    }
    Object.defineProperty(CircularList.prototype, "maxLength", {
        get: function () {
            return this._array.length;
        },
        set: function (newMaxLength) {
            // Reconstruct array, starting at index 0. Only transfer values from the
            // indexes 0 to length.
            var newArray = new Array(newMaxLength);
            for (var i = 0; i < Math.min(newMaxLength, this.length); i++) {
                newArray[i] = this._array[this._getCyclicIndex(i)];
            }
            this._array = newArray;
            this._startIndex = 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CircularList.prototype, "length", {
        get: function () {
            return this._length;
        },
        set: function (newLength) {
            if (newLength > this._length) {
                for (var i = this._length; i < newLength; i++) {
                    this._array[i] = undefined;
                }
            }
            this._length = newLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CircularList.prototype, "forEach", {
        get: function () {
            return this._array.forEach;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the value at an index.
     *
     * Note that for performance reasons there is no bounds checking here, the index reference is
     * circular so this should always return a value and never throw.
     * @param index The index of the value to get.
     * @return The value corresponding to the index.
     */
    CircularList.prototype.get = function (index) {
        return this._array[this._getCyclicIndex(index)];
    };
    /**
     * Sets the value at an index.
     *
     * Note that for performance reasons there is no bounds checking here, the index reference is
     * circular so this should always return a value and never throw.
     * @param index The index to set.
     * @param value The value to set.
     */
    CircularList.prototype.set = function (index, value) {
        this._array[this._getCyclicIndex(index)] = value;
    };
    /**
     * Pushes a new value onto the list, wrapping around to the start of the array, overriding index 0
     * if the maximum length is reached.
     * @param value The value to push onto the list.
     */
    CircularList.prototype.push = function (value) {
        this._array[this._getCyclicIndex(this._length)] = value;
        if (this._length === this.maxLength) {
            this._startIndex++;
            if (this._startIndex === this.maxLength) {
                this._startIndex = 0;
            }
        }
        else {
            this._length++;
        }
    };
    /**
     * Removes and returns the last value on the list.
     * @return The popped value.
     */
    CircularList.prototype.pop = function () {
        return this._array[this._getCyclicIndex(this._length-- - 1)];
    };
    /**
     * Deletes and/or inserts items at a particular index (in that order). Unlike
     * Array.prototype.splice, this operation does not return the deleted items as a new array in
     * order to save creating a new array. Note that this operation may shift all values in the list
     * in the worst case.
     * @param start The index to delete and/or insert.
     * @param deleteCount The number of elements to delete.
     * @param items The items to insert.
     */
    CircularList.prototype.splice = function (start, deleteCount) {
        var items = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            items[_i - 2] = arguments[_i];
        }
        if (deleteCount) {
            for (var i = start; i < this._length - deleteCount; i++) {
                this._array[this._getCyclicIndex(i)] = this._array[this._getCyclicIndex(i + deleteCount)];
            }
            this._length -= deleteCount;
        }
        if (items && items.length) {
            for (var i = this._length - 1; i >= start; i--) {
                this._array[this._getCyclicIndex(i + items.length)] = this._array[this._getCyclicIndex(i)];
            }
            for (var i = 0; i < items.length; i++) {
                this._array[this._getCyclicIndex(start + i)] = items[i];
            }
            if (this._length + items.length > this.maxLength) {
                this._startIndex += (this._length + items.length) - this.maxLength;
                this._length = this.maxLength;
            }
            else {
                this._length += items.length;
            }
        }
    };
    /**
     * Trims a number of items from the start of the list.
     * @param count The number of items to remove.
     */
    CircularList.prototype.trimStart = function (count) {
        if (count > this._length) {
            count = this._length;
        }
        this._startIndex += count;
        this._length -= count;
    };
    CircularList.prototype.shiftElements = function (start, count, offset) {
        if (count <= 0) {
            return;
        }
        if (start < 0 || start >= this._length) {
            throw new Error('start argument out of range');
        }
        if (start + offset < 0) {
            throw new Error('Cannot shift elements in list beyond index 0');
        }
        if (offset > 0) {
            for (var i = count - 1; i >= 0; i--) {
                this.set(start + i + offset, this.get(start + i));
            }
            var expandListBy = (start + count + offset) - this._length;
            if (expandListBy > 0) {
                this._length += expandListBy;
                while (this._length > this.maxLength) {
                    this._length--;
                    this._startIndex++;
                }
            }
        }
        else {
            for (var i = 0; i < count; i++) {
                this.set(start + i + offset, this.get(start + i));
            }
        }
    };
    /**
     * Gets the cyclic index for the specified regular index. The cyclic index can then be used on the
     * backing array to get the element associated with the regular index.
     * @param index The regular index.
     * @returns The cyclic index.
     */
    CircularList.prototype._getCyclicIndex = function (index) {
        return (this._startIndex + index) % this.maxLength;
    };
    return CircularList;
}());
exports.CircularList = CircularList;
//# sourceMappingURL=CircularList.js.map