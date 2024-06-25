import {
  Button,
  ButtonMenu,
  ButtonMenuItem,
  Column,
  Flex,
  Input,
  Row,
  Spinner,
  Text,
  useModal,
  Heading,
  Progress,
  Box,
} from '@pancakeswap/uikit'
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
import { useActiveChainId } from 'hooks/useActiveChainId'
import { ICE } from '@pancakeswap/tokens'
import ConnectWalletButton from "components/ConnectWalletButton";

export const CreateCampaign: React.FC = () => {

  const { chainId } = useActiveChainId()
  const raisedToken = ICE[chainId]

  const content = [
    {
      heading: 'Basic token details',
      text: 'Enter the basic details about your Token launch',
    },
    {
      heading: 'Presale timing',
      text: 'Specify when your presale begins and ends',
    },
    {
      heading: 'Soft and Hard Cap',
      text: `Set the minimum and maximum amount of ${raisedToken.symbol} for this Campaign to raise`,
    },
    {
      heading: 'Min and Max Contribution',
      text: `Min/Max ${raisedToken.symbol} users are allowed to contribute to your Campaign. Set to 0 to disable`,
    },
    {
      heading: 'Presale and Listing Rate',
      text: `Amount of tokens user receive for 1 ${raisedToken.symbol} Token`,
    },
    {
      heading: 'Automatic Liquidity provision',
      text: `percentage of raised ${raisedToken.symbol} used to automatically provide Liquidity and till when this liquidity will be locked`,
    },
    {
      heading: 'Vesting',
      text: 'Example: 80% over 2 months means users receive 20% immediately and 80% distributed over 2 month. Set to 0 to disable.',
    },
    {
      heading: 'Project Socials',
      text: 'Specify the socials of your Project. Website is required, rest is optional',
    },
    {
      heading: 'Preview',
      text: 'Check the parameters for your Campaign',
    },
  ]

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
    watch,
  } = form

  const watchedFormValues = watch()

  const [onPresentCreateModal] = useModal(<CreateModal formValues={formValues} />, true, true, 'tokenCreateModal')

  const { address, isConnected } = useAccount()
  const [kyced, setKyced] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(100 / (content.length + 1))

  const goToNextPage = () => {
    // Ensure index is within bounds
    if (index < content.length) {
      const nextIndex = index + 1
      setIndex(nextIndex)
      setProgress(100 * (nextIndex + 1) / (content.length + 1))
    }
  }
  const goToPreviousPage = () => {
    // Ensure index is within bounds
    if (index > 0) {
      const nextIndex = index - 1
      setIndex(nextIndex)
      // Decrease progress but ensure it doesn't go below 0
      setProgress(100 * (nextIndex + 1) / (content.length + 1))
    }
  }

  const getKyced = async () => {
    setLoading(true)
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
    if (!isConnected) {
      setLoading(false)
      setKyced(false)
    } else if (!kyced) {
      getKyced()
    }
  }, [isConnected, address])

  const currentContent = content[index]

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
            !isConnected?
              <>
                <Heading as="h1" fontSize="20px" fontWeight="bold" marginBottom="7px">
                  Please connect your Wallet
                </Heading>
                <ConnectWalletButton/>
              </>
            :
              <>
                <span style={{ margin: 'auto', textAlign: 'center', width: '75%' }}>
                  <FormError>You must first become KYC verified to create a campaign.</FormError>
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
              <Flex flexDirection="column" justifyItems="center" alignItems="center">
                <div
                  style={{
                    padding: '16px',
                    width: '100%',
                  }}
                >
                <Box>
                  <Progress variant="round" primaryStep={progress} />
                </Box>
                </div>
              </Flex>
              <Flex flexDirection="column" justifyItems="center" alignItems="center">
                <Heading as="h1" fontSize="20px" fontWeight="bold" marginBottom="7px">
                  {currentContent.heading}
                </Heading>
                <Text fontSize="14px" marginBottom="7px" textAlign={"center"} maxWidth={"450px"}>
                  {currentContent.text}
                </Text>
              </Flex>
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
                </>
              )}
              {index === 1 && (
                <>
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
                </>
              )}
              {index === 2 && (
                <>
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
                </>
              )}
              {index === 3 && (
                <>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">
                      {t('Min contribution', {
                        raisedTokenSymbol: raisedToken.symbol,
                      })}
                    </Text>
                    <Input placeholder={t('Minimum Allowed')} {...register('minAllowed')} />
                    {errors.minAllowed && <FormError>{errors.minAllowed.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">
                      {t('Max contribution', {
                        raisedTokenSymbol: raisedToken.symbol,
                      })}
                    </Text>
                    <Input placeholder={t('Maximum Allowed')} {...register('maxAllowed')} />
                    {errors.maxAllowed && <FormError>{errors.maxAllowed.message}</FormError>}
                  </Flex>
                </>
              )}
              {index === 4 && (
                <>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t(`Presale Rate`)}</Text>
                    <Input placeholder={t('Presale Rate')} {...register('rate')} />
                    {errors.rate && <FormError>{errors.rate.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">
                      {t(`Rate after presale (lower)`)}
                    </Text>
                    <Input placeholder={t('Listing Rate')} {...register('poolRate')} />
                    {errors.poolRate && <FormError>{errors.poolRate.message}</FormError>}
                  </Flex>
                </>
              )}
              {index === 5 && (
                <>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">
                      Liquidity percentage
                    </Text>
                    <Input placeholder={t('Liquidity %')} {...register('liquidityRate')} />
                    {errors.liquidityRate && <FormError>{errors.liquidityRate.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">{t('Liquidity unlock date')}</Text>
                    <Input type="date" placeholder={t('Unlock Date')} {...register('liquidityUnlockDate')} />
                    {errors.liquidityUnlockDate && <FormError>{errors.liquidityUnlockDate.message}</FormError>}
                  </Flex>
                </>
              )}
              {index === 6 && (
                <>
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
              {index === 7 && (
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
              {index === 0 && (
                <ButtonMenu fullWidth scale="sm" variant="subtle" marginY="7px" onItemClick={goToNextPage}>
                  {[<ButtonMenuItem>Next</ButtonMenuItem>]}
                </ButtonMenu>
              )}
              {index >= 1 && index <= 7 && (
                <Row>
                  <ButtonMenu fullWidth scale="sm" variant="subtle" marginY="7px" onItemClick={goToPreviousPage}>
                    {[<ButtonMenuItem>Back</ButtonMenuItem>]}
                  </ButtonMenu>
                  <ButtonMenu fullWidth scale="sm" marginY="7px" onItemClick={goToNextPage}>
                    {[<ButtonMenuItem>Next</ButtonMenuItem>]}
                  </ButtonMenu>
                </Row>
              )}

              {index === 8 && (
                <Flex flexDirection="column" justifyContent="center">
                  {Object.entries(watchedFormValues).map(([key, value], index) => {
                    const stringValue = String(value)
                    const labels = [
                      'Token Address',
                      'Project Description',
                      'Presale start',
                      'Presale end',
                      'Soft Cap',
                      'Hard Cap',
                      'Minimum contribute',
                      'Maximum contribute',
                      'Presale rate',
                      'Listing rate',
                      'Liquidity %',
                      'Liquidity unlock date',
                      'Vesting percentage',
                      'Vesting end',
                      'Website',
                      'Twitter',
                      'Telegram',
                      'Discord',
                      'Reddit',
                      'GitHub',
                    ]
                    return (
                      <Flex
                        key={key}
                        flexDirection="column"
                      >
                        <Flex
                          flexDirection="row"
                          justifyContent="center"
                          alignItems="center"
                          marginBottom="7px"
                        >
                          <div style={{ width: '100%' }}>{labels[index]}:</div>
                          <Text
                            key={index} // Assuming each stringValue is unique for simplicity
                            style={{
                              whiteSpace: 'nowrap', // 'normal' allows text to wrap
                              overflow: 'hidden', // Hide overflow
                              textOverflow: 'ellipsis', // Add ellipsis to indicate hidden text
                              fontSize: stringValue.length > 50 ? '10px' : 'inherit',
                              width: '75%', // Adjust width as needed
                            }}
                          >
                            {value ? stringValue : '-'}
                          </Text>
                        </Flex>
                        {errors[key] && <FormError>{errors[key].message}</FormError>}
                      </Flex>
                    )
                  })}
                </Flex>
              )}

              {index === 8 && (
                <Column>
                  <ButtonMenu fullWidth scale="sm" variant="subtle" marginY="7px" onItemClick={goToPreviousPage}>
                    {[<ButtonMenuItem>Back</ButtonMenuItem>]}
                  </ButtonMenu>

                  <Button type="submit" variant="primary" marginBottom="7px" disabled={Object.keys(errors).length > 0}>
                    {t('Create Campaign')}
                  </Button>
                  {Object.keys(errors).length > 0 && <FormError>Not all Values are valid, please correct them</FormError>}
                </Column>
              )}
            </>
          )}
        </form>
      </FormProvider>
    </AppWrapper>
  )
}
