/**
 * Format nomor frame tetap, e.g. 1 -> "F01", 12 -> "F12"
 */
export function formatFrameNo(index) {
  const num = (index + 1).toString().padStart(2, '0');
  return `F${num}`;
}

/**
 * Label rapi untuk kategori karya
 */
export const CATEGORY_LABELS = {
  photo: 'Fotografi',
  video: 'Videografi',
  design: 'Desain Grafis',
  copy: 'Copywriting'
};

export function getCategoryLabel(category) {
  return CATEGORY_LABELS[category] || category;
}

/**
 * Format durasi video (detik -> mm:ss)
 */
export function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return '';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
