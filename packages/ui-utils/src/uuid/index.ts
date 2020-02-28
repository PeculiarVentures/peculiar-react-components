const uuid = (
  m = Math,
  d = Date,
  h = 16,
  s = (n: number) => m.floor(n).toString(h),
) => (
  `${s(d.now() / 1000)}${' '.repeat(h).replace(/./g, () => s(m.random() * h))}`
);

export default uuid;
