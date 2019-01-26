import * as React from 'react';
import { mount } from 'enzyme';
import { ProgressiveImage } from './index';

describe('<ProgressiveImage />', () => {
  it('render without errors', () => {
    const wrapper = mount(
      <ProgressiveImage
        src="https://cdn-images-1.medium.com/max/1600/1*BY_IQj3mOIPXbrUUSZ6wGQ.jpeg"
        placeholder="https://cdn-images-1.medium.com/freeze/max/60/1*BY_IQj3mOIPXbrUUSZ6wGQ.jpeg?q=20" // tslint:disable-line
      >
        {(src, loading) => ( // tslint:disable-line
          <img
            src={src}
            style={{ // tslint:disable-line
              display: 'block',
              maxWidth: 400,
              width: '100%',
              filter: loading ? 'blur(5px)' : 'none',
            }}
          />
        )}
      </ProgressiveImage>,
    );
    const rootNode = wrapper.find('img');

    expect(rootNode.exists()).toBe(true);
  });
});
