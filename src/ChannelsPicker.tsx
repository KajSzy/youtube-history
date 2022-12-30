import { Select } from "@mantine/core";
import {
  useHistoryChannels,
  useHistoryStateActions,
  useSelectedChannel,
} from "./store/historyStore";

export function ChannelsPicker() {
  const channels = useHistoryChannels();
  const value = useSelectedChannel();
  const { setSelectedChannel } = useHistoryStateActions();

  if (!channels.length || value) {
    return null;
  }

  return (
    <Select
      data={channels.map((c) => c.title)}
      searchable
      nothingFound="Nie znaleziono kanału o tej nazwie"
      limit={20}
      transitionDuration={150}
      transition="scale-y"
      transitionTimingFunction="ease"
      style={{ width: "100%" }}
      size="xl"
      value={value}
      onChange={setSelectedChannel}
      clearable
      maxDropdownHeight={500}
    />
  );
}
