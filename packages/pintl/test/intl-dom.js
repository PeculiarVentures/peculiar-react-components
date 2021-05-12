/* eslint-disable import/no-extraneous-dependencies */
const { assert } = require('chai');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

function insertScript(window, filePath) {
  let script = fs.readFileSync(path.join(__dirname, filePath), { encoding: 'utf-8' });
  const scriptEl = window.document.createElement('script');
  scriptEl.textContent = script;
  window.document.body.appendChild(scriptEl);
}

describe('IntlDOM', () => {
  describe('translateFragment', () => {
    const messages = {
      greetings: {
        general: 'You are welcome!',
        hello: 'Hello {arg}',
        hi: 'Hi {who}',
      },
      zoo: {
        banana: {
          message: 'I will give him {context} {fruit}{symbol}',
          fruit: {
            '2..10': 'bananas',
            '11+': 'small bananas',
            '-1-': 'what?',
            _: 'banana',
          },
          symbol: {
            '11+': '!!!!',
            '-1-': '???',
            _: '.',
          },
        },
      },
    };

    const window = new JSDOM('', { runScripts: 'dangerously' }).window;
    insertScript(window, '../node_modules/react/umd/react.production.min.js');
    insertScript(window, '../node_modules/prop-types/prop-types.min.js');
    insertScript(window, '../dist/index.umd.js');

    it('from milliseconds with default format', () => {
      window.document.body.innerHTML = '<div data-localization-id="greetings.general"></div>';
      window.PIntl.IntlDOM.translateFragment(messages, window.document.body);
      assert.deepEqual(window.document.body.innerHTML, '<div data-localization-id="greetings.general">You are welcome!</div>');
    });
  });
});
