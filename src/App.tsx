import { Container, Flex } from "@mantine/core";
import { ChannelDataTable } from "./ChannelDataTable";
import { Header } from "./Header";
import { Help } from "./Help";
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
        <Header />
        <JsonFileInput />
        <Help />
        {/* <ChannelsPicker /> */}
        {/* <HeatMap /> */}
        <ChannelDataTable />
      </Flex>
    </Container>
  );
}

export default App;
