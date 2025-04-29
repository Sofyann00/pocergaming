import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - pocergaming',
  description: 'Privacy Policy for pocergaming tax consultation services and client data protection',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 italic mb-8">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <section className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                1. Information We Collect
              </h2>
              <p className="text-gray-600">
                pocergaming collects personal information including but not limited to: name, email address, phone number, residential and business addresses, tax identification numbers, financial records, income statements, expense documentation, investment information, and payment details when you engage our tax consultation services or create an account on our platform.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-600">
                We use your information to:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-600 space-y-1">
                <li>Process your tax consultation requests and provide professional advice</li>
                <li>Prepare and file tax returns and other compliance documents</li>
                <li>Notify you about tax regulation changes and important deadlines</li>
                <li>Provide personalized tax planning based on your financial situation</li>
                <li>Maintain records of your tax filings and consultation history</li>
                <li>Send tax insights and newsletters (with your consent)</li>
                <li>Comply with tax authorities' requirements and legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                3. Data Security
              </h2>
              <p className="text-gray-600">
                We implement strong technical and organizational measures to protect your sensitive financial and personal data against unauthorized access, alteration, disclosure, or destruction. Our security protocols meet industry standards for financial information protection.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                4. Data Retention
              </h2>
              <p className="text-gray-600">
                We retain your personal and financial information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, and as required by tax regulations. In most cases, we maintain tax records for a minimum of 7 years to comply with Indonesian tax authority requirements.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                5. Your Rights
              </h2>
              <p className="text-gray-600">
                Under Indonesian data protection laws, you have the right to:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-600 space-y-1">
                <li>Access your personal data and tax documentation</li>
                <li>Correct inaccurate financial information</li>
                <li>Request deletion of your data (subject to tax retention requirements)</li>
                <li>Object to processing of your data</li>
                <li>Withdraw consent for marketing communications</li>
                <li>Request limitations on how we use your financial information</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                6. Cookies and Tracking
              </h2>
              <p className="text-gray-600">
                We use cookies and similar tracking technologies to enhance your experience on our tax consultation platform, remember your preferences, maintain your login status, analyze site traffic, and provide tailored tax guidance based on your interaction with our resources.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                7. Confidentiality
              </h2>
              <p className="text-gray-600">
                All client information is treated as strictly confidential. Our tax professionals adhere to professional ethics and confidentiality standards. We do not share your financial information with third parties except when necessary to provide our services or when required by law or tax authorities.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                8. Contact Information
              </h2>
              <div className="text-gray-600">
                <p>For any questions about this Privacy Policy, your tax matters, or our data practices, please contact us at:</p>
                <div className="mt-2">
                  <p>PT pocergaming INDONESIA</p>
                  <p>Gedung Is Plaza Lt. 5</p>
                  <p>Jl Pramuka Kav 150, Utan Kayu Utara</p>
                  <p>Matraman, Jakarta Timur</p>
                  <p>DKI Jakarta, Indonesia</p>
                  <p>Email: info@pocergaming.com</p>
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