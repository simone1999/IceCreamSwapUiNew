import styled from "styled-components";
import { useTranslation } from "@pancakeswap/localization";
import BigNumber from "bignumber.js";
import { BIG_ZERO } from "@pancakeswap/utils/bigNumber";
import { DeserializedPool } from "./types";
import {
  Text,
  Flex,
  CalculateIcon,
  Skeleton,
  FlexProps,
  Button,
  RoiCalculatorModal,
  BalanceWithLoading,
} from "../../components";
import { useModal } from "../Modal";

const AprLabelContainer = styled(Flex)`
  &:hover {
    opacity: 0.5;
  }
`;

interface AprProps<T> extends FlexProps {
  pool: DeserializedPool<T>;
  stakedBalance: BigNumber;
  showIcon: boolean;
  performanceFee?: number;
  fontSize?: string;
  shouldShowApr: boolean;
  forceApy?: boolean;
  account: string;
  autoCompoundFrequency: number;
}

export function Apr<T>({
  pool,
  showIcon,
  stakedBalance,
  fontSize = "16px",
  performanceFee = 0,
  shouldShowApr,
  forceApy = false,
  account,
  autoCompoundFrequency,
  ...props
}: AprProps<T>) {
  const {
    stakingToken,
    earningToken,
    isFinished,
    earningTokenPrice,
    stakingTokenPrice,
    userData,
    apr,
    rawApr,
    vaultKey,
  } = pool;
  const { t } = useTranslation();

  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO;

  const apyModalLink = stakingToken?.address ? `/swap?outputCurrency=${stakingToken.address}` : "/swap";

  const [onPresentApyModal] = useModal(
    <RoiCalculatorModal
      account={account}
      earningTokenPrice={earningTokenPrice || 0}
      stakingTokenPrice={stakingTokenPrice || 0}
      stakingTokenBalance={stakedBalance.plus(stakingTokenBalance)}
      apr={vaultKey ? rawApr : apr}
      stakingTokenSymbol={stakingToken?.symbol || ""}
      linkLabel={t("Get %symbol%", { symbol: stakingToken?.symbol || "" })}
      linkHref={apyModalLink}
      earningTokenSymbol={earningToken?.symbol}
      autoCompoundFrequency={autoCompoundFrequency}
      performanceFee={performanceFee}
    />
  );

  const openRoiModal = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onPresentApyModal();
  };

  const isValidate = apr !== undefined && !Number.isNaN(apr);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const apy = isValidate? ((1 + (apr!/100 / 365))**(365) - 1) * 100 : null

  return (
    <AprLabelContainer alignItems="center" justifyContent="flex-start" {...props}>
      {isValidate || isFinished ? (
        <>
          {shouldShowApr ? (
            <>
              <BalanceWithLoading
                onClick={(event) => {
                  if (!showIcon) return;
                  openRoiModal(event);
                }}
                fontSize={fontSize}
                isDisabled={isFinished}
                value={isFinished ? 0 : (forceApy ? apy : apr) ?? 0}
                decimals={2}
                unit="%"
              />
              {!isFinished && showIcon && (
                <Button onClick={openRoiModal} variant="text" width="20px" height="20px" padding="0px" marginLeft="4px">
                  <CalculateIcon color="textSubtle" width="20px" />
                </Button>
              )}
            </>
          ) : (
            <Text>-</Text>
          )}
        </>
      ) : (
        <Skeleton width="80px" height="16px" />
      )}
    </AprLabelContainer>
  );
}
