import { Prisma, PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 شروع seed دیتابیس...')

  // 1. ساخت ادمین
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  })
  console.log('✅ ادمین ساخته شد:', admin.username)

  // 2. ساخت نمایشگاه‌ها
  const showroom1 = await prisma.showroom.upsert({
    where: { id: 'showroom-1' },
    update: {},
    create: {
      id: 'showroom-1',
      name: 'نمایشگاه مبلمان آرین',
      city: 'تهران',
      contactPhone: '02188776655',
      contactName: 'آقای احمدی',
      commissionRate: new Prisma.Decimal(15),
      address: 'تهران، خیابان ولیعصر، نرسیده به میدان ونک',
    },
  })

  const showroom2 = await prisma.showroom.upsert({
    where: { id: 'showroom-2' },
    update: {},
    create: {
      id: 'showroom-2',
      name: 'گالری مبل پارسیان',
      city: 'اصفهان',
      contactPhone: '03136554433',
      contactName: 'آقای محمدی',
      commissionRate: new Prisma.Decimal(12),
      address: 'اصفهان، خیابان چهارباغ عباسی',
    },
  })
  console.log('✅ نمایشگاه‌ها ساخته شدند')

  // 3. ساخت دسته‌بندی‌ها
  const categories = [
    { name: 'مبل راحتی', slug: 'sofa', sortOrder: 1 },
    { name: 'کاناپه', slug: 'couch', sortOrder: 2 },
    { name: 'مبل ال شکل', slug: 'l-shape', sortOrder: 3 },
    { name: 'صندلی راحتی', slug: 'armchair', sortOrder: 4 },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }
  console.log('✅ دسته‌بندی‌ها ساخته شدند')

  // 4. ساخت محصولات نمونه
  const sofaCategory = await prisma.category.findUnique({
    where: { slug: 'sofa' },
  })
  const couchCategory = await prisma.category.findUnique({
    where: { slug: 'couch' },
  })

  const products = [
    {
      name: 'مبل راحتی مدرن سه نفره',
      slug: 'modern-sofa-3-seater',
      description: 'مبل راحتی سه نفره با طراحی مدرن و پارچه مخملی درجه یک',
      basePrice: BigInt(45000000),
      categoryId: sofaCategory!.id,
      showroomId: showroom1.id,
      isFeatured: true,
      colors: ['خاکستری', 'آبی', 'کرم'],
      material: 'پارچه مخمل',
      dimensions: '220x90x85 سانتیمتر',
      fabricType: 'مخمل ضد آب',
      innerFrame: 'چوب راش خشک',
      seatSponge: 'فوم سرد ۳۵ کیلویی',
      images: ['/placeholder-sofa.jpg'],
    },
    {
      name: 'کاناپه دو نفره چستر',
      slug: 'chesterfield-loveseat',
      description: 'کاناپه کلاسیک دو نفره با طرح چستر و روکش چرم',
      basePrice: BigInt(38000000),
      categoryId: couchCategory!.id,
      showroomId: showroom1.id,
      isFeatured: true,
      colors: ['قهوه‌ای', 'سیاه'],
      material: 'چرم طبیعی',
      dimensions: '160x85x80 سانتیمتر',
      fabricType: 'چرم گاوی',
      innerFrame: 'چوب بلوط',
      seatSponge: 'فوم فشرده ۴۰ کیلویی',
      images: ['/placeholder-couch.jpg'],
    },
    {
      name: 'مبل ال شکل پنج نفره',
      slug: 'l-shape-5-seater',
      description: 'مبل ال شکل پنج نفره مناسب فضاهای بزرگ',
      basePrice: BigInt(62000000),
      categoryId: sofaCategory!.id,
      showroomId: showroom2.id,
      isFeatured: true,
      colors: ['طوسی', 'بژ', 'سبز یشمی'],
      material: 'پارچه کتان',
      dimensions: '280x180x90 سانتیمتر',
      fabricType: 'کتان آنتی باکتریال',
      innerFrame: 'فلز و چوب ترکیبی',
      seatSponge: 'فوم سرد ۳۸ کیلویی',
      images: ['/placeholder-l-shape.jpg'],
    },
    {
      name: 'صندلی راحتی تک نفره',
      slug: 'single-armchair',
      description: 'صندلی راحتی تک نفره با پایه چوبی',
      basePrice: BigInt(18000000),
      categoryId: couchCategory!.id,
      showroomId: showroom2.id,
      isFeatured: false,
      colors: ['زرد', 'صورتی', 'آبی فیروزه‌ای'],
      material: 'پارچه کنفی',
      dimensions: '80x75x85 سانتیمتر',
      images: ['/placeholder-armchair.jpg'],
    },
    {
      name: 'مبل راحتی کلاسیک هفت نفره',
      slug: 'classic-sofa-7-seater',
      description: 'ست مبل کلاسیک هفت نفره با طرح سلطنتی',
      basePrice: BigInt(95000000),
      categoryId: sofaCategory!.id,
      showroomId: showroom1.id,
      isFeatured: false,
      colors: ['طلایی', 'نقره‌ای'],
      material: 'پارچه اکلیلی',
      dimensions: 'سه نفره + دو عدد دو نفره',
      fabricType: 'پارچه اکلیلی ترک',
      innerFrame: 'چوب توسکا',
      seatSponge: 'فوم سرد و ابر ترکیبی',
      images: ['/placeholder-classic.jpg'],
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }
  console.log('✅ محصولات نمونه ساخته شدند')

  console.log('🎉 seed با موفقیت تکمیل شد!')
}

main()
  .catch((e) => {
    console.error('❌ خطا در seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
