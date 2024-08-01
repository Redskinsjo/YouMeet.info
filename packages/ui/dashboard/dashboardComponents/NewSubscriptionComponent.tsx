import React from "react";
import BecomePremium from "./BecomePremium";
import SubscriptionTitle from "./SubscriptionTitle";

export default function NewSubscriptionComponent() {
  return (
    <div className="px-[1px] h-full mx-[6px]">
      <div className="flex flex-col mx-[6px] h-full">
        <SubscriptionTitle />
        <div className="flex-center flex-1">
          <BecomePremium />
        </div>
      </div>
    </div>
  );
}
