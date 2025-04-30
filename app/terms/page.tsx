import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - pocergaming',
  description: 'Terms of Service and conditions for using pocergaming tax consultation services',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 italic mb-8">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <section className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                1. Agreement to Terms
              </h2>
              <p className="text-gray-600">
                By accessing and using the tax consultation services provided by PT DINAMIKA TEKNOLOGI ASIA (hereinafter referred to as &quot;pocergaming&quot;), you accept and agree to be bound by the terms and provisions of this agreement.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                2. Tax Services
              </h2>
              <p className="text-gray-600">
                pocergaming provides professional tax consultation services including personal tax return filing, business tax planning, tax audit support, corporate tax compliance, international tax advisory, and comprehensive tax solutions. All service listings, including prices, availability, and specifications, are subject to change without prior notice. We guarantee the quality and professionalism of all tax services provided through our platform.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                3. Consultations and Satisfaction
              </h2>
              <p className="text-gray-600">
                All tax consultation services include a specified number of consultation sessions as detailed in each service description. Additional consultations beyond the included amount may incur extra charges. Clients must provide necessary documentation and information within 14 days of the initial consultation. We strive for complete client satisfaction and will work with you to ensure our tax solutions meet your requirements within the agreed scope.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                4. Confidentiality and Information Use
              </h2>
              <p className="text-gray-600">
                All financial and personal information provided to pocergaming will be treated with strict confidentiality as required by professional tax consultation standards. We will not disclose your information to third parties except when required by law or with your explicit permission. pocergaming may use anonymized data for internal research and service improvement purposes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                5. Limitation of Liability
              </h2>
              <p className="text-gray-600">
                While we guarantee the professionalism and quality of our tax consultation services, pocergaming shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. This includes but is not limited to tax penalties or interest charges resulting from delayed information submission, inaccurate information provided by clients, or regulatory changes that occur after advice was provided.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                6. Client Responsibilities
              </h2>
              <p className="text-gray-600">
                Clients are responsible for providing accurate, complete, and timely information required for tax consultation and preparation services. Clients must review all documents before submission to tax authorities and notify pocergaming promptly of any errors or discrepancies. pocergaming is not responsible for penalties or additional taxes resulting from inaccurate or incomplete information provided by clients.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                7. Governing Law
              </h2>
              <p className="text-gray-600">
                These terms are governed by the laws of the Republic of Indonesia. Any disputes shall be subject to the exclusive jurisdiction of the courts in Jakarta, Indonesia.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                8. Contact Information
              </h2>
              <div className="text-gray-600">
                <p>For any questions about these Terms of Service, please contact us at:</p>
                <div className="mt-2">
                  <p>PT DINAMIKA TEKNOLOGI ASIA</p>
                  <p>Gedung Is Plaza Lt. 5</p>
                  <p>Jl Pramuka Kav 150, Utan Kayu Utara</p>
                  <p>Matraman, Jakarta Timur</p>
                  <p>DKI Jakarta, Indonesia</p>
                  <p>Email: admin@pocergaming.com</p>
                  <p>Phone: (021) 52067542</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 