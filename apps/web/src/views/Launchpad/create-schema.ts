import { z } from 'zod'

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export const schema = z.object({
  tokenAddress: z.string(),
  description: z.string().min(50, 'Description must be at least 50 character'),
  hardCap: z
    .string()
    .transform(Number)
    .refine((value) => value > 0, 'Must be greater than 0'),
  softCap: z
    .string()
    .transform(Number)
    .refine((value) => value > 0, 'Must be greater than 0'),
  minAllowed: z
    .string()
    .transform(Number)
    .refine((value) => value > 0, 'Must be greater than 0'),
  maxAllowed: z
    .string()
    .transform(Number)
    .refine((value) => value > 0, 'Must be greater than 0'),
  poolRate: z
    .string()
    .transform(Number)
    .refine((value) => value > 0, 'Must be greater than 0')
    .refine((value) => value <= 100, 'Must be less than or equal to 100'),
  rate: z
    .string()
    .transform(Number)
    .refine((value) => value > 0, 'Must be greater than 0'),
  liquidityRate: z
    .string()
    .transform(Number)
    .refine((value) => value > 0, 'Must be greater than 0'),
  startDate: z.date(),
  endDate: z.date(),
  banner: z
    .any()
    .refine(
      (value) =>
        Array.isArray(value) && typeof value[0] === 'object' && value[0] instanceof File && value[0].size < 500000,

      'Banner must be a file and less than 500kb',
    )
    .transform(async (value) => ({ fileName: value[0].name, blob: await toBase64(value[0]) }))
    .optional(),
})

export type FormValues = z.infer<typeof schema>
