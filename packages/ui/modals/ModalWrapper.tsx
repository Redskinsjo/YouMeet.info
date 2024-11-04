import { ReactElement } from "react";

export default function ModalWrapper({ children }: { children: ReactElement }) {
  return (
    <div
      className="modal-content"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}
