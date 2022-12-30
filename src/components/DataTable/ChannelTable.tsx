import { Text } from "@mantine/core";
import React from "react";
import { useHistoryStateActions } from "../../store/historyStore";
import { useHistoryChannels } from "../../store/historyStore.hooks";
import { DataTable } from "./DataTable";
import { TitleTableCell } from "./TitleTableCell";

export function ChannelTable() {
  const channels = useHistoryChannels();

  const { setSelectedChannel } = useHistoryStateActions();

  const onChannelSelect = React.useCallback(
    (title: string) => () => {
      setSelectedChannel(title);
      window.scroll({
        top: 0,
      });
    },
    []
  );

  return (
    <>
      <DataTable columns={["Kanał", "Obejrzany"]}>
        {channels.map(({ title, views }) => (
          <tr
            key={title}
            style={{ cursor: "pointer" }}
            onClick={onChannelSelect(title)}
          >
            <TitleTableCell>{title}</TitleTableCell>
            <td>{views}</td>
          </tr>
        ))}
      </DataTable>
      <Text fz="xl" c="red">
        Kanały obejrzane mniej niż 10 razy nie widnieją na liście
      </Text>
    </>
  );
}
