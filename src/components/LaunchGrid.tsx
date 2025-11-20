import { LaunchCard } from "./LaunchCard";
import { Container, SimpleGrid } from "@mantine/core";
import type { Launch } from "./types";

type LaunchGridProp = {
  launches: Launch[];
  onOpenClick: (launch: Launch) => void;
};

export function LaunchGrid({ launches, onOpenClick }: LaunchGridProp) {
  return (
    <Container>
      <SimpleGrid spacing="md" cols={3}>
        {launches.map((launch) => (
          <LaunchCard
            key={launch.mission_name}
            name={launch.mission_name}
            img={launch.links.mission_patch_small}
            rocketName={launch.rocket.rocket_name}
            onSeeMore={() => onOpenClick(launch)}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}
