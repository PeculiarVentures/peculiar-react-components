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
const regExps = {
  password: /^^(?=.*[0-9])(?=.*[a-zа-я])(?=.*[A-ZА-Я])[A-zА-я0-9!@#$%^&*()-=§±|'";:~,.<>/?]{8,}$/,
  name: /^([a-zа-я']+(\s|-))*[a-zа-я']+$/i,
  fullName: /^([a-zа-я']+(\s|-))*[a-zа-я']+$/i,
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line
  phone: /^(\+?(\d){12})$/,
  number: /^\d+$/,
  text: /^.+$/,
  letters: /^[A-zА-я ]+$/,
  date: /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/, // eslint-disable-line
  cert: /(-----(BEGIN|END) CERTIFICATE( REQUEST|)-----|\r|\n)/,
  hex: /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/,
  base64: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/, // eslint-disable-line
  objectID: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
  url: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, // eslint-disable-line
};

export default regExps;
