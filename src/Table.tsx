import { Flex, Tabs, Title } from "@mantine/core";
import { ChannelTable } from "./components/DataTable/ChannelTable";
import { MostViewedVideosTable } from "./components/DataTable/MostViewedVideosTable";
import { VideosTable } from "./components/DataTable/VideosTable";
import { useHistoryEntries, useSelectedChannel } from "./store/historyStore";
import { YearSelect } from "./YearSelect";

export function Table() {
  const data = useHistoryEntries();
  const channel = useSelectedChannel();

  if (!data.length) {
    return null;
  }

  if (channel) {
    return <VideosTable />;
  }

  return (
    <Tabs defaultValue="channels" keepMounted={false} style={{ width: "100%" }}>
      <Tabs.List grow style={{ marginBottom: "2rem" }}>
        <Tabs.Tab value="channels">Kanały</Tabs.Tab>
        <Tabs.Tab value="videos">Filmy</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="channels">
        <Flex justify="space-between" direction="column" gap="xl">
          <Title>Wybierz kanał z listy poniżej</Title>
          <YearSelect />
        </Flex>
        <ChannelTable />
      </Tabs.Panel>
      <Tabs.Panel value="videos">
        <Flex justify="space-between" direction="column" gap="xl">
          <Title>Lista 100 najczęściej oglądanych filmów</Title>
          <YearSelect />
        </Flex>
        <MostViewedVideosTable />
      </Tabs.Panel>
    </Tabs>
  );
}
