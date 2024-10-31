"use client";
import { useRouter } from "next/navigation";
import { IoCaretBackOutline } from "react-icons/io5";

export default function BackButton() {
  const router = useRouter();
  return (
    <div className="bg-grey100 p-[12px] rounded-[14px] flex-center cursor-pointer">
      <div
        className="bg-grey50 text-deepPurple900 rounded-full border-[1px] border-solid border-grey300 h-[27px] w-auto cursor-pointer hover:bg-deepPurple900 hover:text-white"
        onClick={() => {
          router.back();
        }}
      >
        <IoCaretBackOutline style={{ fontSize: "28px" }} />
      </div>
    </div>
  );
}
