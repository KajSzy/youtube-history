import { Container, Flex } from "@mantine/core";
import { Header } from "./Header";
import { Help } from "./Help";
import { JsonFileInput } from "./JsonFile";
import { Table } from "./Table";

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
        <Table />
      </Flex>
    </Container>
  );
}

export default App;
