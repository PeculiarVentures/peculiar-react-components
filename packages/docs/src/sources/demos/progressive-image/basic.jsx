import React from 'react';
import { ProgressiveImage } from 'lib-react-components';

export default function Usage() {
  return (
    <ProgressiveImage
      src="https://cdn-images-1.medium.com/max/1600/1*BY_IQj3mOIPXbrUUSZ6wGQ.jpeg"
      placeholder="https://cdn-images-1.medium.com/freeze/max/60/1*BY_IQj3mOIPXbrUUSZ6wGQ.jpeg?q=20"
    >
      {(src, loading) => (
        <img
          src={src}
          style={{
            display: 'block',
            maxWidth: 400,
            width: '100%',
            filter: loading ? 'blur(5px)' : 'none',
          }}
        />
      )}
    </ProgressiveImage>
  );
}
