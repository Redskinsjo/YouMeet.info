import { Button } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { setError } from "@youmeet/global-config/features/global";
import { resetModal } from "@youmeet/global-config/features/modal";
import { usePathname, useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";

export default function ModalClose() {
  const dispatch = useDispatch();
  const pathname = usePathname();
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
          if (pathname === "/se-connecter") {
            router.back();
          } else {
            dispatch(resetModal(null));
            dispatch(setError(null));
          }
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
