import { GlobalState, setError } from "@youmeet/global-config/features/global";
import { setModal } from "@youmeet/global-config/features/modal";
import { RootState } from "@youmeet/global-config/store";
import { CustomModalType } from "@youmeet/types/CustomModal";
import { Button } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { UnknownAction } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

export default function LoginModalClose({ type }: { type?: CustomModalType }) {
  const dispatch = useDispatch();
  const login = useSelector(
    (state: RootState) => (state.global as GlobalState).login
  );
  const error = useSelector(
    (state: RootState) => (state.global as GlobalState).error
  );
  const router = useRouter();
  return (
    <div className="absolute top-[12px] left-[12px] flex-center">
      <Button
        sx={{
          minWidth: 20,
          color: blueGrey[900],
          backgroundColor: grey[300],
          height: "24px",
        }}
        onClick={() => {
          if (type === "login" || type === "record") router.back();
          if (login) return router.back();
          else if (error) dispatch(setError(null));
          else dispatch(setModal("ok") as UnknownAction);
        }}
        onFocus={(e) => {
          e.target.style.backgroundColor = blueGrey[200];
          e.target.style.color = blueGrey[900];
        }}
        onBlur={(e) => {
          e.target.style.backgroundColor = blueGrey[900];
          e.target.style.color = blueGrey[200];
        }}
      >
        <IoMdClose />
      </Button>
    </div>
  );
}
