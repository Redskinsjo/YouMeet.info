"use client";
import "./globals.css";
import styles from "@youmeet/components/styles";
import "@youmeet/i18n/index";
import { StyledEngineProvider } from "@mui/material/styles";
import { Provider as ReduxProvider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, deepPurple, grey } from "@mui/material/colors";
import GraphQLProvider from "@youmeet/gql/index";
import { ReactElement } from "react";
import { outfit } from "@youmeet/functions/fonts";
import { store } from "@youmeet/global-config/store";
import ContentProvider from "./contentProvider";

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

    MuiButtonBase: {
      defaultProps: {
        className: "text-purple500",
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
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: "capitalize",
          borderRadius: "8px",
          border: `0.5px solid ${grey[500]}`,
          backgroundColor: grey[200],
          ":hover": {
            backgroundColor: "white",
            color: "black",
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
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
