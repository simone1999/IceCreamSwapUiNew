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
  Alert,
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
import { useUser } from 'strict/hooks/useUser'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { ICE } from '@pancakeswap/tokens'
import { useFormContext } from 'react-hook-form'

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
    watch,
  } = form

  const watchedFormValues = watch()

  const [onPresentCreateModal] = useModal(<CreateModal formValues={formValues} />, true, true, 'tokenCreateModal')

  const { address } = useAccount()
  const [kyced, setKyced] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [index, setIndex] = useState(0)
  const user = useUser()
  const { chainId } = useActiveChainId()
  const [progress, setProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const raisedToken = ICE[chainId]

  const goToNextPage = () => {
    if (index < 8) {
      // Since index is 0-based, 5 represents the 6th page
      const nextIndex = index + 1 < content.length ? index + 1 : 0
      setIndex(nextIndex)
      progress < 100 ? setProgress(progress + 12.5) : setProgress(0)
    }
  }
  const goToPreviousPage = () => {
    if (index > 0) {
      // Ensure index is within bounds
      setIndex(index - 1)
      // Decrease progress but ensure it doesn't go below 0
      setProgress(progress > 0 ? progress - 12.5 : 0)
    }
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

  const content = [
    { heading: 'Enter your Token Address', text: 'Lorem ipsum dolor sit amet.', infoText: 'Info about Token Address' },
    { heading: 'Set your Presale Dates', text: 'Lorem ipsum dolor sit amet.', infoText: 'Info about Presale Dates' },
    {
      heading: 'Set your Soft and Hard Cap',
      text: 'Lorem ipsum dolor sit amet.',
      infoText: 'Info about Soft and Hard Cap',
    },
    {
      heading: 'Set your Min and Max Contribution',
      text: 'Lorem ipsum dolor sit amet.',
      infoText: 'Info about Min and Max Contribution',
    },
    {
      heading: 'Set your Presale and Listing Rate',
      text: 'Lorem ipsum dolor sit amet.',
      infoText: 'Info about Presale and Listing Rate',
    },
    {
      heading: 'Set your Liquidity Rate and Unlock Date',
      text: 'Lorem ipsum dolor sit amet.',
      infoText: 'Info about Liquidity Rate and Unlock Date',
    },
    {
      heading: 'Set your Vesting Percentage and End Date',
      text: 'Lorem ipsum dolor sit amet.',
      infoText: 'Info about Vesting Percentage and End Date',
    },
    { heading: 'Add your Socials', text: 'Lorem ipsum dolor sit amet.', infoText: 'Info about Socials' },
    { heading: 'Preview', text: 'Lorem ipsum dolor sit amet.', infoText: 'Preview' },
  ]

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
              <Flex flexDirection="column" justifyItems="center" alignItems="center">
                <div
                  style={{
                    padding: '16px',
                    width: '400px',
                  }}
                >
                  <Box>
                    <Progress variant="round" primaryStep={progress} />
                  </Box>
                </div>
              </Flex>

              <Flex flexDirection="row" justifyContent="center" style={{ marginLeft: 20 }}>
                <Flex flexDirection="column" justifyItems="center" alignItems="center">
                  <Heading as="h1" fontSize="20px" fontWeight="bold" marginBottom="7px">
                    {currentContent.heading}
                  </Heading>
                  <Text fontSize="14px" marginBottom="7px">
                    {currentContent.text}
                  </Text>
                </Flex>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width="20px"
                    height="20px"
                    style={{ marginLeft: 20 }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <path
                      fill="white"
                      d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"
                    />
                  </svg>
                  {isHovered && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '25px', // Adjust based on SVG height and desired spacing
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '5px',
                        backgroundColor: 'white',
                        border: '1px solid black',
                        borderRadius: '5px',
                        zIndex: 1000,
                        width: '100px', // Adjust width as needed
                        minHeight: '10px', // Use minHeight for flexible height based on content
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text fontSize="10px" marginBottom="7px" color="black" textAlign="center">
                        {currentContent.infoText}
                      </Text>
                    </div>
                  )}
                </div>
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
                      {t('Minimum %raisedTokenSymbol% a contributor is allowed to contribute', {
                        raisedTokenSymbol: raisedToken.symbol,
                      })}
                    </Text>
                    <Input placeholder={t('Minimum Allowed')} {...register('minAllowed')} />
                    {errors.minAllowed && <FormError>{errors.minAllowed.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">
                      {t('Maximum %raisedTokenSymbol% a contributor is allowed to contribute', {
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
                    <Text marginBottom="7px">{t(`Tokens per 1 ${raisedToken.symbol} at Presale`)}</Text>
                    <Input placeholder={t('Presale Rate')} {...register('rate')} />
                    {errors.rate && <FormError>{errors.rate.message}</FormError>}
                  </Flex>
                  <Flex flexDirection="column">
                    <Text marginBottom="7px">
                      {t(`Tokens per 1 ${raisedToken.symbol} after Presale (DEX listing)`)}
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
                      {t('percentage of raised %raisedTokenSymbol% used to provide Liquidity', {
                        raisedTokenSymbol: raisedToken.symbol,
                      })}
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
                    const stringValue = JSON.stringify(value, null, 2)
                    const labels = [
                      'Token Address',
                      'Description',
                      'Presale start',
                      'Presale end',
                      'Soft Cap',
                      'Hard Cap',
                      'Minimum contribute',
                      'Maximum contribute',
                      'Tokens per 1$ at Presale',
                      'Tokens per 1$ after Presale (DEX listing)',
                      'Percentage to provide Liquidity',
                      'Liquidity unlock date',
                      'Contributor vesting percentage',
                      'End of vesting period',
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
                    )
                  })}
                </Flex>
              )}

              {index === 8 && (
                <Column>
                  <ButtonMenu fullWidth scale="sm" variant="subtle" marginY="7px" onItemClick={goToPreviousPage}>
                    {[<ButtonMenuItem>Back</ButtonMenuItem>]}
                  </ButtonMenu>

                  <Button type="submit" variant="primary" marginBottom="7px">
                    {t('Create Campaign')}
                  </Button>
                </Column>
              )}
            </>
          )}
        </form>
      </FormProvider>
    </AppWrapper>
  )
}
