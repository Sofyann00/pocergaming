import Link from "next/link";
import { Calculator } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="flex justify-start">
              <img 
                src="/app_icon.png" 
                alt="pocergeming Logo"
                width={220}
                height={220}
                className="brightness-100 object-cover -ml-8 sm:ml-0 -mt-8 sm:mt-0"
              />
          </div>

          {/* Help section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Service</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Us</h3>
            <div className="text-sm text-gray-600">
              {/* <p className="font-medium text-gray-900 mb-2">Tax Support</p> */}
              <div className="space-y-2">
                <p>
                  <a
                    href="mailto:admin@pocergeming.com"
                    className="hover:text-gray-900 transition-colors"
                  >
                    admin@pocergeming.com
                  </a>
                </p>
                <p>
                  <a
                    href="tel:021-52067542"
                    className="hover:text-gray-900 transition-colors"
                  >
                    021-52067542
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Office Location section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Office Location</h3>
            <div className="text-sm text-gray-600">
              <p className="leading-relaxed">
                Gedung Is Plaza Lt. 5,<br />
                Jl Pramuka Kav 150,<br />
                Utan Kayu Utara,<br />
                Matraman,<br />
                Jakarta Timur 13120
              </p>
            </div>
          </div>

          {/* Copyright section */}
          <div className="col-span-1 md:col-span-4 mt-16 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              © {new Date().getFullYear()} PT DINAMIKA TEKNOLOGI ASIA.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
