import { Button, Transition } from "@mantine/core";
import React from "react";
import { useHistoryEntries } from "./store/historyStore";

export function Help() {
  const [opened, setOpened] = React.useState(false);
  const entries = useHistoryEntries();

  if (entries.length) {
    return null;
  }

  return (
    <>
      <Button
        onClick={() => setOpened((flag) => !flag)}
        variant="outline"
        color="gray"
      >
        {opened ? "Zamknij pomoc" : "Jak otrzymać raport historii z YouTube?"}
      </Button>
      <Transition
        mounted={opened}
        transition="fade"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={{ ...styles, width: "100%" }}>
            <iframe
              src="https://scribehow.com/embed/Pobieranie_historii_ogladania_z_YouTube__O-GDlJsjSJWCMkknvDYukw?as=scrollable&skipIntro=true"
              width="100%"
              height={window.innerHeight * 0.7}
              allowFullScreen
              frameBorder="0"
            />
          </div>
        )}
      </Transition>
    </>
  );
}
