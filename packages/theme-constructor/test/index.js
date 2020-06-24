const fs = require('fs-extra');
const path = require('path');
const assert = require('assert');
const themeConstructor = require('../');

describe('Theme constructor', () => {
  before(async () => {
    await fs.remove(path.join(__dirname, './out'));
  });

  after(async () => {
    await fs.remove(path.join(__dirname, './out'));
  });

  it('create default theme', async () => {
    await themeConstructor.createThemes([
      {
        name: 'default',
        entry: path.join(__dirname, './assets/index.sss'),
        out: path.join(__dirname, './out'),
        options: {},
        minify: false,
      },
    ]);

    const outFile = await fs.readFile(path.join(__dirname, './out/default.css'), 'utf8');
    const expectedFile = await fs.readFile(path.join(__dirname, './expected/default.css'), 'utf8');

    assert.equal(expectedFile, outFile);
  });

  it('create theme with options', async () => {
    await themeConstructor.createThemes([
      {
        name: 'options',
        entry: path.join(__dirname, './assets/index.sss'),
        out: path.join(__dirname, './out'),
        options: {
          palette: {
            primary: '#3D7DFF',
            secondary: '#FFC200',
            black: '#222D47',
            dark_grey: '#95A0BA',
            grey: '#CBCFD7',
            light_grey: '#F5F6FA',
            success: '#00D093',
            wrong: '#F12727',
            white: '#FFFFFF',
          },
          variables: {
            borderRadius: '4px',
          },
        },
        minify: false,
      },
    ]);

    const outFile = await fs.readFile(path.join(__dirname, './out/options.css'), 'utf8');
    const expectedFile = await fs.readFile(path.join(__dirname, './expected/options.css'), 'utf8');

    assert.equal(expectedFile, outFile);
  });

  it('create multiple themes with options', async () => {
    await themeConstructor.createThemes([
      {
        name: 'multiple1',
        entry: path.join(__dirname, './assets/index.sss'),
        out: path.join(__dirname, './out'),
        options: {
          palette: {
            primary: '#3D7DFF',
            black: '#222D47',
            grey: '#CBCFD7',
            light_grey: '#F5F6FA',
            success: '#00D093',
            wrong: '#F12727',
            white: '#FFFFFF',
          },
        },
        minify: false,
      },
      {
        name: 'multiple2',
        entry: path.join(__dirname, './assets/index.sss'),
        out: path.join(__dirname, './out'),
        options: {
          palette: {
            primary: '#ec06e5',
            black: '#000000',
            grey: '#CBCFD7',
            light_grey: '#F5F6FA',
            success: '#06ec0d',
            wrong: '#d00619',
            white: '#FFFFFF',
          },
        },
        minify: false,
      },
    ]);

    const outFile1 = await fs.readFile(path.join(__dirname, './out/multiple1.css'), 'utf8');
    const outFile2 = await fs.readFile(path.join(__dirname, './out/multiple2.css'), 'utf8');
    const expectedFile1 = await fs.readFile(path.join(__dirname, './expected/multiple1.css'), 'utf8');
    const expectedFile2 = await fs.readFile(path.join(__dirname, './expected/multiple2.css'), 'utf8');

    assert.equal(expectedFile1, outFile1);
    assert.equal(expectedFile2, outFile2);
  });

  it('with empty themes', async () => {
    try {
      await themeConstructor.createThemes([]);
    } catch (error) {
      assert.equal(error.message, '`themes` array must not be empty!');
    }
  });

  it('with not correct path to entry', async () => {
    try {
      await themeConstructor.createThemes([
        {
          name: 'not_correct',
          entry: path.join(__dirname, './assets/main.sss'),
          out: path.join(__dirname, './out'),
          options: {
            palette: {
              primary: '#3D7DFF',
              secondary: '#FFC200',
              black: '#222D47',
              dark_grey: '#95A0BA',
              grey: '#CBCFD7',
              light_grey: '#F5F6FA',
              success: '#00D093',
              wrong: '#F12727',
              white: '#FFFFFF',
            },
          },
        },
      ]);
    } catch (error) {
      assert.equal(
        error.message.indexOf('no such file or directory') !== -1,
        true,
      );
    }
  });

  it('with empty path to out', async () => {
    try {
      await themeConstructor.createThemes([
        {
          name: 'not_correct',
          entry: path.join(__dirname, './assets/index.sss'),
          out: '',
          options: {
            palette: {
              primary: '#3D7DFF',
              secondary: '#FFC200',
              black: '#222D47',
              dark_grey: '#95A0BA',
              grey: '#CBCFD7',
              light_grey: '#F5F6FA',
              success: '#00D093',
              wrong: '#F12727',
              white: '#FFFFFF',
            },
          },
        },
      ]);
    } catch (error) {
      assert.equal(
        error.message.indexOf('read-only file system, open \'/not_correct.css\'') !== -1,
        true,
      );
    }
  });

  it('with empty options', async () => {
    try {
      await themeConstructor.createThemes([
        {
          name: 'not_correct',
          entry: path.join(__dirname, './assets/index.sss'),
          out: path.join(__dirname, './out'),
        },
      ]);
    } catch (error) {
      assert.equal(error.message, 'Cannot read property \'palette\' of undefined');
    }
  });
});
