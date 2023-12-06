export const getNoteTags = (text: string) => {
  const tagRegex = /#(\w+)/g;
  const matches = text.match(tagRegex);
  return matches ? matches.map((match) => match.substring(1)) : [];
};
