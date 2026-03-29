export function swithObjectValues<TUnion extends string | number, TReturns>(
  value: TUnion,
  mapping: Record<TUnion, TReturns>
) {
  return mapping[value];
}
