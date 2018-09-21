/**
 * Copyright (c) 2016 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { assert } from 'chai';
import { Terminal } from './Terminal';

describe('Terminal', () => {
  it('should apply addons with Terminal.applyAddon', () => {
    Terminal.applyAddon(require('../../../lib/addons/attach/attach'));
    // Test that addon was applied successfully, adding attach to Terminal's
    // prototype.
    assert.equal(typeof (<any>Terminal).prototype.attach, 'function');
  });
});
