import { Tabs, Title } from "@mantine/core";
import React from "react";
import { ChannelTable } from "./components/DataTable/ChannelTable";
import { MostViewedVideosTable } from "./components/DataTable/MostViewedVideosTable";
import { VideosTable } from "./components/DataTable/VideosTable";
import { useSelectedChannel, useHistoryEntries } from "./store/historyStore";

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
        <Title>Wybierz kanał, który Cię interesuje z listy poniżej</Title>
        <ChannelTable />
      </Tabs.Panel>
      <Tabs.Panel value="videos">
        <Title>Lista 100 najczęściej oglądanych filmów</Title>
        <MostViewedVideosTable />
      </Tabs.Panel>
    </Tabs>
  );
}
