import { expect } from 'chai';
import uuid from './index';

describe('uuid', () => {
  it('expect generate with basic parameters', () => {
    const result = uuid();

    expect(result.length).equal(24);
    expect(typeof result).equal('string');
  });

  it('expect different uuids generated with current time', () => {
    const uuid1 = uuid();
    const uuid2 = uuid();

    expect(uuid1).not.equal(uuid2);
  });

  it('expect change uuid lenght after change radix value', () => {
    const result = uuid(undefined, undefined, 20);

    expect(result.length).equal(28);
    expect(typeof result).equal('string');
  });
});
