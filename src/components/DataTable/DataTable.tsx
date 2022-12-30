import { Table } from "@mantine/core";
import React from "react";

type Props = {
  columns: string[];
  children: React.ReactNode;
};

export function DataTable(props: Props) {
  return (
    <Table
      striped
      highlightOnHover
      fontSize={"xl"}
      verticalSpacing={"xl"}
      horizontalSpacing={"xl"}
    >
      <thead>
        <tr>
          {props.columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </Table>
  );
}
