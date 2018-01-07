const path = require('path');

module.exports = {
  entry: './lib/workers/CharAtlasWorker.js',
  output: {
    path: path.resolve(__dirname, 'demo/dist/workers'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  target: 'webworker'
};
