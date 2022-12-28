import { Container, Flex } from "@mantine/core";
import { ChannelDataTable } from "./ChannelDataTable";
import { ChannelsPicker } from "./ChannelsPicker";
import { JsonFileInput } from "./JsonFile";

function App() {
  return (
    <Container p={"xl"}>
      <Flex
        gap="xl"
        justify="center"
        align="flex-start"
        direction="column"
        wrap="wrap"
      >
        <JsonFileInput />
        <ChannelsPicker />
        <ChannelDataTable />
      </Flex>
    </Container>
  );
}

export default App;
