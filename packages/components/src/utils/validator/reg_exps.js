/**
 * Basic RegExps
 * @type {{
 *  password: RegExp,
 *  name: RegExp,
 *  fullName: RegExp,
 *  email: RegExp,
 *  phone: RegExp,
 *  number: RegExp,
 *  text: RegExp,
 *  letters: RegExp,
 *  date: RegExp,
 *  cert: RegExp,
 *  hex: RegExp,
 *  base64: RegExp,
 *  objectID: RegExp
 * }}
 */

// {emotionsСharacterRanges} - regex is a famous collection of emotions in forums. This is the most complete collection I've come across. You can test it here:  https://www.regextester.com/106421
const emotionsСharacterRanges = '\u00a9\u00ae\u2000-\u3300\ud83c\ud000-\udfff\ud83d\ud000-\udfff\ud83e\ud000-\udfff';
// {nonLetterСharacter} - collection of non-symbolic values. Collected based on the Unicode table https://unicode-table.com/en/#control-character
const nonLetterСharacter = '\u0021-\u0040\u005B-\u0060\u007B-\u00BF\u02B9-\u0362\u1FFD-\u2BFF';
// {allowedNameСharacter} - a line where you can add characters that are not letters but are valid
// in letter expressions. Created to avoid adding complex exceptions.
const allowedNameСharacter = "'";
const nameRegExp = new RegExp(`^(([^${nonLetterСharacter}${emotionsСharacterRanges}\\s]|${allowedNameСharacter})+(\\s|-))*([^${nonLetterСharacter}${emotionsСharacterRanges}\\s]|${allowedNameСharacter})+$`, 'i');
const lettersRegExp = new RegExp(`^([^${nonLetterСharacter}${emotionsСharacterRanges}\\s'])+$`, 'i');

const regExps = {
  password: /^^(?=.*[0-9])(?=.*[a-zа-я])(?=.*[A-ZА-Я])[A-zА-я0-9!@#$%^&*()-=§±|'";:~,.<>/?]{8,}$/,
  fullName: nameRegExp,
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line
  phone: /^(\+?(\d){12})$/,
  number: /^\d+$/,
  text: /^.+$/,
  letters: lettersRegExp,
  date: /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/, // eslint-disable-line
  cert: /(-----(BEGIN|END) CERTIFICATE( REQUEST|)-----|\r|\n)/,
  hex: /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/,
  base64: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/, // eslint-disable-line
  objectID: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
  url: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, // eslint-disable-line
};

export default regExps;
