import { Button, Title } from "@mantine/core";
import {
  useHistoryEntries,
  useHistoryStateActions,
  useSelectedChannel,
} from "./store/historyStore";

export function Header() {
  const entries = useHistoryEntries();
  const { clearSelectedChannel } = useHistoryStateActions();
  const selectedChannel = useSelectedChannel();

  if (selectedChannel) {
    return (
      <Button
        variant="subtle"
        radius="xs"
        size="xl"
        onClick={clearSelectedChannel}
        color="gray"
        compact
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        <span>Wróć do listy kanałów</span>
      </Button>
    );
  }

  if (!entries.length) {
    return (
      <Title order={1}>
        Pobierz z Google'a swoją historię Youtube i wgraj plik
      </Title>
    );
  }

  return null;
}
