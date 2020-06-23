import faker from 'faker';
import regexp from './reg_exps';

describe('regExps', () => {
  describe('email', () => {
    for (let i = 0; i < 100; i += 1) {
      const randomEmail = faker.internet.email();

      it(`"${randomEmail}" email`, () => {
        const isValid = regexp.email.test(randomEmail);

        expect(isValid).toBe(true);
      });
    }
  });

  describe('fullName', () => {
    const locales = ['en', 'ru', 'zh_CN', 'zh_TW'];

    locales.forEach((locale) => {
      describe(`"${locale}" locale`, () => {
        faker.locale = locale;

        for (let i = 0; i < 100; i += 1) {
          const randomName = `${faker.name.firstName()} ${faker.name.lastName()}`;

          it(`"${randomName}" name`, () => {
            const isValid = regexp.fullName.test(randomName);

            expect(isValid).toBe(true);
          });
        }
      });
    });
  });
});
