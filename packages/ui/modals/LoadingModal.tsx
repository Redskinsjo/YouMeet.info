import ModalClose from "./ModalClose";
import ModalWrapper from "../modals/ModalWrapper";
import { CustomModalProps } from "@youmeet/types/CustomModal";
import Logo from "../Logo";
import LoadingText from "../LoadingText";
import { ProgressBar } from "react-loader-spinner";
import { deepPurple } from "@mui/material/colors";

export default function LoadingModal({ type }: CustomModalProps) {
  return (
    <ModalWrapper>
      <>
        <div className="flex-center flex-col gap-[24px] relative">
          <Logo gif png />
          <ProgressBar
            visible={true}
            height="45"
            width="80"
            borderColor={deepPurple[900]}
            barColor={deepPurple[200]}
            ariaLabel="progress-bar-loading"
            wrapperStyle={{ padding: "0px" }}
            wrapperClass=""
          />
          <LoadingText />
        </div>
        <ModalClose type={type} />
      </>
    </ModalWrapper>
  );
}
