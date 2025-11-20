import { Button, Card, Image, Text } from "@mantine/core";

type LaunchCardProps = {
  name: string;
  img: string | null | undefined;
  rocketName: string;
  onSeeMore: () => void;
};

export function LaunchCard({
  name,
  img,
  rocketName,
  onSeeMore,
}: LaunchCardProps) {
  return (
    <Card
      w={200}
      h={250}
      shadow="sm"
      padding="md"
      radius="md"
      withBorder
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Card.Section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        mt={15}
        ml={0}
        mr={0}
        mb={0}
        w={80}
        h={80}
      >
        <Image src={img} w="100%" h="auto" fit="contain" />
      </Card.Section>
      <Card.Section mt={15}>
        <Text w={170} lineClamp={1}>
          {name}
        </Text>
        <Text w={170} lineClamp={1} c="grey">
          {rocketName}
        </Text>
      </Card.Section>
      <Button
        style={{ fontSize: 15 }}
        size="compact-md"
        w={170}
        variant="filled"
        color="blue"
        mt={22}
        onClick={onSeeMore}
      >
        See more
      </Button>
    </Card>
  );
}
