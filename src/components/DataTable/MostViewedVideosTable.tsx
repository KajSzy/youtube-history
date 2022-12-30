import React from "react";
import { useMostViewedVideos } from "../../store/historyStore.hooks";
import { DataTable } from "./DataTable";
import { TitleTableCell } from "./TitleTableCell";

export function MostViewedVideosTable() {
  const videos = useMostViewedVideos();
  return (
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
  );
}
