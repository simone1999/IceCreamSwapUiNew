import { Button, Flex, Input, Text, useModal } from '@pancakeswap/uikit'
import AppWrapper from 'components/AppWrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import FormError from 'views/Bridge/components/FormError'
import FileInput from 'components/FileInput'
import CreateModal from './components/CreateModal'
import { FormValues, useSchema } from './create-schema'
import { useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import useSWR from 'swr'
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
  const paid = useSWR(
    address ? `kyc/${address}` : null,
    async () => {
      const response = await fetch(`api/kyc-info/${address}`)
      const data = await response.json()
      return data.status
    },
    { refreshInterval: 2000 },
  )

  return (
    <AppWrapper title={t('Create Campaign')} subtitle={t('Create your own campaign in seconds')}>
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit((data) => {
            setFormValues(data)
            onPresentCreateModal()
          })}
          style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}
        >
          {paid.data !== 'verified' && (
            <span style={{ margin: 'auto' }}>
              <FormError>You must first become KYC verified.</FormError>
            </span>
          )}

          {paid.data === 'verified' && (
            <>
              x
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
              <Button type="submit" variant="primary">
                {t('Create Token')}
              </Button>
            </>
          )}

          {paid.data !== 'verified' && (
            <Link href="/kyc">
              <Button as="a" height="40px" width="100%">
                {t('Proceed to KYC')}
              </Button>
            </Link>
          )}
        </form>
      </FormProvider>
    </AppWrapper>
  )
}
