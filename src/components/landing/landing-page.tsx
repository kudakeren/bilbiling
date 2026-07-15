"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  Bolt,
  Gauge,
  HeartPulse,
  History,
  LockKeyhole,
  Phone,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Ticket,
  WalletCards
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";

const categories = [
  { label: "Pulsa", icon: Phone, href: "/dashboard/pulsa" },
  { label: "Data", icon: Smartphone, href: "/dashboard/paket-data" },
  { label: "Listrik", icon: Bolt, href: "/dashboard/pln-token" },
  { label: "E-Wallet", icon: WalletCards, href: "/dashboard/ewallet" },
  { label: "Voucher", icon: Ticket, href: "/dashboard/food-vouchers" },
  { label: "BPJS", icon: HeartPulse, href: "/dashboard/bpjs" }
];

const products = [
  { title: "Pulsa Telkomsel 50K", nominal: "Pulsa reguler Telkomsel", price: 50250, href: "/dashboard/pulsa", logo: "/brand-logos/telkomsel.svg", photo: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85", label: "Pulsa" },
  { title: "Pulsa XL 50K", nominal: "Pulsa reguler XL Axiata", price: 50500, href: "/dashboard/pulsa", logo: "/brand-logos/xl.svg", photo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85", label: "Pulsa" },
  { title: "Pulsa Indosat 50K", nominal: "Pulsa reguler Indosat", price: 50750, href: "/dashboard/pulsa", logo: "/brand-logos/indosat.svg", photo: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=85", label: "Pulsa" },
  { title: "Paket Data Telkomsel 10GB", nominal: "Internet bulanan Telkomsel", price: 65000, href: "/dashboard/paket-data", logo: "/brand-logos/telkomsel.svg", photo: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=900&q=85", label: "Data" },
  { title: "Paket Data XL 12GB", nominal: "Paket data nasional", price: 78000, href: "/dashboard/paket-data", logo: "/brand-logos/xl.svg", photo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=85", label: "Data" },
  { title: "Token PLN 100K", nominal: "Token listrik prabayar", price: 102000, href: "/dashboard/pln-token", logo: "/brand-logos/pln.svg", photo: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=85", label: "Listrik" },
  { title: "Tagihan PLN", nominal: "Cek tagihan listrik bulanan", price: 0, href: "/dashboard/pln-bill", logo: "/brand-logos/pln.svg", photo: "https://images.unsplash.com/photo-1516192518150-0d8fee5425e3?auto=format&fit=crop&w=900&q=85", label: "Tagihan" },
  { title: "BPJS Kesehatan", nominal: "Iuran peserta bulanan", price: 42500, href: "/dashboard/bpjs", logo: "/brand-logos/bpjs.svg", photo: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=85", label: "BPJS" },
  { title: "Top Up DANA 100K", nominal: "Saldo DANA cepat masuk", price: 101000, href: "/dashboard/ewallet", logo: "/brand-logos/dana.svg", photo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=85", label: "E-Wallet" },
  { title: "GoPay Top Up 100K", nominal: "Top up GoPay real-time", price: 101500, href: "/dashboard/ewallet", logo: "/brand-logos/gopay.svg", photo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85", label: "E-Wallet" },
  { title: "OVO Top Up 100K", nominal: "Saldo OVO untuk pembayaran", price: 101000, href: "/dashboard/ewallet", logo: "/brand-logos/ovo.svg", photo: "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?auto=format&fit=crop&w=900&q=85", label: "E-Wallet" },
  { title: "ShopeePay 100K", nominal: "Saldo belanja ShopeePay", price: 101000, href: "/dashboard/ewallet", logo: "/brand-logos/shopeepay.svg", photo: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=900&q=85", label: "E-Wallet" },
  { title: "Voucher KFC 50K", nominal: "Voucher restoran KFC", price: 48000, href: "/dashboard/food-vouchers", logo: "/brand-logos/kfc.svg", photo: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=900&q=85", label: "Voucher Belanja" },
  { title: "Voucher Alfamart 100K", nominal: "Belanja kebutuhan harian", price: 97000, href: "/dashboard/food-vouchers", logo: "/brand-logos/alfamart.svg", photo: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85", label: "Voucher Belanja" },
  { title: "Voucher Indomaret 100K", nominal: "Voucher minimarket", price: 97500, href: "/dashboard/food-vouchers", logo: "/brand-logos/indomaret.svg", photo: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=85", label: "Voucher Belanja" },
  { title: "Voucher Tokopedia 100K", nominal: "Voucher marketplace", price: 98500, href: "/dashboard/food-vouchers", logo: "/brand-logos/tokopedia.svg", photo: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=900&q=85", label: "Voucher Belanja" },
  { title: "Voucher Shopee 100K", nominal: "Voucher belanja online", price: 98500, href: "/dashboard/food-vouchers", logo: "/brand-logos/shopee.svg", photo: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=900&q=85", label: "Voucher Belanja" },
  { title: "Voucher Starbucks 50K", nominal: "Voucher kopi dan minuman", price: 49000, href: "/dashboard/food-vouchers", logo: "/brand-logos/starbucks.svg", photo: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85", label: "Voucher Belanja" }
];

const benefits = [
  { title: "Kecepatan", desc: "Verifikasi otomatis memproses transaksi dalam hitungan detik.", icon: Gauge },
  { title: "Keamanan", desc: "Akun, transaksi, dan invoice dijaga dengan validasi server.", icon: ShieldCheck },
  { title: "Kemudahan", desc: "PPOB dan voucher belanja bisa dipilih dari satu halaman.", icon: LockKeyhole }
];

export function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#141414]">
      <style jsx global>{`
        @keyframes bilFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes bilSlide {
          from { transform: translateX(-18px); opacity: .2; }
          to { transform: translateX(0); opacity: 1; }
        }
        .bil-float { animation: bilFloat 5.5s ease-in-out infinite; }
        .bil-slide { animation: bilSlide .7s ease-out both; }
      `}</style>

      <TopNav />

      <section className="border-b bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1fr_560px] lg:items-center lg:py-20">
          <div className="bil-slide">
            <h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-normal md:text-6xl">
              Bayar Apapun <span className="text-red-700">Jadi Lebih Cepat</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-600">
              Solusi digital terintegrasi untuk pulsa, paket data, token listrik, e-wallet, BPJS, dan voucher belanja dalam satu platform.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button asChild className="h-14 rounded-none bg-red-700 px-9 text-base font-black hover:bg-red-800">
                <Link href="/login">
                  Mulai Transaksi <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-14 rounded-none border-neutral-300 px-9 text-base font-bold">
                <a href="#fitur">Pelajari Fitur</a>
              </Button>
            </div>
          </div>

          <div className="relative bil-float">
            <div className="absolute -inset-6 rounded-[2px] bg-red-700/5 blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=1200&q=85"
              alt="Transaksi digital bilbiling"
              className="relative h-[400px] w-full rounded border object-cover shadow-2xl shadow-black/15"
            />
            <div className="absolute inset-0 rounded border bg-gradient-to-r from-red-700/30 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section id="fitur" className="mx-auto max-w-7xl px-5 py-12">
        <div className="rounded border bg-white p-5">
          <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
            {categories.map((item) => (
              <Link key={item.label} href={`/login?callbackUrl=${encodeURIComponent(item.href)}`} className="group grid place-items-center gap-3 rounded py-4 text-center text-sm font-semibold transition hover:-translate-y-1 hover:bg-red-50 hover:text-red-700">
                <span className="grid h-14 w-14 place-items-center rounded-xl bg-neutral-100 text-neutral-700 transition group-hover:bg-red-100 group-hover:text-red-700">
                  <item.icon className="h-6 w-6" />
                </span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="produk" className="mx-auto max-w-7xl px-5 py-16">
        <div className="flex items-end justify-between gap-5">
          <div>
            <h2 className="text-4xl font-black tracking-normal">Produk Unggulan</h2>
            <p className="mt-2 text-neutral-600">PPOB dan voucher belanja pilihan untuk transaksi harian</p>
          </div>
          <Link href="/login?callbackUrl=/dashboard/services" className="hidden items-center gap-2 text-sm font-bold text-red-700 md:flex">
            Lihat Semua <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.title} product={product} index={index} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="relative overflow-hidden rounded-xl border-2 border-red-700 bg-[#2b302f] px-8 py-12 text-white md:px-12">
          <Bolt className="absolute right-28 top-1/2 hidden h-48 w-48 -translate-y-1/2 text-white/10 md:block" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_240px] md:items-center">
            <div>
              <span className="rounded-full bg-red-700 px-4 py-1 text-xs font-black uppercase tracking-wide">Exclusive Promo</span>
              <h2 className="mt-5 text-5xl font-black tracking-normal">
                CASHBACK <span className="text-red-500">50%</span>
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-white/85">
                Nikmati pengembalian saldo instan untuk transaksi pertama Anda hari ini. Gunakan kode:
                <span className="ml-1 font-black underline">BILBILINGGAS</span>
              </p>
            </div>
            <Button asChild className="h-16 rounded-lg bg-white px-10 text-base font-black text-neutral-950 hover:bg-neutral-100">
              <Link href="/login">Ambil Promo</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="keunggulan" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="text-center text-4xl font-black tracking-normal">Mengapa Memilih bilbiling.com?</h2>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center transition hover:-translate-y-1">
                <span className="mx-auto grid h-20 w-20 place-items-center rounded-xl bg-red-100 text-red-700">
                  <benefit.icon className="h-8 w-8" />
                </span>
                <h3 className="mt-7 text-xl font-black">{benefit.title}</h3>
                <p className="mx-auto mt-4 max-w-sm leading-7 text-neutral-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ProductCard({ product, index }: { product: (typeof products)[number]; index: number }) {
  return (
    <Card className="overflow-hidden rounded border bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl" style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}>
      <CardContent className="p-0">
        <Link href={`/login?callbackUrl=${encodeURIComponent(product.href)}`}>
          <div className="relative h-44 overflow-hidden border-b bg-neutral-100">
            <img src={product.photo} alt={product.title} className="h-full w-full object-cover transition duration-500 hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-red-700 shadow-sm">{product.label}</span>
            <div className="absolute bottom-4 left-4 flex h-14 w-28 items-center justify-center rounded-xl bg-white/95 p-2 shadow-lg backdrop-blur">
              <img src={product.logo} alt={`${product.title} logo`} className="max-h-10 w-full object-contain" />
            </div>
          </div>
          <div className="p-6">
            <h3 className="min-h-14 text-xl font-black">{product.title}</h3>
            <p className="mt-2 min-h-12 text-sm leading-6 text-neutral-600">{product.nominal}</p>
            <div className="mt-7 flex items-center justify-between gap-3">
              <p className="text-xl font-black">{product.price ? formatRupiah(product.price) : "Cek harga"}</p>
              <span className="bg-red-700 px-4 py-2 text-sm font-black text-white transition hover:bg-red-800">Beli</span>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}

function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-5">
        <Link href="/" className="text-3xl font-black tracking-tight text-red-700">bilbiling</Link>
        <nav className="hidden items-center gap-9 text-sm font-medium md:flex">
          <a href="#fitur" className="border-b border-red-700 pb-2 text-red-700">Services</a>
          <a href="#produk">Promotions</a>
          <Link href="/login?callbackUrl=/dashboard/transactions">Order History</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold">Login</Link>
          <Button asChild className="h-10 rounded-none bg-red-700 px-7 text-sm font-black hover:bg-red-800">
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#2b302f] py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-4">
        <div>
          <p className="text-xl font-black">bilbiling</p>
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/70">
            Mitra andalan untuk kebutuhan pembayaran digital harian, PPOB, dan voucher belanja.
          </p>
        </div>
        <FooterLinks title="Produk" items={["Pulsa & Data", "Token Listrik", "Top Up E-Wallet", "Voucher Belanja"]} />
        <FooterLinks title="Perusahaan" items={["About Us", "Terms of Service", "Privacy Policy", "FAQ"]} />
        <FooterLinks title="Bantuan" items={["Contact Support", "Pusat Bantuan", "Media Kit"]} />
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/15 px-5 pt-8 text-center text-sm text-white/65">
        © 2026 bilbiling Digital Solutions. All rights reserved.
      </div>
    </footer>
  );
}

function FooterLinks({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-black">{title}</p>
      <div className="mt-5 grid gap-3 text-sm text-white/70">
        {items.map((item) => (
          <Link key={item} href="/login">{item}</Link>
        ))}
      </div>
    </div>
  );
}
