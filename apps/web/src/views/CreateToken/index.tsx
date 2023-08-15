import { Button, Flex, Heading, Input, Text, useModal } from '@pancakeswap/uikit'
import AppWrapper from 'components/AppWrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import FormError from 'views/Bridge/components/FormError'
import FileInput from 'components/FileInput'
import CreateModal from './components/CreateModal'
import { FormValues, useSchema } from './create-schema'
import { useState } from 'react'
import InfoTooltip from '@pancakeswap/uikit/src/components/Timeline/InfoTooltip'
import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'

const StyledFlex = styled(Flex)`
  align-items: center;
  gap: 0.25em;
`

export const CreateToken: React.FC = () => {
  const schema = useSchema()
  const { t } = useTranslation()
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  })
  const [formValues, setFormValues] = useState<FormValues>()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const [onPresentCreateModal] = useModal(<CreateModal formValues={formValues} />, true, true, 'tokenCreateModal')

  return (
    <AppWrapper title="Create Token" subtitle="Create your own Token in seconds">
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit((data) => {
            setFormValues(data)
            onPresentCreateModal()
          })}
          style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}
        >
          <Flex flexDirection="column">
            <Text>Token Name</Text>
            <Input placeholder="Token Name" {...register('tokenName')} />
            {errors.tokenName && <FormError>{errors.tokenName.message}</FormError>}
          </Flex>
          <Flex flexDirection="column">
            <Text>Token Symbol</Text>
            <Input placeholder="Token Symbol" {...register('tokenSymbol')} />
            {errors.tokenSymbol && <FormError>{errors.tokenSymbol.message}</FormError>}
          </Flex>
          <Flex flexDirection="column">
            <Text>Logo</Text>
            <FileInput
              accept={{
                'image/png': ['.png'],
                'image/jpeg': ['.jpeg', '.jpg'],
              }}
              name="logo"
            />
            {errors.logo && <FormError>{errors.logo.message}</FormError>}
          </Flex>
          <Flex flexDirection="column">
            <Text>Initial Supply</Text>
            <Input type="number" placeholder="Initial Supply" {...register('initialSupply')} />
            {errors.initialSupply && <FormError>{errors.initialSupply.message}</FormError>}
          </Flex>
          <br />
          <Heading as="h3" size="sm">
            Taxes (in %)
          </Heading>
          <Flex flexDirection="column">
            <Text>Buy Tax</Text>
            <Input type="number" placeholder="0%" {...register('buyTax')} />
            {errors.buyTax && <FormError>{errors.buyTax.message}</FormError>}
          </Flex>
          <Flex flexDirection="column">
            <Text>Sell Tax</Text>
            <Input type="number" placeholder="0%" {...register('sellTax')} />
            {errors.sellTax && <FormError>{errors.sellTax.message}</FormError>}
          </Flex>
          <br />
          <Heading as="h3" size="sm">
            Tax distribution (in %)
          </Heading>
          <Flex flexDirection="column">
            <Text>Marketing Distribution</Text>
            <Input type="number" placeholder="0%" {...register('marketingDistribution')} />
            {errors.marketingDistribution && <FormError>{errors.marketingDistribution.message}</FormError>}
          </Flex>
          <Flex flexDirection="column">
            <StyledFlex>
              Dividend Distribution{' '}
              <InfoTooltip text={t('The percentage of the tax that will be distributed to the holders.')} />
            </StyledFlex>
            <Input type="number" placeholder="0%" {...register('dividendDistribution')} />
            {errors.dividendDistribution && <FormError>{errors.dividendDistribution.message}</FormError>}
          </Flex>
          <Flex flexDirection="column">
            <StyledFlex>
              Auto-Liquidity Distribution{' '}
              <InfoTooltip
                text={t(
                  'The percentage of the tax that will be added to the liquidity pool and automatically paired with ICE.',
                )}
              />
            </StyledFlex>
            <Input type="number" placeholder="0%" {...register('liquidityDistribution')} />
            {errors.liquidityDistribution && <FormError>{errors.liquidityDistribution.message}</FormError>}
          </Flex>
          <Button type="submit">Create Token</Button>
        </form>
      </FormProvider>
    </AppWrapper>
  )
}
