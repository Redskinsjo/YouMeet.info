import LoginModalContent from "@youmeet/ui/login/LoginModalContent";
import { Suspense } from "react";

export default function LoginPageComponent() {
  return (
    <div className="afterHeader h-full w-full flex-center dark:darkBg">
      <div className="flex-center w-full h-full">
        <Suspense>
          <LoginModalContent type="loginPage" />
        </Suspense>
      </div>
    </div>
  );
}
