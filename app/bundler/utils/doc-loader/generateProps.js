function escapeCell(value) {
  return value.replace(/</g, '&lt;').replace(/\|/g, '&#124;');
}

function getDeprecatedInfo(type) {
  const deprecatedPropType = 'deprecated(PropTypes.';

  const indexStart = type.raw.indexOf(deprecatedPropType);

  if (indexStart !== -1) {
    return {
      propTypes: type.raw.substring(indexStart + deprecatedPropType.length, type.raw.indexOf(',')),
    };
  }

  return false;
}

function generatePropType(type) {
  switch (type.name) {
    case 'custom': {
      const deprecatedInfo = getDeprecatedInfo(type);

      if (deprecatedInfo !== false) {
        return generatePropType({
          name: deprecatedInfo.propTypes,
        });
      }

      return type.raw;
    }

    case 'shape':
      return `{${Object.keys(type.value)
        .map(subValue => (
          `${subValue}?: ${generatePropType(type.value[subValue])}`
        ))
        .join(', ')}}`;

    case 'union':
    case 'enum': {
      let values = type.value.map((type2) => {
        if (type.name === 'enum') {
          return escapeCell(type2.value);
        }

        return generatePropType(type2);
      });

      if (values.length < 5) {
        values = values.join(' &#124;<br> ');
      } else {
        values = values.join(', ');
      }

      return `${type.name}: ${values}<br>`;
    }

    case 'arrayOf':
      return generatePropType(type.value);

    default:
      return type.name.replace(/[|]/g, '&#124;');
  }
}

function getProp(props, key) {
  switch (key) {
    case 'classes':
      return {
        ...props[key],
        required: false,
      };
    default:
      return props[key];
  }
}

function generateProps(reactAPI) {
  let text = `
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|\n`;

  text = Object.keys(reactAPI.props).reduce((textProps, propRaw) => {
    const prop = getProp(reactAPI.props, propRaw);

    if (prop.parent && prop.parent.fileName.indexOf('node_modules') !== -1) {
      return textProps;
    }

    if (typeof prop.description === 'undefined') {
      throw new Error(`The "${propRaw}"" property is missing a description`);
    }

    if (prop.description === null) {
      return textProps;
    }

    const description = prop.description.replace(/\n/g, ' ');
    let defaultValue = '\u00a0';

    if (prop.defaultValue) {
      defaultValue = escapeCell(
        prop.defaultValue.value.replace(/\n/g, ''),
      );
    }

    if (prop.required) {
      propRaw = `${propRaw}\u00a0*`;
    }

    if (prop.type.name === 'custom') {
      if (getDeprecatedInfo(prop.type)) {
        propRaw = `~~${propRaw}~~`;
      }
    }

    textProps += `| ${propRaw} | ${generatePropType(prop.type)} | ${defaultValue} | ${description} |\n`;

    return textProps;
  }, text);

  return text;
}

module.exports = generateProps;
