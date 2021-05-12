/* eslint-disable import/no-extraneous-dependencies */
const { assert } = require('chai');
const { IntlCore, IntlWrapper } = require('../dist/index.cjs');

describe('Intl', () => {
  describe('Core', () => {
    describe('getText', () => {
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

      it('get message by path', () => {
        assert.deepEqual(
          IntlCore.getText(messages, false, 'greetings.general'),
          'You are welcome!',
        );
      });

      it('replace standard variable', () => {
        assert.deepEqual(
          IntlCore.getText(messages, false, 'greetings.hello', 'man'),
          'Hello man',
        );
      });

      it('pick message by context', () => {
        assert.deepEqual(
          IntlCore.getText(messages, false, 'greetings', null, 'general'),
          'You are welcome!',
        );
      });

      it('replace custom variable', () => {
        assert.deepEqual(
          IntlCore.getText(messages, false, 'greetings', { who: 'man' }, 'hi'),
          'Hi man',
        );
      });

      it('choose message variable value by numeric context', () => {
        assert.deepEqual(
          IntlCore.getText(messages, false, 'zoo.banana', null, 0),
          'I will give him 0 banana.',
        );
        assert.deepEqual(
          IntlCore.getText(messages, false, 'zoo.banana', null, 3),
          'I will give him 3 bananas.',
        );
        assert.deepEqual(
          IntlCore.getText(messages, false, 'zoo.banana', null, 13),
          'I will give him 13 small bananas!!!!',
        );
        assert.deepEqual(
          IntlCore.getText(messages, false, 'zoo.banana', null, -13),
          'I will give him -13 what????',
        );
      });

      it('inShell', () => {
        assert.deepEqual(
          IntlCore.getText(messages, true, 'greetings', null, 'hi'),
          '{{greetings.hi}}',
        );
      });
    });

    describe('getName', () => {
      it('Name first', () => {
        assert.deepEqual(IntlCore.getName('en', 'Bill', 'Gates'), 'Bill Gates');
      });
      it('Surname first', () => {
        assert.deepEqual(IntlCore.getName('ru', 'Bill', 'Gates'), 'Gates Bill');
      });
    });

    describe('getDate', () => {
      it('from milliseconds with default format', () => {
        assert.deepEqual(IntlCore.getDate('en', 1517524645540), '2/2/2018, 12:37:25 AM');
      });

      it('from ISO string with default format', () => {
        assert.deepEqual(IntlCore.getDate('en', '2018-02-01T22:42:02.807Z'), '2/2/2018, 12:42:02 AM');
      });

      it('from ISO string with default format, another locale', () => {
        assert.deepEqual(IntlCore.getDate('ru', '2018-02-01T22:42:02.807Z'), '2018-2-2 00:42:02');
      });

      it('custom format', () => {
        assert.deepEqual(IntlCore.getDate('en', 1517524645540, { era: 'short' }), '2 2, 2018 AD');
      });
    });
  });

  describe('Wrapper', () => {
    it('shared context', () => {
      const wrapper = new IntlWrapper(IntlWrapper.defaultProps);
      const context = wrapper.getChildContext();
      assert.property(context, 'intl');
      assert.isFunction(context.intl.getText);
      assert.isFunction(context.intl.getName);
      assert.isFunction(context.intl.getDate);
      assert.equal(context.intl.lang, IntlWrapper.defaultProps.lang);
    });
  });
});
