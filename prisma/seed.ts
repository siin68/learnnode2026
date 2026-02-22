import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Bắt đầu seed data...');

  // Xóa data cũ (nếu có)
  await prisma.reservation.deleteMany();
  await prisma.tableFood.deleteMany();
  await prisma.table.deleteMany();
  await prisma.food.deleteMany();

  // 1. Tạo 10 món ăn
  const foods = await Promise.all([
    prisma.food.create({ data: { name: 'Phở bò', price: 50000, description: 'Phở bò Hà Nội truyền thống', imageUrl: 'https://example.com/pho-bo.jpg' } }),
    prisma.food.create({ data: { name: 'Cơm tấm sườn', price: 45000, description: 'Cơm tấm sườn nướng', imageUrl: 'https://example.com/com-tam.jpg' } }),
    prisma.food.create({ data: { name: 'Bún chả', price: 40000, description: 'Bún chả Hà Nội', imageUrl: 'https://example.com/bun-cha.jpg' } }),
    prisma.food.create({ data: { name: 'Bánh mì thịt', price: 25000, description: 'Bánh mì thịt pate', imageUrl: 'https://example.com/banh-mi.jpg' } }),
    prisma.food.create({ data: { name: 'Gỏi cuốn', price: 30000, description: 'Gỏi cuốn tôm thịt', imageUrl: 'https://example.com/goi-cuon.jpg' } }),
    prisma.food.create({ data: { name: 'Cà phê sữa đá', price: 20000, description: 'Cà phê sữa đá truyền thống', imageUrl: 'https://example.com/ca-phe.jpg' } }),
    prisma.food.create({ data: { name: 'Trà đá', price: 5000, description: 'Trà đá miễn phí', imageUrl: 'https://example.com/tra-da.jpg' } }),
    prisma.food.create({ data: { name: 'Mì Quảng', price: 45000, description: 'Mì Quảng đặc sản', imageUrl: 'https://example.com/mi-quang.jpg' } }),
    prisma.food.create({ data: { name: 'Bún bò Huế', price: 50000, description: 'Bún bò Huế cay', imageUrl: 'https://example.com/bun-bo-hue.jpg' } }),
    prisma.food.create({ data: { name: 'Chè ba màu', price: 25000, description: 'Chè ba màu mát lạnh', imageUrl: 'https://example.com/che.jpg' } }),
  ]);
  console.log('✅ Đã tạo 10 món ăn');

  // 2. Tạo 10 bàn
  const tables = await Promise.all([
    prisma.table.create({ data: { tableNumber: 1, capacity: 2, status: 'available' } }),
    prisma.table.create({ data: { tableNumber: 2, capacity: 4, status: 'available' } }),
    prisma.table.create({ data: { tableNumber: 3, capacity: 4, status: 'occupied' } }),
    prisma.table.create({ data: { tableNumber: 4, capacity: 6, status: 'available' } }),
    prisma.table.create({ data: { tableNumber: 5, capacity: 2, status: 'reserved' } }),
    prisma.table.create({ data: { tableNumber: 6, capacity: 8, status: 'available' } }),
    prisma.table.create({ data: { tableNumber: 7, capacity: 4, status: 'occupied' } }),
    prisma.table.create({ data: { tableNumber: 8, capacity: 6, status: 'available' } }),
    prisma.table.create({ data: { tableNumber: 9, capacity: 10, status: 'available' } }),
    prisma.table.create({ data: { tableNumber: 10, capacity: 4, status: 'available' } }),
  ]);
  console.log('✅ Đã tạo 10 bàn');

  // 3. Tạo 10 TableFood (món ăn trong bàn)
  await Promise.all([
    prisma.tableFood.create({ data: { tableId: tables[2].id, foodId: foods[0].id, quantity: 2, price: foods[0].price } }),
    prisma.tableFood.create({ data: { tableId: tables[2].id, foodId: foods[5].id, quantity: 2, price: foods[5].price } }),
    prisma.tableFood.create({ data: { tableId: tables[6].id, foodId: foods[1].id, quantity: 1, price: foods[1].price } }),
    prisma.tableFood.create({ data: { tableId: tables[6].id, foodId: foods[3].id, quantity: 2, price: foods[3].price } }),
    prisma.tableFood.create({ data: { tableId: tables[6].id, foodId: foods[6].id, quantity: 3, price: foods[6].price } }),
    prisma.tableFood.create({ data: { tableId: tables[2].id, foodId: foods[4].id, quantity: 1, price: foods[4].price } }),
    prisma.tableFood.create({ data: { tableId: tables[6].id, foodId: foods[8].id, quantity: 1, price: foods[8].price } }),
    prisma.tableFood.create({ data: { tableId: tables[2].id, foodId: foods[2].id, quantity: 1, price: foods[2].price } }),
    prisma.tableFood.create({ data: { tableId: tables[6].id, foodId: foods[7].id, quantity: 2, price: foods[7].price } }),
    prisma.tableFood.create({ data: { tableId: tables[2].id, foodId: foods[9].id, quantity: 2, price: foods[9].price } }),
  ]);
  console.log('✅ Đã tạo 10 TableFood');

  // 4. Tạo 10 Reservation (đặt chỗ)
  const now = new Date();
  await Promise.all([
    prisma.reservation.create({
      data: {
        tableId: tables[0].id,
        customerName: 'Nguyễn Văn A',
        customerPhone: '0901234567',
        customerEmail: 'nguyenvana@email.com',
        reservationDate: new Date(now.getTime() + 2 * 60 * 60 * 1000),
        numberOfPeople: 2,
        status: 'pending',
        notes: 'Gần cửa sổ'
      }
    }),
    prisma.reservation.create({
      data: {
        tableId: tables[4].id,
        customerName: 'Trần Thị B',
        customerPhone: '0912345678',
        customerEmail: 'tranthib@email.com',
        reservationDate: new Date(now.getTime() + 4 * 60 * 60 * 1000),
        numberOfPeople: 2,
        status: 'confirmed',
        notes: 'Sinh nhật'
      }
    }),
    prisma.reservation.create({
      data: {
        tableId: tables[1].id,
        customerName: 'Lê Văn C',
        customerPhone: '0923456789',
        reservationDate: new Date(now.getTime() + 6 * 60 * 60 * 1000),
        numberOfPeople: 4,
        status: 'pending'
      }
    }),
    prisma.reservation.create({
      data: {
        tableId: tables[3].id,
        customerName: 'Phạm Thị D',
        customerPhone: '0934567890',
        customerEmail: 'phamthid@email.com',
        reservationDate: new Date(now.getTime() + 24 * 60 * 60 * 1000),
        numberOfPeople: 6,
        status: 'pending',
        notes: 'Họp công ty'
      }
    }),
    prisma.reservation.create({
      data: {
        tableId: tables[5].id,
        customerName: 'Hoàng Văn E',
        customerPhone: '0945678901',
        reservationDate: new Date(now.getTime() + 48 * 60 * 60 * 1000),
        numberOfPeople: 8,
        status: 'confirmed'
      }
    }),
    prisma.reservation.create({
      data: {
        tableId: tables[7].id,
        customerName: 'Vũ Thị F',
        customerPhone: '0956789012',
        customerEmail: 'vuthif@email.com',
        reservationDate: new Date(now.getTime() - 24 * 60 * 60 * 1000),
        numberOfPeople: 4,
        status: 'completed',
        notes: 'Đã hoàn thành'
      }
    }),
    prisma.reservation.create({
      data: {
        tableId: tables[8].id,
        customerName: 'Đỗ Văn G',
        customerPhone: '0967890123',
        reservationDate: new Date(now.getTime() + 3 * 60 * 60 * 1000),
        numberOfPeople: 10,
        status: 'pending',
        notes: 'Tiệc lớn'
      }
    }),
    prisma.reservation.create({
      data: {
        tableId: tables[9].id,
        customerName: 'Bùi Thị H',
        customerPhone: '0978901234',
        customerEmail: 'buithih@email.com',
        reservationDate: new Date(now.getTime() - 2 * 60 * 60 * 1000),
        numberOfPeople: 3,
        status: 'cancelled',
        notes: 'Hủy bỏ'
      }
    }),
    prisma.reservation.create({
      data: {
        tableId: tables[2].id,
        customerName: 'Đinh Văn I',
        customerPhone: '0989012345',
        reservationDate: new Date(now.getTime() + 12 * 60 * 60 * 1000),
        numberOfPeople: 4,
        status: 'confirmed'
      }
    }),
    prisma.reservation.create({
      data: {
        tableId: tables[6].id,
        customerName: 'Cao Thị K',
        customerPhone: '0990123456',
        customerEmail: 'caothik@email.com',
        reservationDate: new Date(now.getTime() + 36 * 60 * 60 * 1000),
        numberOfPeople: 5,
        status: 'pending',
        notes: 'Gần quầy bar'
      }
    }),
  ]);
  console.log('✅ Đã tạo 10 Reservation');

  console.log('🎉 Seed data thành công!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
