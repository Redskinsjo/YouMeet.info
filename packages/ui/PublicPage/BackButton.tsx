"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoCaretBackOutline } from "react-icons/io5";

export default function BackButton({ view }: { view?: boolean }) {
  const router = useRouter();
  return (
    <div className="bg-grey100 p-[12px] rounded-[14px] flex-center cursor-pointer">
      <Link
        href={"/offres"}
        className="bg-grey50 text-deepPurple900 rounded-full border-[1px] border-solid border-grey300 h-[27px] w-auto cursor-pointer hover:bg-deepPurple900 hover:text-white"
        // onClick={() => {
        //   // if (view) router.back();
        //   // else router.push("/offres");
        //   window.
        // }}
      >
        <IoCaretBackOutline style={{ fontSize: "28px" }} />
      </Link>
    </div>
  );
}
