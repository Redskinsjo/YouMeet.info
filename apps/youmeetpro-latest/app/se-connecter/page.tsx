import LoginModalContent from "@youmeet/ui/login/LoginModalContent";
import { Suspense } from "react";

export default async function Login() {
  return (
    <div className="h-screen w-full flex-center bg-blueGrey50 dark:darkBg afterHeader">
      <div className="flex-center fixed w-full xs:h-screen sm:h-screen md:h-screen">
        <Suspense>
          <LoginModalContent type="loginPage" />
        </Suspense>
      </div>
    </div>
  );
}
