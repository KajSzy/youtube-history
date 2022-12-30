import { NativeSelect } from "@mantine/core";
import React from "react";
import { useHistoryStateActions, useSelectedYear } from "./store/historyStore";
import { useHistoryYears } from "./store/historyStore.hooks";

export function YearSelect() {
  const years = useHistoryYears();
  const selectedYear = useSelectedYear();
  const { setSelectedYear, clearSelectedYear } = useHistoryStateActions();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === "Cały zakres") {
      clearSelectedYear();
    } else {
      setSelectedYear(value);
    }
  };

  return (
    <NativeSelect
      data={["Cały zakres", ...years]}
      radius="xs"
      size="lg"
      value={selectedYear}
      onChange={handleSelectChange}
    />
  );
}
