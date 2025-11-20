import {
  CloseButton,
  Group,
  Text,
  Image,
  Paper,
  Overlay,
  Stack,
} from "@mantine/core";
import { createPortal } from "react-dom";

type LaunchModalProps = {
  name: string;
  rocketName: string;
  details: string;
  img: string | null | undefined;
  opened: boolean;
  onClose: () => void;
};

export function LaunchModal({
  name,
  rocketName,
  details,
  img,
  opened,
  onClose,
}: LaunchModalProps) {
  if (!opened) {
    return null;
  }

  const modalRoot = document.getElementById("modal-root")!;

  return createPortal(
    <>
      <Overlay fixed zIndex={199} />
      <Paper
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 200,
          padding: 24,
          height: 600,
          width: 600,
          overflowY: "auto",
        }}
      >
        <Group justify="space-between">
          <Text size="lg" data-testid="launch-name">
            {name}
          </Text>
          <CloseButton aria-label="Close modal" onClick={onClose} />
        </Group>
        <Group pt={30} pb={30} justify="center">
          <Image src={img ?? ""} w={170} h={170} />
        </Group>

        <Stack gap={0} mt={15} align="flex-start">
          <Text>Mission name:</Text>
          <Text c="grey">{name}</Text>
        </Stack>
        <Stack gap={0} mt={15} align="flex-start">
          <Text>Rocket name:</Text>
          <Text c="grey" data-testid="launch-rocket">
            {rocketName}
          </Text>
        </Stack>
        <Stack gap={0} mt={15} align="flex-start">
          <Text>Details:</Text>
          <Text c="grey" ta="justify" data-testid="launch-details">
            {details}
          </Text>
        </Stack>
      </Paper>
    </>,
    modalRoot
  );
}
