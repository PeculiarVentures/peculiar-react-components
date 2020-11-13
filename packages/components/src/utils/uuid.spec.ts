import { expect } from 'chai';
import uuid from './uuid';

describe('uuid', () => {
  it('should generate a valid UUID', () => {
    const value = uuid();
    const regExp = /[0-9a-f]{24}$/;

    expect(regExp.test(value)).to.be.true;
  });
});
