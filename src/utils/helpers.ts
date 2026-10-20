export function stringToColor(str?: string) {
  if (!str) return '#333333';
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).slice(-2);
  }
  return color;
}

/**
 * Distinct colors for map tracks: the dark, saturated subset of Sasha Trubetskoy's
 * "20 distinct colors" (readable as lines on Esri ocean tiles), ordered so that
 * neighbors contrast strongly. Assigned by position, so pass tracks in display order;
 * beyond the palette, golden-angle hues are used.
 */
const TRACK_PALETTE = ['#e6194b', '#3cb44b', '#911eb4', '#f58231', '#000075', '#f032e6', '#808000', '#469990', '#9a6324', '#4363d8', '#800000', '#000000', '#b8860b'];

export function trackColor(index: number): string {
  const color = TRACK_PALETTE.at(index);
  if (color && index >= 0) return color;
  let hue = (index * 137.508) % 360;
  if (hue > 175 && hue < 235) hue = (hue + 70) % 360;
  return `hsl(${Math.round(hue)} 65% 35%)`;
}

// format just the time part (HH:mm)
export const formatTime = (d: Date) => d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');

// format a date range, showing time unless the event is all-day
export const formatRange = (start: Date, end?: Date, allDay?: boolean, locale?: string, listYear?: string) => {
  const startFormat = new Intl.DateTimeFormat(locale ?? 'en', { year: listYear && start.getFullYear() === Number(listYear) ? undefined : 'numeric', month: 'long', day: 'numeric' });
  const startLabel = startFormat.format(start);
  const t = allDay ? '' : ', ' + formatTime(start);

  if (!end || start.getTime() === end.getTime()) return startLabel + t;

  const endFormat = new Intl.DateTimeFormat(locale ?? 'en', { year: listYear && end.getFullYear() === Number(listYear) ? undefined : 'numeric', month: 'long', day: 'numeric' });
  const endLabel = endFormat.format(end);

  // same calendar day → "August 13, 2026, 15:00 - 18:00"
  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth() && start.getDate() === end.getDate()) {
    return allDay ? startLabel : startLabel + t + ' - ' + formatTime(end);
  }

  // different days → "August 13, 2026, 15:00 - August 16, 2026, 18:00"
  return allDay ? startLabel + ' - ' + endLabel : startLabel + t + ' - ' + endLabel + ', ' + formatTime(end);
};
