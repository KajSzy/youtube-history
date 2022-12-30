import { HistoryData } from "../HistoryData";

export const sortByViews = <T extends { views: number }>(a: T, b: T) =>
  b.views - a.views;

export const getEntryYear = (entry: HistoryData.Entry) =>
  new Date(entry.time).getFullYear().toString();

export const filterEntriesByChannel = (
  entries: HistoryData.Entry[],
  channel: string
) =>
  entries.filter((entry) => {
    if (entry.subtitles && entry.subtitles.length !== 0) {
      const channelName = entry.subtitles[0].name;
      return channelName === channel;
    }
    return false;
  });

export const filterEntriesByYear = (
  entries: HistoryData.Entry[],
  year?: string
) => {
  if (!year) {
    return entries;
  }
  return entries.filter((entry) => year === getEntryYear(entry));
};
