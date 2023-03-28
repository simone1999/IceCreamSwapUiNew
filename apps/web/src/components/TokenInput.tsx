import { Currency, ERC20Token } from '@pancakeswap/sdk'
import { ChevronDownIcon, Flex, useModal, Text } from '@pancakeswap/uikit'
import { CurrencySelectButton } from './CurrencyInputPanel'
import { CurrencyLogo } from './Logo'
import CurrencySearchModal from './SearchModal/CurrencySearchModal'

interface Props {
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  tokens?: { [address: string]: ERC20Token }
  showNative?: boolean
  showCommonBases?: boolean
  commonBasesType?: string
  hideManage?: boolean
  disabled?: boolean
}

const TokenInput: React.FC<Props> = (props) => {
  const { onCurrencySelect, currency, tokens, showNative, showCommonBases, commonBasesType, hideManage, disabled } =
    props

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      showCommonBases={showCommonBases}
      commonBasesType={commonBasesType}
      tokens={tokens}
      hideManage={hideManage}
      showNative={showNative}
    />,
  )

  return (
    <CurrencySelectButton
      className="open-currency-select-button"
      selected={!!currency}
      onClick={() => {
        if (!disabled) {
          onPresentCurrencyModal()
        }
      }}
    >
      <Flex alignItems="center" justifyContent="space-between">
        {currency ? <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} /> : null}
        <Text id="pair" bold>
          {(currency && currency.symbol && currency.symbol.length > 20
            ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                currency.symbol.length - 5,
                currency.symbol.length,
              )}`
            : currency?.symbol) || 'Select a Token'}
        </Text>
        {!disabled && <ChevronDownIcon />}
      </Flex>
    </CurrencySelectButton>
  )
}

export default TokenInput
