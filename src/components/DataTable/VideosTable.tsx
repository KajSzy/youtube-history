import { Flex, Text, Title } from "@mantine/core";
import React from "react";
import { useSelectedChannel } from "../../store/historyStore";
import { useSelectedChannelData } from "../../store/historyStore.hooks";
import { YearSelect } from "../../YearSelect";
import { DataTable } from "./DataTable";
import { TitleTableCell } from "./TitleTableCell";

export function VideosTable() {
  const channel = useSelectedChannel();
  const videos = useSelectedChannelData();

  const combinedChannelViews = React.useMemo(
    () => videos.reduce((prev, curr) => prev + curr.views, 0),
    [videos]
  );
  return (
    <>
      <Flex
        justify="space-between"
        direction="column"
        gap="xl"
        style={{ width: "100%" }}
      >
        <div>
          <Title order={2}>{channel}</Title>
          <Text fz="xl">
            Łączna liczba obejrzanych filmów kanału <i>{channel}</i> wynosi{" "}
            {videos.length}
          </Text>
          <Text fz="xl">
            Filmy kanału <i>{channel}</i> zostały wyświetlone łącznie{" "}
            {combinedChannelViews} razy
          </Text>
        </div>
        <YearSelect />
      </Flex>
      <DataTable columns={["Film", "Obejrzany"]}>
        {videos.map(({ title, views, titleUrl }) => (
          <tr key={title}>
            <TitleTableCell>
              <a href={titleUrl} target="_blank">
                {title}
              </a>
            </TitleTableCell>
            <td>{views}</td>
          </tr>
        ))}
      </DataTable>
    </>
  );
}
