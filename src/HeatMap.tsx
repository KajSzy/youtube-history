import Calendar from "react-github-contribution-calendar";
import { useSelectedChannelPerMonth } from "./historyStore";

export function HeatMap() {
  const datesWithViews = useSelectedChannelPerMonth();

  if (!Object.keys(datesWithViews).length) {
    return null;
  }

  return (
    <Calendar
      values={datesWithViews}
      until={new Date().toLocaleString("default", {
        month: "long",
        year: "numeric",
      })}
      panelAttributes=""
      monthLabelAttributes=""
      weekLabelAttributes=""
    />
  );
}
