import { Button } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useFormStatus } from "react-dom";
import { ProgressBar } from "react-loader-spinner";

export default function SubmitBtn({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <div className="h-[50px] flex-center">
      {pending ? (
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
      ) : (
        <Button
          disabled={pending}
          className="px-[12px] w-full subItem bg-deepPurple700 dark:darkBg text-white"
          type="submit"
        >
          {text}
        </Button>
      )}
    </div>
  );
}
