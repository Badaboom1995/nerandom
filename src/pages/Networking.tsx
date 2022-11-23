import React from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../recoil/user/userAtom";
import Matching from "../features/Networking/components/Matching";
import NetworkingOnboarding from "../features/NetworkingOnboarding";

const NetworkingPage = () => {
  const user = useRecoilValue(userAtom);
  console.log(user);
  const isOnboardingDone =
    user.fields.finishedOnboardings?.includes("networking");

  return isOnboardingDone ? <Matching /> : <NetworkingOnboarding />;
};

export default NetworkingPage;
