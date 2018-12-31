import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { ProgressiveImage } from './index';

const props: any = {
  regular: () => ({
    // tslint:disable-next-line
    src: text('Src (src)', 'https://cdn-images-1.medium.com/max/1600/1*BY_IQj3mOIPXbrUUSZ6wGQ.jpeg'),
    // tslint:disable-next-line
    placeholder: text('Placeholder (placeholder)', 'https://cdn-images-1.medium.com/freeze/max/60/1*BY_IQj3mOIPXbrUUSZ6wGQ.jpeg?q=20'),
  }),
};

storiesOf('ProgressiveImage', module)
  .add('default', () => {
    const regularProps = props.regular();

    return (
      <ProgressiveImage {...regularProps}>
        {(src, loading) => ( // tslint:disable-line
          <img
            src={src}
            // tslint:disable-next-line
            style={{
              display: 'block',
              width: 200,
              filter: loading ? 'blur(5px)' : 'none',
            }}
          />
        )}
      </ProgressiveImage>
    );
  });
