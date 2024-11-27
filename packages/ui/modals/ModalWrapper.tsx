import { Attr } from "@youmeet/types/attributes";
import { ReactElement } from "react";

export default function ModalWrapper({
  children,
  newStyles,
}: {
  children: ReactElement;
  newStyles?: Attr;
}) {
  return (
    <div
      className="modal-container"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      style={{ ...newStyles }}
    >
      {children}
    </div>
  );
}
