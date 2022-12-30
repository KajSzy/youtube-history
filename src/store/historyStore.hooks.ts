import { useMemo } from "react";
import { HistoryData } from "../HistoryData";
import {
  useHistoryEntries,
  useSelectedChannel,
  useSelectedYear,
} from "./historyStore";
import {
  filterEntriesByChannel,
  filterEntriesByYear,
  getEntryYear,
  sortByViews,
} from "./historyStore.utils";

export const useHistoryChannels = () => {
  const entries = useHistoryEntries();
  const year = useSelectedYear();

  return useMemo(() => {
    const channels = new Map<string, { title: string; views: number }>();

    filterEntriesByYear(entries, year).forEach((entry) => {
      if (entry.subtitles && entry.subtitles.length !== 0) {
        const channelName = entry.subtitles[0].name;
        const views = channels.get(channelName)?.views ?? 0;
        channels.set(channelName, { title: channelName, views: views + 1 });
      }
    });

    return Array.from(channels.values())
      .sort(sortByViews)
      .filter((c) => c.views > 10);
  }, [entries, year]);
};

export const useHistoryYears = () => {
  const entries = useHistoryEntries();

  return useMemo(() => {
    const yearsSet = new Set<string>();
    entries.forEach((entry) => {
      yearsSet.add(getEntryYear(entry));
    });
    return Array.from(yearsSet);
  }, [entries]);
};

export const useSelectedChannelData = () => {
  const channel = useSelectedChannel();
  const entries = useHistoryEntries();
  const year = useSelectedYear();

  return useMemo(() => {
    const entriesMap = new Map<string, HistoryData.Entry & { views: number }>();
    if (!channel) {
      return [];
    }

    filterEntriesByChannel(filterEntriesByYear(entries, year), channel).forEach(
      (entry) => {
        const views = entriesMap.get(entry.titleUrl)?.views ?? 0;
        entriesMap.set(entry.titleUrl, { ...entry, views: views + 1 });
      }
    );

    return Array.from(entriesMap.values()).sort(sortByViews);
  }, [entries, channel, year]);
};

export const useSelectedChannelPerMonth = () => {
  const entries = useHistoryEntries();
  const channel = useSelectedChannel();

  return useMemo(() => {
    const entriesMap = new Map<string, { date: string; views: number }>();
    if (!channel) {
      return {};
    }
    filterEntriesByChannel(entries, channel).forEach((entry) => {
      const date = new Date(entry.time);
      const watchDate = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      const views = entriesMap.get(watchDate)?.views ?? 0;
      entriesMap.set(watchDate, { date: watchDate, views: views + 1 });
    });
    return Array.from(entriesMap.values())
      .reverse()
      .reduce((prev, curr) => {
        prev[curr.date] = curr.views;
        return prev;
      }, {} as Record<string, number>);
  }, [entries, channel]);
};

export const useMostViewedVideos = () => {
  const entries = useHistoryEntries();
  const year = useSelectedYear();

  return useMemo(() => {
    const entriesMap = new Map<string, HistoryData.Entry & { views: number }>();
    filterEntriesByYear(entries, year)
      .filter((entry) => Boolean(entry.titleUrl))
      .forEach((entry) => {
        const views = entriesMap.get(entry.titleUrl)?.views ?? 0;
        entriesMap.set(entry.titleUrl, { ...entry, views: views + 1 });
      });

    return Array.from(entriesMap.values()).sort(sortByViews).slice(0, 100);
  }, [entries, year]);
};
