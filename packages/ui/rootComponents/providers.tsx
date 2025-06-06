"use client";
import "@youmeet/ui/dist/index.css";
import "@youmeet/i18n/index";
import { StyledEngineProvider } from "@mui/material/styles";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import GraphQLProvider from "@youmeet/gql/index";
import { ReactElement } from "react";
import { store } from "@youmeet/global-config/store";
import ContentProvider from "@youmeet/ui/rootComponents/contentProvider";
import { outfit } from "@youmeet/functions/fonts";
import { deepPurple, purple } from "@mui/material/colors";

const theme = createTheme({
  typography: outfit.style,
  components: {
    MuiPopover: {
      styleOverrides: {
        root: {
          zIndex: 11000,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: `${purple[900]} !important`,
          "&.Mui-focused": {
            color: `${purple[900]} !important`,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            width: "100%",
            height: "100%",
          },
          "& fieldset": {
            border: "1px solid !important",
            borderColor: `${purple[500]} !important`,
          },
          ".MuiInputBase-formControl": {
            background: "white",
          },
          input: {
            color: deepPurple[900],
          },
          textarea: {
            color: deepPurple[900],
            background: "white",
          },
          ".Mui-focused textarea": {
            fontWeight: "bold !important",
          },
          ".Mui-focused input": {
            fontWeight: "bold !important",
          },
        },
      },
    },
  },
});

export default function Providers({
  children,
  modals,
}: {
  children: ReactElement;
  modals: { [key: string]: ReactElement };
}) {
  return (
    <ReduxProvider store={store}>
      <GqlMuiProvider>
        <ContentProvider modals={modals}>{children}</ContentProvider>
      </GqlMuiProvider>
    </ReduxProvider>
  );
}

const GqlMuiProvider = ({ children }: { children: ReactElement }) => {
  return (
    <GraphQLProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </StyledEngineProvider>
    </GraphQLProvider>
  );
};
