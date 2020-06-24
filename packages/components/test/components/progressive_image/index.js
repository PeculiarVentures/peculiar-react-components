import React from 'react';
import assert from 'assert';
import { shallowWithContext } from '../../utils/with_context';
import { ProgressiveImage } from '../../../';

describe('<ProgressiveImage />', () => {
  const imageSrc = 'https://cdn-images-1.medium.com/max/1600/1*BY_IQj3mOIPXbrUUSZ6wGQ.jpeg';
  const imagePlaceholder = 'https://cdn-images-1.medium.com/freeze/max/60/1*BY_IQj3mOIPXbrUUSZ6wGQ.jpeg?q=20';

  it('render component', () => {
    const wrapper = shallowWithContext(
      <ProgressiveImage
        src={imageSrc}
        placeholder={imagePlaceholder}
      >
        {src => (
          <img
            src={src}
          />
        )}
      </ProgressiveImage>,
    );

    assert.equal(
      wrapper.find('img').prop('src'),
      imagePlaceholder,
    );
    wrapper.setState({
      image: imageSrc,
    });
    assert.equal(
      wrapper.find('img').prop('src'),
      imageSrc,
    );
  });
});
