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
            <Text marginBottom="7px">{t('Pool Rate')}</Text>
            <Input type="number" placeholder={t('Pool Rate')} {...register('poolRate')} />
            {errors.poolRate && <FormError>{errors.poolRate.message}</FormError>}
          </Flex>
          <Flex flexDirection="column">
            <Text marginBottom="7px">{t('Rate')}</Text>
            <Input type="number" placeholder={t('Rate')} {...register('rate')} />
            {errors.rate && <FormError>{errors.rate.message}</FormError>}
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
        </form>
      </FormProvider>
    </AppWrapper>
  )
}
