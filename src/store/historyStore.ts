import create from "zustand";
import { HistoryData } from "../HistoryData";

interface HistoryState {
  entries: HistoryData.Entry[];
  selectedChannel?: string;
  selectedYear?: string;
  actions: {
    setEntries: (entries: HistoryData.Entry[]) => void;
    setSelectedChannel: (channel: string) => void;
    clearSelectedChannel: () => void;
    setSelectedYear: (year: string) => void;
    clearSelectedYear: () => void;
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
    setSelectedYear: (selectedYear) => set(() => ({ selectedYear })),
    clearSelectedYear: () => set(() => ({ selectedYear: undefined })),
  },
  entries: [],
}));

export const useHistoryStateActions = () =>
  useHistoryState((state) => state.actions);
export const useHistoryEntries = () =>
  useHistoryState((state) => state.entries);
export const useSelectedChannel = () =>
  useHistoryState((state) => state.selectedChannel);
export const useSelectedYear = () =>
  useHistoryState((state) => state.selectedYear);
