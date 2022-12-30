import React from "react";
import { useMostViewedVideos } from "../../store/historyStore.hooks";
import { DataTable } from "./DataTable";

export function MostViewedVideosTable() {
  const videos = useMostViewedVideos();
  return (
    <DataTable columns={["Film", "Obejrzany"]}>
      {videos.map(({ title, views, titleUrl }) => (
        <tr key={title}>
          <td>
            <a href={titleUrl} target="_blank">
              {title}
            </a>
          </td>
          <td>{views}</td>
        </tr>
      ))}
    </DataTable>
  );
}
