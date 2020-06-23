import React from 'react';
import { ContentLoader } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <ContentLoader
        width={500}
        height={70}
        color="primary"
        style={{
          marginBottom: 40,
        }}
      >
        <rect x="0" y="0" rx="3" ry="3" width="70" height="10" />
        <rect x="80" y="0" rx="3" ry="3" width="100" height="10" />
        <rect x="190" y="0" rx="3" ry="3" width="10" height="10" />
        <rect x="15" y="20" rx="3" ry="3" width="130" height="10" />
        <rect x="155" y="20" rx="3" ry="3" width="130" height="10" />
        <rect x="15" y="40" rx="3" ry="3" width="90" height="10" />
        <rect x="115" y="40" rx="3" ry="3" width="60" height="10" />
        <rect x="185" y="40" rx="3" ry="3" width="60" height="10" />
        <rect x="0" y="60" rx="3" ry="3" width="30" height="10" />
      </ContentLoader>
      <ContentLoader
        width={500}
        height={60}
        color="secondary"
      >
        <circle cx="30" cy="30" r="30" />
        <rect x="75" y="13" rx="4" ry="4" width="100" height="13" />
        <rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
      </ContentLoader>
    </div>
  );
}
