import { FileInput } from "@mantine/core";
import React, { useRef } from "react";
import { useHistoryEntries, useHistoryStateActions } from "./historyStore";

export function JsonFileInput() {
  const { setEntries } = useHistoryStateActions();
  const entries = useHistoryEntries();
  const inputRef = useRef<HTMLButtonElement>(null);

  const handleInputChange = (file: File | null) => {
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function () {
      if (!reader.result) {
        return;
      }
      const fileContent = JSON.parse(reader.result as string);
      setEntries(fileContent);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  if (entries.length) {
    return null;
  }

  return (
    <>
      <FileInput
        placeholder="Wybierz plik z historią oglądania"
        accept="application/json"
        onChange={handleInputChange}
        size="xl"
        style={{ width: "100%" }}
        ref={inputRef}
      />
    </>
  );
}
