import { Button, Checkbox, Flex, Heading, Input, Text, useModal } from '@pancakeswap/uikit'
import AppWrapper from 'components/AppWrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import FormError from 'views/Bridge/components/FormError'
import FileInput from 'components/FileInput'
import CreateModal from './components/CreateModal'
import { FormValues, schema } from './create-schema'
import { useState } from 'react'

export const CreateCampaign: React.FC = () => {
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
    <AppWrapper title="Create Campaign" subtitle="Create your own Campaign in seconds">
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit((data) => {
            setFormValues(data)
            onPresentCreateModal()
          })}
          style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}
        >
          <Flex flexDirection="column">
            <Text>Token Address</Text>
            <Input placeholder="Token Address" {...register('tokenAddress')} />
            {errors.tokenAddress && <FormError>{errors.tokenAddress.message}</FormError>}
          </Flex>
          <Flex flexDirection="column">
            <Text>Description</Text>
            <Input placeholder="Description" {...register('description')} />
            {errors.description && <FormError>{errors.description.message}</FormError>}
          </Flex>
          <Flex flexDirection="column">
            <Text>Soft Cap</Text>
            <Input type="number" placeholder="Soft Cap" {...register('softCap')} />
            {errors.softCap && <FormError>{errors.softCap.message}</FormError>}
          </Flex>
          <Flex flexDirection="column">
            <Text>Hard Cap</Text>
            <Input type="number" placeholder="Hard Cap" {...register('hardCap')} />
            {errors.hardCap && <FormError>{errors.hardCap.message}</FormError>}
          </Flex>
          <Flex flexDirection="column">
            <Text>Minimum Allowed</Text>
            <Input type="number" placeholder="Minimum Allowed" {...register('minAllowed')} />
            {errors.minAllowed && <FormError>{errors.minAllowed.message}</FormError>}
          </Flex>
          <Flex flexDirection="column">
            <Text>Maximum Allowed</Text>
            <Input type="number" placeholder="Maximum Allowed" {...register('maxAllowed')} />
            {errors.maxAllowed && <FormError>{errors.maxAllowed.message}</FormError>}
          </Flex>
          <Flex flexDirection="column">
            <Text>Pool Rate</Text>
            <Input type="number" placeholder="Pool Rate" {...register('poolRate')} />
            {errors.poolRate && <FormError>{errors.poolRate.message}</FormError>}
          </Flex>
          <Flex flexDirection="column">
            <Text>Rate</Text>
            <Input type="number" placeholder="Rate" {...register('rate')} />
            {errors.rate && <FormError>{errors.rate.message}</FormError>}
          </Flex>
          <Flex flexDirection="column">
            <Text>Liquidity Rate</Text>
            <Input type="number" placeholder="Liquidity Rate" {...register('liquidityRate')} />
            {errors.liquidityRate && <FormError>{errors.liquidityRate.message}</FormError>}
          </Flex>
          <Flex flexDirection="column">
            <Text>Start Date</Text>
            <Input type="date" placeholder="Start Date" {...register('startDate')} />
            {errors.startDate && <FormError>{errors.startDate.message}</FormError>}
          </Flex>
          <Flex flexDirection="column">
            <Text>End Date</Text>
            <Input type="date" placeholder="End Date" {...register('endDate')} />
            {errors.endDate && <FormError>{errors.endDate.message}</FormError>}
          </Flex>
          <Flex flexDirection="column">
            <Text>Banner</Text>
            <FileInput
              accept={{
                'image/png': ['.png'],
                'image/jpeg': ['.jpeg', '.jpg'],
              }}
              name="banner"
            />
            {errors.banner && <FormError>{errors.banner.message}</FormError>}
          </Flex>
          <Button type="submit">Create Token</Button>
        </form>
      </FormProvider>
    </AppWrapper>
  )
}
