import { useMemo } from "react";
import create from "zustand";
import { HistoryData } from "./HistoryData";

const sortByViews = <T extends { views: number }>(a: T, b: T) =>
  b.views - a.views;

interface HistoryState {
  entries: HistoryData.Entry[];
  selectedChannel?: string;
  actions: {
    setSelectedChannel: (channel: string) => void;
    clearSelectedChannel: () => void;
    setEntries: (entries: HistoryData.Entry[]) => void;
  };
}

const useHistoryState = create<HistoryState>((set) => ({
  actions: {
    setEntries: (entries) =>
      set(() => ({
        entries: entries.map((entry) => ({
          ...entry,
          title: entry.title.replace(/Obejrzano: /, ""),
        })),
      })),
    setSelectedChannel: (selectedChannel) => set(() => ({ selectedChannel })),
    clearSelectedChannel: () => set(() => ({ selectedChannel: undefined })),
  },
  entries: [],
}));

export const useHistoryStateActions = () =>
  useHistoryState((state) => state.actions);
export const useHistoryEntries = () =>
  useHistoryState((state) => state.entries);
export const useSelectedChannel = () =>
  useHistoryState((state) => state.selectedChannel);

export const useHistoryChannels = () => {
  const entries = useHistoryEntries();

  return useMemo(() => {
    const channels = new Map<string, { title: string; views: number }>();

    entries.forEach((entry) => {
      if (entry.subtitles && entry.subtitles.length !== 0) {
        const channelName = entry.subtitles[0].name;
        const views = channels.get(channelName)?.views ?? 0;
        channels.set(channelName, { title: channelName, views: views + 1 });
      }
    });

    return Array.from(channels.values())
      .sort(sortByViews)
      .filter((c) => c.views > 10);
  }, [entries]);
};

const filterEntriesByChannel = (
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

export const useSelectedChannelData = () => {
  const channel = useSelectedChannel();
  const entries = useHistoryEntries();

  return useMemo(() => {
    const entriesMap = new Map<string, HistoryData.Entry & { views: number }>();
    if (!channel) {
      return [];
    }
    filterEntriesByChannel(entries, channel).forEach((entry) => {
      const views = entriesMap.get(entry.title)?.views ?? 0;
      entriesMap.set(entry.title, { ...entry, views: views + 1 });
    });

    return Array.from(entriesMap.values()).sort(sortByViews);
  }, [entries, channel]);
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
