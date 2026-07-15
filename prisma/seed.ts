import { Prisma, PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { USER_STARTING_BALANCE } from "../src/lib/starting-balance";

const prisma = new PrismaClient();

const categories = [
  ["Pulsa", "pulsa", "Phone", "Produk pulsa semua operator"],
  ["Paket Data", "paket-data", "Smartphone", "Paket internet operator seluler"],
  ["PLN", "pln", "Bolt", "Token dan tagihan listrik PLN"],
  ["PDAM", "pdam", "Droplets", "Pembayaran air wilayah Indonesia"],
  ["BPJS", "bpjs", "HeartPulse", "Pembayaran BPJS Kesehatan"],
  ["E-Wallet", "e-wallet", "WalletCards", "Top up dompet digital"],
  ["Voucher Game", "voucher-game", "Gamepad2", "Voucher dan diamond game"],
  ["Voucher Belanja", "voucher-belanja", "UtensilsCrossed", "Voucher restoran, cafe, dan merchant belanja"]
];

function product(categorySlug: string, name: string, providerName: string, price: number, fee = 1000) {
  return { categorySlug, name, providerName, price, fee };
}

const productRows = [
  ...[10000, 20000, 50000, 100000].map((v) => product("pulsa", `Pulsa Telkomsel ${v / 1000}K`, "Telkomsel", v + 1500)),
  ...["Telkomsel 10GB 30 Hari", "XL 12GB 30 Hari", "Indosat 15GB 30 Hari"].map((name, i) => product("paket-data", `Paket Data ${name}`, name.split(" ")[0], [65000, 78000, 72000][i])),
  ...[20000, 50000, 100000, 200000].map((v) => product("pln", `Token PLN ${v / 1000}K`, "PLN", v, 2500)),
  product("bpjs", "BPJS Kelas 3 1 Bulan", "BPJS", 42000, 2500),
  ...["GoPay", "OVO", "DANA", "ShopeePay"].map((wallet) => product("e-wallet", `${wallet} Top Up 100K`, wallet, 100000, 1000)),
  product("voucher-game", "Mobile Legends 86 Diamond", "Moonton", 22000),
  product("voucher-game", "Free Fire 140 Diamond", "Garena", 20000)
];

async function main() {
  await prisma.notification.deleteMany();
  await prisma.activityLog.deleteMany();
  await prisma.commission.deleteMany();
  await prisma.referral.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.balanceMutation.deleteMany();
  await prisma.deposit.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.voucherOrder.deleteMany();
  await prisma.foodVoucher.deleteMany();
  await prisma.product.deleteMany();
  await prisma.productCategory.deleteMany();
  await prisma.provider.deleteMany();
  await prisma.promo.deleteMany();
  await prisma.sellerProfile.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const provider = await prisma.provider.create({
    data: { name: "NusaPay Aggregator", code: "NUSAPAY", baseUrl: "https://sandbox.provider.local/api", apiKeyMasked: "np_live_****_masked", priority: 1 }
  });

  const categoryMap = new Map<string, string>();
  for (const [name, slug, icon, description] of categories) {
    const category = await prisma.productCategory.create({ data: { name, slug, icon, description } });
    categoryMap.set(slug, category.id);
  }

  for (const row of productRows) {
    const code = row.name.toUpperCase().replace(/[^A-Z0-9]+/g, "_").replace(/^_|_$/g, "");
    await prisma.product.create({
      data: {
        categoryId: categoryMap.get(row.categorySlug)!,
        providerId: provider.id,
        name: row.name,
        code,
        providerName: row.providerName,
        type: row.categorySlug,
        description: `${row.name} diproses melalui provider dummy realistis.`,
        costPrice: new Prisma.Decimal(row.price * 0.96),
        sellPrice: new Prisma.Decimal(row.price),
        adminFee: new Prisma.Decimal(row.fee)
      }
    });
  }

  const admin = await prisma.user.create({
    data: {
      name: "Admin VoucherPPOB",
      email: "admin@voucherppob.com",
      phone: "081111111111",
      password: await hash("admin123456", 12),
      role: "ADMIN",
      balance: 10000000,
      referralCode: "ADMINVOUCHER"
    }
  });

  const seller = await prisma.user.create({
    data: {
      name: "Seller Approved",
      email: "seller@voucherppob.com",
      phone: "083333333333",
      password: await hash("seller123456", 12),
      role: "SELLER",
      balance: 250000,
      referralCode: "SELLERNUSA",
      sellerProfile: {
        create: {
          storeName: "Dapur Nusantara",
          storeSlug: "dapur-nusantara",
          description: "Seller belanja dan voucher kuliner aktif.",
          address: "Jl. Seller No. 1",
          city: "Jakarta",
          status: "APPROVED",
          approvedAt: new Date()
        }
      }
    }
  });

  await prisma.user.create({
    data: {
      name: "Seller Pending",
      email: "sellerpending@voucherppob.com",
      phone: "084444444444",
      password: await hash("seller123456", 12),
      role: "SELLER",
      balance: 0,
      referralCode: "SELLERPEND",
      sellerProfile: {
        create: {
          storeName: "Kopi Menunggu",
          storeSlug: "kopi-menunggu",
          description: "Seller pending untuk test approval admin.",
          address: "Jl. Pending No. 2",
          city: "Bandung"
        }
      }
    }
  });

  const user = await prisma.user.create({
    data: {
      name: "User Demo",
      email: "user@voucherppob.com",
      phone: "082222222222",
      password: await hash("user123456", 12),
      balance: USER_STARTING_BALANCE,
      referralCode: "USERVOUCH",
      referredById: admin.id
    }
  });

  const foodCategoryId = categoryMap.get("voucher-belanja")!;
  const foodVouchers = [
    ["Paket Ayam Geprek Hemat", "Voucher ayam geprek, nasi, dan es teh.", 25000, 30],
    ["Kopi Susu + Croissant", "Voucher cafe untuk kopi susu dan croissant butter.", 38000, 20],
    ["Bakso Komplit Berdua", "Voucher Belanja berdua untuk bakso komplit.", 45000, 15],
    ["Sushi Bento Lunch", "Voucher lunch bento sushi pilihan.", 65000, 12]
  ];

  for (const [title, description, price, stock] of foodVouchers) {
    await prisma.foodVoucher.create({
      data: {
        sellerId: seller.id,
        categoryId: foodCategoryId,
        title: String(title),
        code: String(title).toUpperCase().replace(/[^A-Z0-9]+/g, "_"),
        description: String(description),
        restaurant: "Dapur Nusantara",
        city: "Jakarta",
        price: Number(price),
        stock: Number(stock),
        validUntil: new Date("2027-01-01")
      }
    });
  }

  const products = await prisma.product.findMany({ take: 8, include: { category: true } });
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const total = p.sellPrice.plus(p.adminFee);
    await prisma.transaction.create({
      data: {
        userId: user.id,
        productId: p.id,
        transactionNumber: `TRX-SEED-${String(i + 1).padStart(3, "0")}`,
        customerNumber: `08${Math.floor(1000000000 + Math.random() * 8999999999)}`,
        productName: p.name,
        categoryName: p.category.name,
        price: p.sellPrice,
        adminFee: p.adminFee,
        totalAmount: total,
        status: i % 5 === 0 ? "PENDING" : "SUCCESS",
        paidAt: i % 5 === 0 ? null : new Date()
      }
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
