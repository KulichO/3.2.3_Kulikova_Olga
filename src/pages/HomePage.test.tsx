import { screen, waitFor } from "@testing-library/react";
import { it, expect, vi, afterEach, beforeEach, describe } from "vitest";
import { HomePage } from "./ HomePage";
import { render, userEvent } from "../test.utilis";
import { within } from "@testing-library/react";

const mockResponse = [
  {
    mission_name: "Starlink 2",
    rocket: { rocket_name: "Falcon 9" },
    links: {
      mission_patch_small:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
      mission_patch:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    },
    details:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32",
  },
  {
    mission_name: "Crew Dragon In Flight Abort Test",
    rocket: { rocket_name: "Falcon 9" },
    links: {
      mission_patch_small:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
      mission_patch:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    },
    details: "Some description...",
  },
];

const API_URL = "https://api.spacexdata.com/v3/launches?launch_year=2020";

beforeEach(() => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue({
    ok: true,
    json: async () => mockResponse,
  } as unknown as Response);

  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  vi.clearAllMocks();

  const modalRoot = document.getElementById("modal-root");
  if (modalRoot) modalRoot.remove();
});

describe("HomePage", () => {
  it("отрисовывает карточки после успешного fetch", async () => {
    render(<HomePage />);

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledWith(API_URL);

    for (const launch of mockResponse) {
      expect(await screen.findByText(launch.mission_name)).toBeInTheDocument();
    }
  });

  it("показывает ошибку, если запрос упал", async () => {
    (globalThis.fetch as any).mockRejectedValueOnce(new Error("Error"));

    render(<HomePage />);

    const errorText = await screen.findByText(/error/i);
    expect(errorText).toBeInTheDocument();

    expect(screen.getByText(/SpaceX Launches 2020/i)).toBeInTheDocument();
  });

  it("открывает модальное окно по клику на 'See more'", async () => {
    const user = userEvent.setup();

    render(<HomePage />);

    const buttons = await screen.findAllByRole("button", {
      name: /see more/i,
    });

    await user.click(buttons[0]);

    expect(await screen.findByText(/mission name:/i)).toBeInTheDocument();
  });

  it("показывает данные выбранной карточки в модальном окне", async () => {
    const user = userEvent.setup();

    render(<HomePage />);

    const buttons = await screen.findAllByRole("button", {
      name: /see more/i,
    });

    await user.click(buttons[1]);
    const launch = mockResponse[1];

    const modalRoot = document.getElementById("modal-root") as HTMLElement;
    const modal = within(modalRoot);

    const nameEl = await modal.findByTestId("launch-name");
    expect(nameEl).toHaveTextContent(launch.mission_name);

    const rocketEl = await modal.findByTestId("launch-rocket");
    expect(rocketEl).toHaveTextContent(launch.rocket.rocket_name);

    const detailsEl = await modal.findByTestId("launch-details");
    expect(detailsEl).toHaveTextContent(launch.details);
  });

  it("закрывает модальное окно по клику на кнопку закрытия", async () => {
    const user = userEvent.setup();

    render(<HomePage />);

    const seeMoreButtons = await screen.findAllByRole("button", {
      name: /see more/i,
    });

    await user.click(seeMoreButtons[0]);

    const missionTitle = await screen.findByTestId("launch-name");
    expect(missionTitle).toBeInTheDocument();

    const closeButton = await screen.findByRole("button", {
      name: /close modal/i,
    });

    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId("launch-name")).not.toBeInTheDocument();
    });
  });
});
