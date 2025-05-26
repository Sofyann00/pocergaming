import Image from "next/image";

export default function ResellerPage() {
  return (
    <div className="max-w-3xl mx-auto w-full mb-20 px-2 sm:px-0 mt-10">
      <div className="rounded-2xl overflow-hidden shadow-lg border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-blue-100 mb-8">
        <div className="relative w-full h-56 sm:h-80">
          <Image
            src="/reseller_banner.png"
            alt="Reseller Program pocergeming.com"
            fill
            className="object-cover w-full h-full"
            style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
            priority
          />
        </div>
      </div>
      <article className="bg-white rounded-2xl shadow p-6 sm:p-10 border border-gray-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-4">Program Partnership pocergeming.com</h1>
        <p className="text-lg text-gray-700 mb-4">
          Selamat datang di program partnership <b>pocergeming.com</b>! Kami membuka peluang bagi Anda yang ingin menjadi mitra bisnis dalam penjualan item game pribadi anda pada website kami. Berikut adalah syarat-syarat untuk menjadi partner kami:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Memiliki rekening pribadi</li>
          <li>Bersedia menandatangani PKS (Perjanjian Kerjasama)</li>
          <li>Bersedia mengikuti semua persyaratan lainnya yang akan kami berikan</li>
        </ul>
        <p className="text-lg text-gray-700">
          Jika Anda memenuhi semua persyaratan di atas, segera daftarkan diri Anda untuk menjadi partner kami! Untuk informasi lebih lanjut dan pendaftaran, silakan hubungi tim kami melalui kontak yang tersedia di website.
        </p>
      </article>
    </div>
  );
} 