import Link from 'next/link';
import { Instagram } from 'lucide-react';

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Beranda', href: '#' },
    { name: 'Tentang Kami', href: '#about' },
    { name: 'Sejarah', href: '#history' },
    { name: 'Fitur', href: '#feature' },
  ];

  const resources = [
    { name: 'FAQ', href: '#faq' },
    { name: 'Kontak', href: '#contact' },
    { name: 'Kebijakan Privasi', href: '#' },
    { name: 'Syarat Layanan', href: '#' },
  ];

  const schoolSocial = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/sman1purbalingga',
      label: '@sman1purbalingga',
    },
  ];

  return (
    <footer className="w-full text-gray-300">
      <div className="mx-auto w-full max-w-7xl p-20 md:p-32	xl:p-40">
        {/* Main Footer Content */}
        <div className="grid w-full grid-cols-1 gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2">
          {/* Left Section */}
          <div className="flex flex-col justify-between gap-8 sm:gap-10">
            <div>
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">SMA N 1 Purbalingga</h3>
                <p className="un mt-2 text-sm md:text-base text-gray-400">
                  Membangun generasi berkualitas dengan pendidikan terbaik dan nilai-nilai karakter yang kuat.
                </p>
              </div>

              {/* Social Links */}
              <div className="mb-6 sm:mb-8">
                <p className="un mb-3 text-sm font-semibold text-white">Ikuti Kami</p>
                <div className="flex flex-col gap-2">
                  {schoolSocial.map((social) => (
                    <Link
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center gap-2 text-sm text-purple-400 transition duration-300 hover:text-purple-300"
                    >
                      <Instagram size={16} className="sm:h-5 sm:w-5" />
                      <span>{social.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Creator Credit */}
              <div className="border-t border-gray-700 pt-4 sm:pt-6">
                <p className="un text-xs text-gray-500">
                  Dirancang & Dibangun oleh{' '}
                  <span className="font-semibold text-white">Zain Hibattulloh</span>
                </p>
                <p className="un mt-1 text-sm text-gray-500">
                  <Link
                    href="https://instagram.com/sweeins"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-2 text-sm text-purple-400 transition duration-300 hover:text-purple-300"
                  >
                    <Instagram size={16} className="sm:h-5 sm:w-5" />
                    <span>@sweeins</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="grid w-full grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            {/* Quick Links */}
            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">Navigasi</h4>
              <ul className="space-y-2 sm:space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition duration-300 hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">Sumber Daya</h4>
              <ul className="space-y-2 sm:space-y-3">
                {resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition duration-300 hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-6 sm:mt-10 sm:pt-8 md:mt-12 md:pt-10">
          <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:justify-between sm:gap-4 sm:text-left">
            <p className="un text-sm text-gray-500">
              &copy; {currentYear} SMA N 1 Purbalingga. Semua hak dilindungi.
            </p>
            <p className="un text-sm text-gray-600">
              Dengan <span className="text-purple-400">♥</span> oleh{' '}
              <span className="font-semibold text-gray-400">@sweeins</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
