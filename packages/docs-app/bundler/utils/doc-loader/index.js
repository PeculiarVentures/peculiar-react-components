const path = require('path');
const { readFileSync } = require('fs');
const reactDocgen = require('react-docgen');
const loaderUtils = require('loader-utils');
const { getContents } = require('./parseMarkdown');
const { generateProps } = require('./generateProps');

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
        reactAPI = reactDocgen.parse(src, reactDocgen.resolver.findAllComponentDefinitions);
      } catch (error) {
        throw error;
      }

      return generateProps(reactAPI[0]);
    }

    return content;
  });

  return `module.exports = ${JSON.stringify(input)}`;
};
