export function getHighlightedText(text: string) {
  const words = text.split(/\s+/);

  const highlightedText = words.map((word) =>
    word.startsWith('#') ? `<span style="color: blue;">${word}</span>` : word,
  );

  return highlightedText.join(' ');
}
