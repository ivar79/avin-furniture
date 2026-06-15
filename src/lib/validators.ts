import { z } from 'zod'

// اعتبارسنجی شماره موبایل ایرانی
export const iranPhoneRegex = /^(\+98|0098|98|0)?9[0-9]{9}$/

export const orderRequestSchema = z.object({
  customerName: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  customerPhone: z.string().regex(iranPhoneRegex, 'شماره موبایل معتبر نیست'),
  customerCity: z.string().min(2, 'شهر را انتخاب کنید'),
  customerMessage: z.string().optional(),
  productId: z.string(),
})

export type OrderRequestInput = z.infer<typeof orderRequestSchema>
