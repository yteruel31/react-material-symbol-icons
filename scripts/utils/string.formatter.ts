export const toCamelCase = (string) => {
  return string.replace(/^([A-Z])$|^[\s-_]+(\w)$/g, (match, p1, p2) =>
    p2 ? p2.toUpperCase() : p1.toLowerCase(),
  );
};
export const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);

  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
