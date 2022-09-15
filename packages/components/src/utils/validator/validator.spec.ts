import faker from 'faker';
import { expect } from 'chai';
import validator from './validator';

const locales = ['en', 'uk', 'de', 'ru', 'zh_CN', 'es', 'fr'];

describe('validator', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  describe('email', () => {
    for (const locale of locales) {
      faker.locale = locale;

      it(`returns true for "${locale}" email`, () => {
        faker.locale = locale;
        const email = faker.fake('{{name.firstName}}@{{name.firstName}}.{{address.countryCode}}');
        const isValid = validator(email, ['email']);

        if (!isValid) {
          throw new Error(email);
        }

        expect(isValid).to.be.true;
      });
    }
  });

  describe('number', () => {
    it('returns true', () => {
      const number = faker.random.number();
      const isValid = validator(number, ['number']);

      if (!isValid) {
        throw new Error(number.toString());
      }

      expect(isValid).to.be.true;
    });
  });

  describe('url', () => {
    it('returns true', () => {
      const url = faker.internet.url();
      const isValid = validator(url, ['url']);

      if (!isValid) {
        throw new Error(url);
      }

      expect(isValid).to.be.true;
    });
  });

  describe('phone', () => {
    it('returns true', () => {
      const phone = faker.phone.phoneNumber('+############');
      const isValid = validator(phone, ['phone']);

      if (!isValid) {
        throw new Error(phone);
      }

      expect(isValid).to.be.true;
    });
  });

  describe('fullName', () => {
    for (const locale of locales) {
      faker.locale = locale;

      it(`returns true "${locale}"`, () => {
        const fullName = faker.fake('{{name.firstName}} {{name.lastName}}');
        const isValid = validator(fullName, ['fullName']);

        if (!isValid) {
          throw new Error(fullName);
        }

        expect(isValid).to.be.true;
      });
    }
  });

  describe('text', () => {
    for (const locale of locales) {
      faker.locale = locale;

      it(`returns true for word "${locale}"`, () => {
        const word = faker.lorem.word();
        const isValid = validator(word, ['text']);

        if (!isValid) {
          throw new Error(word);
        }

        expect(isValid).to.be.true;
      });

      it(`returns true for sentence "${locale}"`, () => {
        const sentence = faker.lorem.sentence();
        const isValid = validator(sentence, ['text']);

        if (!isValid) {
          throw new Error(sentence);
        }

        expect(isValid).to.be.true;
      });
    }
  });
});
