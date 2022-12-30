import React from "react";

type Props = {
  children: React.ReactNode;
};

export function TitleTableCell(props: Props) {
  return (
    <td
      style={{
        maxWidth: "50vw",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {props.children}
    </td>
  );
}
