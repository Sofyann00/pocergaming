import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - pocergaming',
  description: 'Learn about pocergaming, your trusted tax consultation partner in Indonesia',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            About pocergaming
          </h1>
          <p className="text-sm text-gray-500 italic mb-8">
            Your Trusted Tax Consultation Partner in Indonesia
          </p>

          <section className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Our Story
              </h2>
              <p className="text-gray-600">
                Founded with a commitment to financial excellence, pocergaming has emerged as a leading tax consultation firm in Indonesia. Our journey began with a clear vision: to help businesses and individuals navigate complex tax regulations and optimize their financial position. What started as a small team of passionate tax professionals has grown into a trusted consultancy delivering exceptional tax services across various industries.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Why Choose Us
              </h2>
              <ul className="text-gray-600 list-disc pl-5 space-y-2">
                <li>Expert Team of Certified Tax Professionals</li>
                <li>Comprehensive Range of Tax Consultation Services</li>
                <li>Client-Focused Approach</li>
                <li>Attention to Detail and Compliance</li>
                <li>Timely Advice and Clear Communication</li>
                <li>Proven Track Record of Tax Optimization</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Our Commitment
              </h2>
              <p className="text-gray-600">
                At pocergaming, we are committed to providing exceptional tax consultation that protects your financial interests and exceeds your expectations. Our team of skilled tax advisors works tirelessly to understand your unique needs and create tailored tax strategies that minimize liabilities and ensure compliance. We pride ourselves on building long-term professional relationships and ensuring client satisfaction through tax expertise and meticulous attention to detail.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Our Services
              </h2>
              <ul className="text-gray-600 list-disc pl-5 space-y-2">
                <li>Personal Tax Return Filing</li>
                <li>Business Tax Planning</li>
                <li>Corporate Tax Compliance</li>
                <li>International Tax Advisory</li>
                <li>Tax Audit Support</li>
                <li>VAT Registration & Filing</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Office Location
              </h2>
              <div className="text-gray-600">
                <p>Visit our consultation office:</p>
                <div className="mt-2">
                  <p>PT pocergaming INDONESIA</p>
                  <p>Gedung Is Plaza Lt. 5</p>
                  <p>Jl Pramuka Kav 150, Utan Kayu Utara</p>
                  <p>Matraman, Jakarta Timur</p>
                  <p>DKI Jakarta, Indonesia</p>
                  <p>Kode Pos: 13120</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Office Hours
              </h2>
              <div className="text-gray-600 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Weekdays:</p>
                  <p>Monday - Friday</p>
                  <p>09:00 AM - 5:00 PM</p>
                </div>
                <div>
                  <p className="font-medium">Weekends:</p>
                  <p>Closed</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Contact Information
              </h2>
              <div className="text-gray-600">
                <p>Get in touch with our tax consultation team:</p>
                <div className="mt-2 space-y-1">
                  <p>Phone: (021) 52067542</p>
                  <p>Email: info@pocergaming.com</p>
                  <p>WhatsApp: +62 812-8845-8953</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 