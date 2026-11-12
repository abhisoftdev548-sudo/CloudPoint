"use client";

import * as React from "react";

import { BILLING } from "@/constants/pricing";
import type { BillingCycle } from "@/types";

export function useBillingCycle(initial: BillingCycle = "monthly") {
  const [cycle, setCycle] = React.useState<BillingCycle>(initial);
  const yearly = cycle === "yearly";

  const priceFor = React.useCallback(
    (monthly: number) => (yearly ? Math.round(monthly * (1 - BILLING.yearlyDiscount)) : monthly),
    [yearly],
  );

  return { cycle, yearly, setYearly: (v: boolean) => setCycle(v ? "yearly" : "monthly"), priceFor };
}
