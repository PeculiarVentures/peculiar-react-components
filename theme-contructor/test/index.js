const fs = require('fs-extra');
const path = require('path');
const assert = require('assert');
const themeConstructor = require('../');

describe('Theme constructor', () => {
  before(async () => {
    await fs.remove(path.join(__dirname, './expected'));
  });

  it('create default theme', async () => {
    await themeConstructor.createThemes([
      {
        name: 'df',
        entry: path.join(__dirname, './assets/index.sss'),
        out: path.join(__dirname, './expected'),
        options: {},
      },
    ]);

    const data = await fs.readFile(path.join(__dirname, './expected/df.css'), 'utf8');

    assert.equal(
      'svg.fill_primary [data-fill]{fill:#3d7dff;fill:var(--primary,#3d7dff)}svg.fill_secondary [data-fill]{fill:#ffc200;fill:var(--secondary,#ffc200)}svg.fill_black [data-fill]{fill:#222d47;fill:var(--black,#222d47)}svg.fill_dark_grey [data-fill]{fill:#5b647d;fill:var(--dark_grey,#5b647d)}svg.fill_grey [data-fill]{fill:#cbcfd7;fill:var(--grey,#cbcfd7)}svg.fill_light_grey [data-fill]{fill:#f5f6fa;fill:var(--light_grey,#f5f6fa)}svg.fill_success [data-fill]{fill:#00d093;fill:var(--success,#00d093)}svg.fill_wrong [data-fill]{fill:#f12727;fill:var(--wrong,#f12727)}svg.fill_white [data-fill]{fill:#fff;fill:var(--white,#fff)}.border-radius{border-radius:3px}.transform{color:hsla(0,0%,80%,.1)}.lightness{background:#b3b3b3}',
      data,
    );
  });

  it('create single theme', async () => {
    await themeConstructor.createThemes([
      {
        name: 'if',
        entry: path.join(__dirname, './assets/index.sss'),
        out: path.join(__dirname, './expected'),
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
      },
    ]);

    const data = await fs.readFile(path.join(__dirname, './expected/if.css'), 'utf8');

    assert.equal(
      'svg.fill_primary [data-fill]{fill:#3d7dff;fill:var(--primary,#3d7dff)}svg.fill_secondary [data-fill]{fill:#ffc200;fill:var(--secondary,#ffc200)}svg.fill_black [data-fill]{fill:#222d47;fill:var(--black,#222d47)}svg.fill_dark_grey [data-fill]{fill:#95a0ba;fill:var(--dark_grey,#95a0ba)}svg.fill_grey [data-fill]{fill:#cbcfd7;fill:var(--grey,#cbcfd7)}svg.fill_light_grey [data-fill]{fill:#f5f6fa;fill:var(--light_grey,#f5f6fa)}svg.fill_success [data-fill]{fill:#00d093;fill:var(--success,#00d093)}svg.fill_wrong [data-fill]{fill:#f12727;fill:var(--wrong,#f12727)}svg.fill_white [data-fill]{fill:#fff;fill:var(--white,#fff)}.border-radius{border-radius:4px}.transform{color:hsla(0,0%,80%,.1)}.lightness{background:#b3b3b3}',
      data,
    );
  });

  it('create multiple themes', async () => {
    await themeConstructor.createThemes([
      {
        name: 'hk',
        entry: path.join(__dirname, './assets/index.sss'),
        out: path.join(__dirname, './expected'),
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
      },
      {
        name: 'ff',
        entry: path.join(__dirname, './assets/index.sss'),
        out: path.join(__dirname, './expected'),
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
      },
    ]);

    const dataHk = await fs.readFile(path.join(__dirname, './expected/hk.css'), 'utf8');
    const dataFf = await fs.readFile(path.join(__dirname, './expected/ff.css'), 'utf8');

    assert.equal(
      'svg.fill_primary [data-fill]{fill:#3d7dff;fill:var(--primary,#3d7dff)}svg.fill_secondary [data-fill]{fill:#ffc200;fill:var(--secondary,#ffc200)}svg.fill_black [data-fill]{fill:#222d47;fill:var(--black,#222d47)}svg.fill_dark_grey [data-fill]{fill:#5b647d;fill:var(--dark_grey,#5b647d)}svg.fill_grey [data-fill]{fill:#cbcfd7;fill:var(--grey,#cbcfd7)}svg.fill_light_grey [data-fill]{fill:#f5f6fa;fill:var(--light_grey,#f5f6fa)}svg.fill_success [data-fill]{fill:#00d093;fill:var(--success,#00d093)}svg.fill_wrong [data-fill]{fill:#f12727;fill:var(--wrong,#f12727)}svg.fill_white [data-fill]{fill:#fff;fill:var(--white,#fff)}.border-radius{border-radius:3px}.transform{color:hsla(0,0%,80%,.1)}.lightness{background:#b3b3b3}',
      dataHk,
    );
    assert.equal(
      'svg.fill_primary [data-fill]{fill:#ec06e5;fill:var(--primary,#ec06e5)}svg.fill_secondary [data-fill]{fill:#ffc200;fill:var(--secondary,#ffc200)}svg.fill_black [data-fill]{fill:#000;fill:var(--black,#000)}svg.fill_dark_grey [data-fill]{fill:#5b647d;fill:var(--dark_grey,#5b647d)}svg.fill_grey [data-fill]{fill:#cbcfd7;fill:var(--grey,#cbcfd7)}svg.fill_light_grey [data-fill]{fill:#f5f6fa;fill:var(--light_grey,#f5f6fa)}svg.fill_success [data-fill]{fill:#06ec0d;fill:var(--success,#06ec0d)}svg.fill_wrong [data-fill]{fill:#d00619;fill:var(--wrong,#d00619)}svg.fill_white [data-fill]{fill:#fff;fill:var(--white,#fff)}.border-radius{border-radius:3px}.transform{color:hsla(0,0%,80%,.1)}.lightness{background:#b3b3b3}',
      dataFf,
    );
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
          name: 'if',
          entry: path.join(__dirname, './assets/main.sss'),
          out: path.join(__dirname, './expected'),
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
          name: 'if',
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
        error.message.indexOf('permission denied, open \'/if.css\'') !== -1,
        true,
      );
    }
  });

  it('with empty options', async () => {
    try {
      await themeConstructor.createThemes([
        {
          name: 'if',
          entry: path.join(__dirname, './assets/index.sss'),
          out: path.join(__dirname, './expected'),
        },
      ]);
    } catch (error) {
      assert.equal(error.message, 'Cannot read property \'palette\' of undefined');
    }
  });

  after(async () => {
    await fs.remove(path.join(__dirname, './expected'));
  });
});
