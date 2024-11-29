import verifyTokenBrowser from "@youmeet/utils/basics/verifyTokenBrowser";
import { getUser } from "./request";
import { getSubscriptionStatus2 } from "@youmeet/global-config/useSubscriptionStatus";
import { BetaUser } from "@youmeet/gql/generated";
import { AppSubscription } from "@youmeet/types/app";
import { useDispatch } from "react-redux";
import { storeUser } from "@youmeet/global-config/features/user";
import { setSubscription } from "@youmeet/global-config/features/global";
import { useCallback, useEffect } from "react";
import { isUser } from "@youmeet/types/TypeGuards";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { UnknownAction } from "@reduxjs/toolkit";
import { setModal } from "@youmeet/global-config/features/modal";

const fetchUser = async (
  pathname: string
): Promise<{
  data: AppSubscription | undefined;
  user: BetaUser | undefined;
}> => {
  let user, data;
  const verified = await verifyTokenBrowser(pathname);
  if (verified?.userId) {
    const res = (await getUser<BetaUser>({
      userId: verified.userId,
    })) as BetaUser;
    if (res && isUser(res)) {
      user = res;
      if (res.id && res.email && res.customerId) {
        data = await getSubscriptionStatus2(res);
      }
    }
  }
  return { data, user };
};

export const useFetchedUser = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();

  const newParams = !!params.get("new") || false;

  const fetchAndStoreUser = useCallback(async () => {
    dispatch(setSubscription(false));
    const appData = await fetchUser(pathname);
    if (appData.user) dispatch(storeUser(appData.user));
    if (newParams) {
      dispatch(
        setModal({ display: "fulfill", user: appData.user }) as UnknownAction
      );
    }
    dispatch(setSubscription(appData.data));
  }, [pathname]);

  useEffect(() => {
    fetchAndStoreUser();
  }, []);
};
