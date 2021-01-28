export const formatNumber = (text, country) => {
  if (!country) {
    return text;
  }

  text = text.replace(/\D/g, '');

  const { format } = country;
  const pattern = format;

  if (!text || text.length === 0) {
    return '+';
  }

  // for all strings with length less than 3, just return it (1, 2 etc.)
  // also return the same text if the selected country has no fixed format
  if ((text && text.length < 2) || !pattern) {
    return `+${text}`;
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

export default formatNumber;
