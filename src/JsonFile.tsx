import { FileInput, Title } from "@mantine/core";
import React from "react";
import { useHistoryStateActions } from "./historyStore";

export function JsonFileInput() {
  const { setEntries } = useHistoryStateActions();
  const [value, setValue] = React.useState<File | null>(null);

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
    };
    reader.readAsText(file);
    setValue(file);
  };

  if (value) {
    return <Title>Wybierz kanał, który Cię interesuje z listy poniżej</Title>;
  }

  return (
    <>
      <Title order={1}>
        Pobierz z Google'a swoją historię Youtube i wgraj plik
      </Title>
      <FileInput
        placeholder="Wybierz plik z historią oglądania"
        accept="application/json"
        onChange={handleInputChange}
        size="xl"
        radius={"xl"}
        style={{ width: "100%" }}
        value={value}
      />
    </>
  );
}
