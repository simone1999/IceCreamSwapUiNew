import React from "react";
import { Flex, TooltipText, useTooltip } from "@pancakeswap/uikit";
import { useTranslation } from "@pancakeswap/localization";

export const AprRowWithToolTip: React.FC<React.PropsWithChildren<{ isVaultKey: boolean, forceApy?: boolean }>> = ({
  children,
  isVaultKey,
  forceApy= false,
}) => {
  const { t } = useTranslation();

  const tooltipContent = isVaultKey
    ? t("This pool's rewards are compounded automatically")
    : t("This pool’s rewards aren’t compounded automatically, so make sure to compound regularly");

  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, { placement: "bottom-start" });

  return (
    <Flex alignItems="center" justifyContent="space-between">
      {tooltipVisible && tooltip}
      <TooltipText ref={targetRef}>{isVaultKey || forceApy ? `${t("APY")}:` : `${t("APR")}:`}</TooltipText>
      {children}
    </Flex>
  );
};
