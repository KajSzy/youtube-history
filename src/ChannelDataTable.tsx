import { Table, Text, Title } from "@mantine/core";
import { useMemo } from "react";
import { Header } from "./Header";
import {
  useHistoryChannels,
  useHistoryStateActions,
  useSelectedChannel,
  useSelectedChannelData,
} from "./historyStore";

export function ChannelDataTable() {
  const channels = useHistoryChannels();
  const channel = useSelectedChannel();
  const entries = useSelectedChannelData();
  const { setSelectedChannel } = useHistoryStateActions();

  const combinedChannelViews = useMemo(
    () => entries.reduce((prev, curr) => prev + curr.views, 0),
    [entries]
  );

  const onChannelSelect = (title: string) => () => {
    setSelectedChannel(title);
    window.scroll({
      top: 0,
    });
  };

  if (!channel && !channels.length) {
    return null;
  }

  if (!channel && channels.length) {
    return (
      <>
        <Table
          striped
          highlightOnHover
          fontSize={"xl"}
          verticalSpacing={"xl"}
          horizontalSpacing={"xl"}
        >
          <thead>
            <tr>
              <th>Kanał</th>
              <th>Obejrzany</th>
            </tr>
          </thead>
          <tbody>
            {channels.map(({ title, views }) => (
              <tr
                key={title}
                style={{ cursor: "pointer" }}
                onClick={onChannelSelect(title)}
              >
                <td
                  style={{
                    maxWidth: "50vh",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {title}
                </td>
                <td>{views}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Text fz="xl" c="red">
          Kanały obejrzane mniej niż 10 razy nie widnieją na liście
        </Text>
      </>
    );
  }

  return (
    <>
      <Title order={2}>{channel}</Title>
      <Text fz="xl">
        Łączna liczba obejrzanych filmów kanału <i>{channel}</i> wynosi{" "}
        {entries.length}
      </Text>
      <Text fz="xl">
        Filmy kanału <i>{channel}</i> zostały wyświetlone łącznie{" "}
        {combinedChannelViews} razy
      </Text>
      <Table
        striped
        highlightOnHover
        fontSize={"xl"}
        verticalSpacing={"xl"}
        horizontalSpacing={"xl"}
      >
        <thead>
          <tr>
            <th>Odcinek</th>
            <th>Obejrzany</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(({ title, views, titleUrl }) => (
            <tr key={title}>
              <td>
                <a href={titleUrl} target="_blank">
                  {title}
                </a>
              </td>
              <td>{views}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
