import Faker from 'faker';
import regexp from './reg_exps';

describe('Fullname regexp', () => {
  function checkName(name) {
    const isValidName = regexp.fullName.test(name);

    expect(isValidName).toBe(true);
  }

  describe('Test with english names', () => {
    Faker.locale = 'en';

    for (let i = 0; i < 100; i += 1) {
      const randomName = `${Faker.name.firstName()} ${Faker.name.lastName()}`;

      it(
        `test name "${randomName}"`,
        checkName.bind(null, randomName),
      );
    }
  });

  describe('Test with russian names', () => {
    Faker.locale = 'ru';

    for (let i = 0; i < 100; i += 1) {
      const randomName = `${Faker.name.firstName()} ${Faker.name.lastName()}`;

      it(
        `test name "${randomName}"`,
        checkName.bind(null, randomName),
      );
    }
  });

  describe('Test with chinese names (Simplified/Traditional)', () => {
    Faker.locale = 'zh_CN';

    for (let i = 0; i < 100; i += 1) {
      const randomName = `${Faker.name.firstName()} ${Faker.name.lastName()}`;

      it(
        `test name "${randomName}"`,
        checkName.bind(null, randomName),
      );
    }

    Faker.locale = 'zh_TW';

    for (let i = 0; i < 100; i += 1) {
      const randomName = `${Faker.name.firstName()} ${Faker.name.lastName()}`;

      it(
        `test name "${randomName}"`,
        checkName.bind(null, randomName),
      );
    }
  });
});
