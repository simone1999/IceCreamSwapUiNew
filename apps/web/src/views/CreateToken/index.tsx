import { Button, Checkbox, Flex, Heading, Input, Text, useModal } from '@pancakeswap/uikit'
import AppWrapper from 'components/AppWrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import FormError from 'views/Bridge/components/FormError'
import FileInput from 'components/FileInput'
import CreateModal from './components/CreateModal'
import { FormValues, schema } from './create-schema'
import { useState } from 'react'

export const CreateToken: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  })
  const [formValues, setFormValues] = useState<FormValues>()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = form

  const mintable = watch('mintable')
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
          <Heading as="h3" size="sm">
            Features
          </Heading>
          <Flex alignItems="center">
            <Checkbox type="checkbox" {...register('burnable')} scale="sm" id="burnable" />
            <Text as="label" ml="10px" style={{ userSelect: 'none' }} htmlFor="burnable">
              Burnable
            </Text>
          </Flex>
          <Flex alignItems="center">
            <Checkbox type="checkbox" {...register('mintable')} scale="sm" id="mintable" />
            <Text as="label" ml="10px" style={{ userSelect: 'none' }} htmlFor="mintable">
              Mintable
            </Text>
          </Flex>
          {mintable && (
            <Flex flexDirection="column">
              <Text>Max Supply</Text>
              <Input type="number" placeholder="Max Supply" {...register('maxSupply')} />
              {errors.maxSupply && <FormError>{errors.maxSupply.message}</FormError>}
            </Flex>
          )}
          <Button type="submit">Create Token</Button>
        </form>
      </FormProvider>
    </AppWrapper>
  )
}
