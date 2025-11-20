import React from "react";
// import type { PropsWithChildren } from "react";
import { render as rtlRender } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { App } from "./App";

function AllProviders() {
  return (
    <MantineProvider>
      <App />
    </MantineProvider>
  );
}

export function render(
  ui: React.ReactElement,
  options?: Parameters<typeof rtlRender>[1]
) {
  return rtlRender(ui, { wrapper: AllProviders, ...options });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
