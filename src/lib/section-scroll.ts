export function getSectionTarget(tops: number[], heights: number[], y: number, viewport: number, maxScroll: number, direction: number) {
  const anchors = tops.map((top) => Math.min(top, maxScroll));
  const index = anchors.findIndex((top, i) => y >= top - 4 && (anchors[i + 1] === undefined || y < anchors[i + 1] - 4));
  if (index < 0) return null;
  const top = tops[index];
  const height = heights[index];
  if (top === undefined || height === undefined) return null;
  if (direction < 0) {
    const previous = tops[index - 1];
    if (previous === undefined || y > (anchors[index] ?? top) + 24) return null;
    return Math.min(maxScroll, Math.max(previous, top - viewport));
  }
  const next = anchors[index + 1];
  if (next === undefined || y + viewport < top + height - 4) return null;
  return next;
}