import { Box } from "@mui/material";
import React from "react";
import DetailComponent from "./DetailComponent";
import { BetaUser } from "@youmeet/gql/generated";

const UserInfos = ({ user }: { user: BetaUser | null | undefined }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <DetailComponent
        label="Linkedin"
        value={(user?.linkedinProfileId as string) || "-"}
        type="modal2"
      />
      <DetailComponent
        label="Id"
        value={(user?.id as string) || "-"}
        type="modal2"
      />
      <DetailComponent
        label="Nom complet"
        value={(user?.fullname as string) || "-"}
        type="modal2"
      />
      <DetailComponent
        label="Prénom"
        value={(user?.firstname as string) || "-"}
        type="modal2"
      />
      <DetailComponent
        label="Nom de famille"
        value={(user?.lastname as string) || "-"}
        type="modal2"
      />
      <DetailComponent
        label="Email"
        value={(user?.email as string) || "-"}
        type="modal2"
      />
    </Box>
  );
};

export default UserInfos;
