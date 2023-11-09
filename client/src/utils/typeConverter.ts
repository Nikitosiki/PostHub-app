export const nullToUndefined = <T>(value: T | null): T | undefined => {
  return value === null ? undefined : value;
};
