// فرمت کردن قیمت به تومان
export function formatPrice(price: bigint | number): string {
  const numPrice = typeof price === 'bigint' ? Number(price) : price
  return new Intl.NumberFormat('fa-IR').format(numPrice) + ' تومان'
}

// فرمت کردن تاریخ به فارسی
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

// فرمت کردن تاریخ و ساعت
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

// محاسبه پورسانت
export function calculateCommission(
  agreedPrice: bigint,
  commissionRate: number
): bigint {
  return BigInt(Math.round((Number(agreedPrice) * commissionRate) / 100))
}
