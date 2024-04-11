export const truncateString = (
  text: string | undefined,
  maxLength: number
): string => {
  if (text?.length && text?.length <= maxLength) {
    return text;
  }

  return `${text?.substring(0, maxLength)}...`;
};
