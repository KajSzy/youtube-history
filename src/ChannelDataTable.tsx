import { Table, Text } from "@mantine/core";
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
              <th>Odcinek</th>
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
      <Text fz="xl">
        Łącznie kanał <b style={{ fontSize: "140%" }}>{channel}</b> obejrzałeś{" "}
        {entries.length} razy
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
          {entries.map(({ title, views }) => (
            <tr key={title}>
              <td>{title}</td>
              <td>{views}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
