import path from 'path';
import { readFileSync } from 'fs';
import * as reactDocgen from 'react-docgen'; // eslint-disable-line
import loaderUtils from 'loader-utils'; // eslint-disable-line
import { getContents } from './parseMarkdown';
import generateProps from './generateProps';

const demoRegexp = /^"demo": "(.*)"/;
const propsRegexp = /^"props": "(.*)"/;

module.exports = function docLoader(input) {
  const contents = getContents(input);
  const sourceRoot = process.cwd();
  const { examplesDirPath } = loaderUtils.getOptions(this) || {};

  if (!examplesDirPath) {
    throw Error('"examplesDirPath" option is required');
  }

  input = contents.map((content) => {
    const demoMatch = content.match(demoRegexp);
    const propsMatch = content.match(propsRegexp);

    if (demoMatch) {
      const demoOptions = JSON.parse(`{${content}}`);
      const src = readFileSync(path.join(sourceRoot, examplesDirPath, demoOptions.demo), 'utf8');

      return {
        type: 'demo',
        data: src,
        options: demoOptions,
      };
    }

    if (propsMatch) {
      const propsOptions = JSON.parse(`{${content}}`);
      const src = readFileSync(propsOptions.props, 'utf8');

      let reactAPI;

      try {
        reactAPI = reactDocgen.parse(src);
      } catch (error) {
        throw error;
      }

      return generateProps(reactAPI);
    }

    return content;
  });

  return `module.exports = ${JSON.stringify(input)}`;
};
