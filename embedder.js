export function fakeEmbedding(text) {
  return Array.from({ length: 1024 }, (_, i) => {
    return ((text.length + i) % 10) + 1;
  });
}