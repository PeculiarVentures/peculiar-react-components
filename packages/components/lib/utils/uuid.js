export default function uuid(m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) { // eslint-disable-line
  return s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
}
