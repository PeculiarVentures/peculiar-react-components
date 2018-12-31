const uuid = (
  m = Math,
  d = Date,
  h: number = 16,
  s = (s: any) => m.floor(s).toString(h),
): string => (
  s(d.now() / 1000) + (' ' as any).repeat(h)
    .replace(/./g, () => s(m.random() * h))
);

export default uuid;
