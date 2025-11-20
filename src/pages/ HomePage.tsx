import { Container, Text } from "@mantine/core";
import { LaunchGrid } from "../components/LaunchGrid";
import type { Launch } from "../components/types";
import { LaunchModal } from "../components/LaunchModal";
import { useEffect, useReducer } from "react";

type State = {
  isModalOpen: boolean;
  selectedLaunch: Launch | null;

  launches: Launch[];
  error: string | null;
};

type Action =
  | { type: "OPEN_MODAL"; payload: Launch }
  | { type: "CLOSE_MODAL" }
  | { type: "FETCH_SUCCESS"; payload: Launch[] }
  | { type: "FETCH_ERROR"; payload: string };

const initialState = {
  isModalOpen: false,
  selectedLaunch: null,
  launches: [],
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, isModalOpen: true, selectedLaunch: action.payload };

    case "CLOSE_MODAL":
      return { ...state, isModalOpen: false, selectedLaunch: null };

    case "FETCH_SUCCESS":
      return { ...state, launches: action.payload };

    case "FETCH_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

export function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v3/launches?launch_year=2020")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "FETCH_SUCCESS", payload: data }))
      .catch(() => dispatch({ type: "FETCH_ERROR", payload: "Error" }));
  });

  function handleClickOpen(launch: Launch) {
    dispatch({ type: "OPEN_MODAL", payload: launch });
  }

  function handleClickClose() {
    dispatch({ type: "CLOSE_MODAL" });
  }

  return (
    <Container>
      <Text style={{ fontSize: 30, fontWeight: 700 }} mb="md">
        SpaceX Launches 2020
      </Text>

      {state.error && (
        <Text c="red" mb="md">
          {state.error}
        </Text>
      )}

      <LaunchGrid launches={state.launches} onOpenClick={handleClickOpen} />

      <LaunchModal
        opened={state.isModalOpen}
        onClose={handleClickClose}
        name={state.selectedLaunch?.mission_name ?? ""}
        rocketName={state.selectedLaunch?.rocket.rocket_name ?? ""}
        img={state.selectedLaunch?.links.mission_patch ?? null}
        details={state.selectedLaunch?.details ?? ""}
      />
    </Container>
  );
}
