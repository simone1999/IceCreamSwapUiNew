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

  const schema = useMemo(
    () =>
      z
        .object({
          tokenName: z.string().min(1, t('Token name must be at least 1 character')),
          tokenSymbol: z.string().min(1, 'Token symbol must be at least 1 character'),
          initialSupply: z
            .string()
            .transform(Number)
            .refine((value) => value > 0, 'Must be greater than 0'),
          logo: z
            .any()
            .refine(
              (value) =>
                Array.isArray(value) &&
                typeof value[0] === 'object' &&
                value[0] instanceof File &&
                value[0].size < 100000,

              'Logo must be a file and less than 100kb',
            )
            .transform(async (value) => ({ fileName: value[0].name, blob: await toBase64(value[0]) }))
            .optional(),
          buyTax: z
            .string()
            .transform((value) => value.replace('%', ''))
            .transform(Number)
            .refine((value) => value >= 0, 'Must be positive')
            .refine((value) => value <= 10, 'Max 10%'),
          sellTax: z
            .string()
            .transform((value) => value.replace('%', ''))
            .transform(Number)
            .refine((value) => value >= 0, 'Must be positive')
            .refine((value) => value <= 10, 'Max 10%'),
          marketingDistribution: z
            .string()
            .transform((value) => value.replace('%', ''))
            .transform(Number)
            .refine((value) => value >= 0, 'Must be positive')
            .refine((value) => value <= 50, 'Can not be above 50%'),
          dividendDistribution: z
            .string()
            .transform((value) => value.replace('%', ''))
            .transform(Number)
            .refine((value) => value >= 0, 'Must be positive')
            .refine((value) => value <= 100, 'Can not be above 100%'),
          liquidityDistribution: z
            .string()
            .transform((value) => value.replace('%', ''))
            .transform(Number)
            .refine((value) => value >= 0, 'Must be positive')
            .refine((value) => value <= 100, 'Can not be above 100%'),
        })
        .refine((data) => data.sellTax <= data.buyTax * 2, {
          path: ['sellTax'],
          message: 'Sell Tax can be at most 2x Buy Tax',
        })
        .refine((data) => data.marketingDistribution + data.dividendDistribution + data.liquidityDistribution === 100, {
          path: ['marketingDistribution'],
          message: 'Tax distributions must sum to 100%',
        }),
    [t],
  )
  return schema
}

export type FormValues = z.infer<ReturnType<typeof useSchema>>
