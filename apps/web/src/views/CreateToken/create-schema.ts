import { z } from 'zod'

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export const schema = z
  .object({
    tokenName: z.string().min(1, 'Token name must be at least 1 character'),
    tokenSymbol: z.string().min(1, 'Token symbol must be at least 1 character'),
    initialSupply: z
      .string()
      .transform(Number)
      .refine((value) => value > 0, 'Must be greater than 0'),
    burnable: z.boolean().default(false),
    mintable: z.boolean().default(false),
    logo: z
      .any()
      .refine(
        (value) =>
          Array.isArray(value) && typeof value[0] === 'object' && value[0] instanceof File && value[0].size < 100000,

        'Logo must be a file and less than 100kb',
      )
      .transform(async (value) => ({ fileName: value[0].name, blob: await toBase64(value[0]) }))
      .optional(),
    maxSupply: z
      .string()
      .transform(Number)
      .refine((value) => value > 0, 'Must be greater than 0')
      .optional(),
  })
  .refine((data) => (data.maxSupply ? data.maxSupply > data.initialSupply : true), {
    path: ['maxSupply'],
    message: 'Max supply must be greater than initial supply',
  })

export type FormValues = z.infer<typeof schema>
