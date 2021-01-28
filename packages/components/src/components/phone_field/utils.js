import rawCountries from './raw_countries';

export const getMask = (prefix, dialCode, predefinedMask, defaultMask) => {
  if (!predefinedMask) {
    return `${prefix}${''.padEnd(dialCode.length, '.')} ${defaultMask}`;
  }

  return `${prefix}${''.padEnd(dialCode.length, '.')} ${predefinedMask}`;
};

const prefix = '+';

export const countries = rawCountries.map((country) => {
  const countryItem = {
    name: country[0],
    regions: country[1],
    code: country[2].toUpperCase(),
    countryCode: country[3],
    dialCode: `${prefix}${country[3]}`,
    format: getMask(prefix, country[3], country[4], '... ... ... ... ..'),
  };

  if (country[6]) {
    countryItem.ariaCodes = country[6].map(areaCode => (
      `${prefix}${country[3]}${areaCode}`
    ));
  }

  return countryItem;
});

export const getCountryByNumber = (value) => {
  if (!value) {
    return null;
  }

  value = value.replace(/\s/g, '');

  let countryMatchedByAriaCode;
  const countriesMatchedByDialCode = countries.filter((c) => {
    const isMatchedByDialCode = value.startsWith(c.dialCode);

    if (isMatchedByDialCode && c.ariaCodes) {
      const isMatchedByAriaCode = c.ariaCodes.find(a => value.startsWith(a));

      if (isMatchedByAriaCode) {
        countryMatchedByAriaCode = c;
      }
    }

    return isMatchedByDialCode;
  });

  if (countryMatchedByAriaCode) {
    return countryMatchedByAriaCode;
  }

  if (countriesMatchedByDialCode.length) {
    return countriesMatchedByDialCode[1];
  }

  return null;
};

export const formatNumber = (text, country) => {
  if (!country) {
    return text;
  }

  text = text.replace(/\D/g, '');

  const { format } = country;
  const pattern = format;

  if (!text || text.length === 0) {
    return prefix;
  }

  // for all strings with length less than 3, just return it (1, 2 etc.)
  // also return the same text if the selected country has no fixed format
  if ((text && text.length < 2) || !pattern) {
    return prefix + text;
  }

  const formattedObject = pattern.split('').reduce((acc, character) => {
    if (acc.remainingText.length === 0) {
      return acc;
    }

    if (character !== '.') {
      return {
        formattedText: acc.formattedText + character,
        remainingText: acc.remainingText,
      };
    }

    const [head, ...tail] = acc.remainingText;

    return {
      formattedText: acc.formattedText + head,
      remainingText: tail,
    };
  }, {
    formattedText: '',
    remainingText: text.split(''),
  });

  return formattedObject.formattedText;
};
