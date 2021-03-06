const { join } = require('path');

const test = require('ava');
const del = require('del');

const { compile } = require('../helpers/unit');

const outputPath = join(__dirname, '../output/manifest-location');

test.after(() => del(outputPath));

test('relative path', async (t) => {
  const config = {
    context: __dirname,
    entry: '../fixtures/file.js',
    output: { path: join(outputPath, 'relative') }
  };

  const { manifest } = await compile(config, t, {
    fileName: 'webpack.manifest.js'
  });

  t.deepEqual(manifest, { 'main.js': 'main.js' });
});

test('absolute path', async (t) => {
  const config = {
    context: __dirname,
    entry: '../fixtures/file.js',
    output: { path: join(outputPath, 'absolute') }
  };

  const { manifest } = await compile(config, t, {
    fileName: join(outputPath, 'absolute/webpack.manifest.js')
  });

  t.deepEqual(manifest, { 'main.js': 'main.js' });
});
