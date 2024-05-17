import { z } from 'zod'
import { useMemo } from 'react'
import { useTranslation } from '@pancakeswap/localization'

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export const useSchema = () => {
  const { t } = useTranslation()
  return useMemo(
    () =>
      z.object({
        tokenAddress: z.string().length(42, t('Address must be 42 characters')),
        description: z.string().min(50, t('Description must be at least 50 characters')),
        twitter: z.string().optional(),
        telegram: z.string().optional(),
        discord: z.string().optional(),
        reddit: z.string().optional(),
        github: z.string().optional(),
        website: z.string().url(t('Website must be a valid url')),
        hardCap: z
          .string()
          .transform(Number)
          .refine((value) => value > 0, t('Must be greater than 0')),
        softCap: z
          .string()
          .transform(Number)
          .refine((value) => value > 0, t('Must be greater than 0')),
        minAllowed: z
          .string()
          .transform(Number)
          .refine((value) => value >= 0, t('Must be positive')),
        maxAllowed: z
          .string()
          .transform(Number)
          .refine((value) => value >= 0, t('Must be positive')),
        poolRate: z
          .string()
          .transform(Number)
          .refine((value) => value > 0, t('Must be greater than 0'))
          .refine((value) => value <= 100, t('Must be less than or equal to 100')),
        rate: z
          .string()
          .transform(Number)
          .refine((value) => value > 0, t('Must be greater than 0')),
        liquidityRate: z
          .string()
          .transform(Number)
          .refine((value) => value > 0, t('Must be greater than 0')),
        startDate: z
          .date()
          .refine(value => value > new Date, t('Must be in future')),
        endDate: z
          .date()
          .refine(value => value > new Date, t('Must be in future')),
        liquidityUnlockDate: z.date(),
        vestingPercentage: z
          .string()
          .transform(Number)
          .refine((value) => 0 <= value && value <= 100, t('Must be between 0 and 100')),
        vestingEndDate: z
          .date()
          .refine(value => value > new Date, t('Must be in future')),
        banner: z
          .any()
          .refine(
            (value) =>
              Array.isArray(value) && typeof value[0] === 'object' && value[0] instanceof File && value[0].size < 500000,
            t('Banner must be a file and less than 500kb'),
          )
          .transform(async (value) => ({ fileName: value[0].name, blob: await toBase64(value[0]) }))
          .optional(),
      })
        .refine(value => value.endDate > value.startDate, {
          message: "campaign end must be after campaign start",
          path: ["endDate"]
        })
        .refine(value => value.vestingPercentage === 0 || value.vestingEndDate > value.endDate, {
          message: "vesting end needs to be after campaign end",
          path: ["vestingEndDate"]
        })
        .refine(value => value.liquidityUnlockDate > new Date(value.endDate.getTime() + 1000*60*60*24*29*3), {
          message: "liquidity needs to be locked for at least 3 months",
          path: ["liquidityUnlockDate"]
        })
        .refine(value => value.softCap <= value.hardCap, {
          message: "soft cap bigger than hard cap",
          path: ["softCap"]
        })
        .refine(value => value.softCap * 2 >= value.hardCap, {
          message: "soft cap needs to be at least 50% of hard cap",
          path: ["softCap"]
        })
        .refine(value => value.minAllowed <= value.maxAllowed, {
          message: "min contribution can not be bigger than max contribution",
          path: ["minAllowed"]
        })
        .refine(value => value.minAllowed * 10 <= value.hardCap, {
          message: "min contribution can not be more than 10% of hard cap",
          path: ["minAllowed"]
        })
        .refine(value => value.rate >= value.liquidityRate, {
          message: "listing rate needs to be same or lower than presale rate",
          path: ["liquidityRate"]
        })
    , [t],
  )
}

export type FormValues = z.infer<ReturnType<typeof useSchema>>
