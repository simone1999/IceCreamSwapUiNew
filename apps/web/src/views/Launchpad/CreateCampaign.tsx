import { Button, ButtonMenu, ButtonMenuItem, Flex, Input, Row, Spinner, Text, useModal } from '@pancakeswap/uikit'
import AppWrapper from 'components/AppWrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import FormError from 'views/Bridge/components/FormError'
import FileInput from 'components/FileInput'
import CreateModal from './components/CreateModal'
import { FormValues, useSchema } from './create-schema'
import { useEffect, useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { useAccount } from 'wagmi'
import Link from 'next/link'
import { useUser } from 'strict/hooks/useUser'
import { useActiveChainId } from "hooks/useActiveChainId";
import {ICE} from "@pancakeswap/tokens";

export const CreateCampaign: React.FC = () => {
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

  const { address } = useAccount()
  const [kyced, setKyced] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [index, setIndex] = useState(0)
  const user = useUser()
  const { chainId } = useActiveChainId()

  const raisedToken = ICE[chainId]

  const handleClick = (newIndex) => {
    setIndex(newIndex)

    window.scrollTo(0, 0)
  }

  const getKyced = async () => {
    const response = await fetch(`/api/kyc-info/${address}`)
    const data = await response.json()

    if (data.status === 'verified') {
      setKyced(true)
    } else {
      setKyced(false)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (!kyced && user.data?.isLoggedIn) {
      getKyced()
    }

    setTimeout(() => {
      if (user.data?.isLoggedIn === false) {
        setLoading(false)
        setKyced(false)
      }
    }, 3500)
    // eslint-disable-next-line
  }, [user, kyced])

  return (
    <AppWrapper title={t('Create Campaign')} subtitle={t('Launch your own Token!')}>
      {loading && (
        <Flex justifyContent="center" marginY="28px">
          <Spinner />
        </Flex>
      )}

      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit((data) => {
            setFormValues(data)
            onPresentCreateModal()
          })}
          style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}
        >
          {!kyced && !loading && (
            <>
              <span style={{ margin: 'auto', textAlign: 'center', width: '75%' }}>
                <FormError>You must first become KYC verified or login to your KYC verified account.</FormError>
              </span>

              <Link href="/kyc">
                <Button as="a" height="40px" width="100%" marginBottom="7px">
                  {t('Proceed to KYC')}
                </Button>
              </Link>
            </>
          )}

          {kyced && (
            <>
              {index === 0 && (
                <>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Token Address')}</Text>
                    <Input placeholder={t('Token Address')} {...register('tokenAddress')} />
                    {errors.tokenAddress && <FormError>{errors.tokenAddress.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Description')}</Text>
                    <Input placeholder="Description" {...register('description')} />
                    {errors.description && <FormError>{errors.description.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Banner')}</Text>
                    <FileInput
                      accept={{
                        'image/png': ['.png'],
                        'image/jpeg': ['.jpeg', '.jpg'],
                      }}
                      name="banner"
                    />
                    {errors.banner && <FormError>{errors.banner.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Presale start')}</Text>
                    <Input type="datetime-local" placeholder={t('Start Date')} {...register('startDate')} />
                    {errors.startDate && <FormError>{errors.startDate.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Presale end')}</Text>
                    <Input type="datetime-local" placeholder={t('End Date')} {...register('endDate')} />
                    {errors.endDate && <FormError>{errors.endDate.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Minimum amount that needs to be raised (Soft Cap)')}</Text>
                    <Input placeholder={t('Soft Cap')} {...register('softCap')} />
                    {errors.softCap && <FormError>{errors.softCap.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Maximum amount to raise (Hard Cap)')}</Text>
                    <Input placeholder={t('Hard Cap')} {...register('hardCap')} />
                    {errors.hardCap && <FormError>{errors.hardCap.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Minimum %raisedTokenSymbol% a contributor is allowed to contribute', {raisedTokenSymbol: raisedToken.symbol})}</Text>
                    <Input placeholder={t('Minimum Allowed')} {...register('minAllowed')} />
                    {errors.minAllowed && <FormError>{errors.minAllowed.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Maximum %raisedTokenSymbol% a contributor is allowed to contribute', {raisedTokenSymbol: raisedToken.symbol})}</Text>
                    <Input placeholder={t('Maximum Allowed')} {...register('maxAllowed')} />
                    {errors.maxAllowed && <FormError>{errors.maxAllowed.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t(`Tokens per 1 ${raisedToken.symbol} at Presale`)}</Text>
                    <Input placeholder={t('Presale Rate')} {...register('rate')} />
                    {errors.rate && <FormError>{errors.rate.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t(`Tokens per 1 ${raisedToken.symbol} after Presale (DEX listing)`)}</Text>
                    <Input placeholder={t('Listing Rate')} {...register('poolRate')} />
                    {errors.poolRate && <FormError>{errors.poolRate.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('percentage of raised %raisedTokenSymbol% used to provide Liquidity', {raisedTokenSymbol: raisedToken.symbol})}</Text>
                    <Input placeholder={t('Liquidity %')} {...register('liquidityRate')} />
                    {errors.liquidityRate && <FormError>{errors.liquidityRate.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Liquidity unlock date')}</Text>
                    <Input type="date" placeholder={t('Unlock Date')} {...register('liquidityUnlockDate')} />
                    {errors.liquidityUnlockDate && <FormError>{errors.liquidityUnlockDate.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('contributor vesting percentage')}</Text>
                    <Input placeholder={t('%')} {...register('vestingPercentage')} />
                    {errors.vestingPercentage && <FormError>{errors.vestingPercentage.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('end of vesting period')}</Text>
                    <Input type="date" placeholder={t('Date')} {...register('vestingEndDate')} />
                    {errors.vestingEndDate && <FormError>{errors.vestingEndDate.message}</FormError>}
                  </Flex>
                </>
              )}

              {index === 1 && (
                <>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Website')}</Text>
                    <Input placeholder="Website" {...register('website')} />
                    {errors.website && <FormError>{errors.website.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Twitter')}</Text>
                    <Input placeholder="Twitter" {...register('twitter')} />
                    {errors.twitter && <FormError>{errors.twitter.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Telegram')}</Text>
                    <Input placeholder="Telegram" {...register('telegram')} />
                    {errors.telegram && <FormError>{errors.telegram.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Discord')}</Text>
                    <Input placeholder="Discord" {...register('discord')} />
                    {errors.discord && <FormError>{errors.discord.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Reddit')}</Text>
                    <Input placeholder="Reddit" {...register('reddit')} />
                    {errors.reddit && <FormError>{errors.reddit.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('GitHub')}</Text>
                    <Input placeholder="GitHub" {...register('github')} />
                    {errors.github && <FormError>{errors.github.message}</FormError>}
                  </Flex>
                </>
              )}

              <Row>
                <ButtonMenu
                  activeIndex={index}
                  onItemClick={handleClick}
                  fullWidth
                  scale="sm"
                  variant="subtle"
                  marginY="7px"
                >
                  <ButtonMenuItem>Campaign Info</ButtonMenuItem>
                  <ButtonMenuItem>Social Details</ButtonMenuItem>
                </ButtonMenu>
              </Row>

              <Button type="submit" variant="primary" marginBottom="7px">
                {t('Create Campaign')}
              </Button>
            </>
          )}
        </form>
      </FormProvider>
    </AppWrapper>
  )
}