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
  const [paid, setPaid] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [index, setIndex] = useState(0)
  const handleClick = (newIndex) => {
    setIndex(newIndex)

    window.scrollTo(0, 0)
  }

  const getPaid = async () => {
    const response = await fetch(`/api/kyc-info/${address}`)
    const data = await response.json()

    if (data?.status === 'MINTED') {
      setPaid(data?.status)
    } else {
      setPaid('NOT MINTED')
    }

    setLoading(false)
  }

  useEffect(() => {
    if (!paid && address) {
      getPaid()
    }
    // eslint-disable-next-line
  }, [paid, address])

  return (
    <AppWrapper title={t('Create Campaign')} subtitle={t('Create your own campaign in seconds')}>
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
          {paid === 'NOT MINTED' && (
            <>
              <span style={{ margin: 'auto' }}>
                <FormError>You must first become KYC verified.</FormError>
              </span>

              <Link href="/kyc">
                <Button as="a" height="40px" width="100%" marginBottom="7px">
                  {t('Proceed to KYC')}
                </Button>
              </Link>
            </>
          )}

          {paid === 'MINTED' && (
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
                    <Text marginBottom="7px">{t('Soft Cap')}</Text>
                    <Input type="number" placeholder={t('Soft Cap')} {...register('softCap')} />
                    {errors.softCap && <FormError>{errors.softCap.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Hard Cap')}</Text>
                    <Input type="number" placeholder={t('Hard Cap')} {...register('hardCap')} />
                    {errors.hardCap && <FormError>{errors.hardCap.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Minimum Allowed')}</Text>
                    <Input type="number" placeholder={t('Minimum Allowed')} {...register('minAllowed')} />
                    {errors.minAllowed && <FormError>{errors.minAllowed.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Maximum Allowed')}</Text>
                    <Input type="number" placeholder={t('Maximum Allowed')} {...register('maxAllowed')} />
                    {errors.maxAllowed && <FormError>{errors.maxAllowed.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Rate')}</Text>
                    <Input type="number" placeholder={t('Rate')} {...register('rate')} />
                    {errors.rate && <FormError>{errors.rate.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Pool Rate')}</Text>
                    <Input type="number" placeholder={t('Pool Rate')} {...register('poolRate')} />
                    {errors.poolRate && <FormError>{errors.poolRate.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Liquidity Rate')}</Text>
                    <Input type="number" placeholder={t('Liquidity Rate')} {...register('liquidityRate')} />
                    {errors.liquidityRate && <FormError>{errors.liquidityRate.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Start Date')}</Text>
                    <Input type="date" placeholder={t('Start Date')} {...register('startDate')} />
                    {errors.startDate && <FormError>{errors.startDate.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('End Date')}</Text>
                    <Input type="date" placeholder={t('End Date')} {...register('endDate')} />
                    {errors.endDate && <FormError>{errors.endDate.message}</FormError>}
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
