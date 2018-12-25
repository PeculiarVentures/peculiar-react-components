import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import withWrapper from '../../utils/with_wrapper';
import { withOptions } from '@storybook/addon-options';
import { themes } from '@storybook/components';
import { makeDecorator } from '@storybook/addons';

addDecorator(withOptions({
  theme: themes.dark,
}));
addDecorator(makeDecorator({
  name: 'WhitePlayGround',
  parameterName: 'wrapper',
  wrapper: (storyFn, context) => (
    <div style={{
      background: themes.normal.mainBackground,
      width: '100%',
      height: '100%',
      position: 'relative',
    }}>
      {storyFn(context)}
    </div>
  )
}));

function loadStories() {
  global.withWrapper = withWrapper;

  if (process.env.STORYBOOK_FILE) {
    require(process.env.STORYBOOK_FILE);

    return true;
  }
  if (process.env.STORYBOOK_DIR) {
    let requireContext;
    requireContext = require.context(process.env.STORYBOOK_DIR, true, /[^.]*\.story\.tsx$/);
    const files = requireContext.keys();
    for (let i = 0; i < files.length; i += 1) {
      const parseResult = /containers\/([^/]+)/.exec(files[i]);
      if (parseResult) {
        global.currentContainerName = parseResult[1];
      } else {
        global.currentContainerName = null;
      }
      requireContext(files[i]).default;
    }

    return true;
  }

  throw new Error('STORYBOOK_DIR wasn\'t specified');
}

configure(loadStories, module);
