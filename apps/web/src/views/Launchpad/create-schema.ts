import { string, z } from 'zod'
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
  const schema = useMemo(
    () =>
      z.object({
        tokenAddress: z.string().min(42),
        description: z.string().min(50, t('Description must be at least 50 character')),
        twitter: z.string(),
        telegram: z.string(),
        discord: z.string(),
        reddit: z.string(),
        github: z.string(),
        website: z.string().nonempty(),
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
          .refine((value) => value > 0, t('Must be greater than 0')),
        maxAllowed: z
          .string()
          .transform(Number)
          .refine((value) => value > 0, t('Must be greater than 0')),
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
        startDate: z.string(),
        endDate: z.string(),
        banner: z
          .any()
          .refine(
            (value) =>
              Array.isArray(value) &&
              typeof value[0] === 'object' &&
              value[0] instanceof File &&
              value[0].size < 500000,
            t('Banner must be a file and less than 500kb'),
          )
          .transform(async (value) => ({ fileName: value[0].name, blob: await toBase64(value[0]) }))
          .optional(),
      }),
    [t],
  )
  return schema
}

export type FormValues = z.infer<ReturnType<typeof useSchema>>
