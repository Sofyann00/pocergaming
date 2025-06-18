import type { Metadata } from 'next'
import { MessageCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund Policy - pocergeming',
  description: 'Refund policy and procedures for pocergeming game voucher and top-up services',
}

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Refund Policy
          </h1>
          <p className="text-sm text-gray-500 italic mb-8">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <section className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                1. Refund Overview
              </h2>
              <p className="text-gray-600">
                At pocergeming, we understand that sometimes issues may arise with your purchase. We are committed to providing fair and transparent refund policies to ensure customer satisfaction. However, due to the digital nature of our products and the instant delivery system, refunds are subject to specific conditions and procedures.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                2. Refund Eligibility
              </h2>
              <div className="text-gray-600 space-y-3">
                <p><strong>Eligible for Refund:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Technical errors on our platform that prevent successful delivery</li>
                  <li>Incorrect product delivered due to our system error</li>
                  <li>Duplicate charges for the same transaction</li>
                  <li>Service unavailability due to maintenance or technical issues</li>
                </ul>
                
                <p className="mt-4"><strong>Not Eligible for Refund:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Successful delivery of digital products</li>
                  <li>Change of mind after purchase</li>
                  <li>Incorrect game account information provided by customer</li>
                  <li>Game platform restrictions or server issues</li>
                  <li>Violation of game platform terms of service</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                3. How to Request a Refund
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-900">Contact Us via WhatsApp</h3>
                </div>
                <p className="text-blue-800 mb-4">
                  To request a refund, you <strong>must contact our customer service team via WhatsApp</strong>. We do not process refund requests through other channels to ensure proper verification and documentation.
                </p>
                <Link 
                  href="https://wa.me/6285123286761"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Contact WhatsApp Support
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                4. Required Information for Refund
              </h2>
              <p className="text-gray-600 mb-3">
                When contacting us for a refund, please provide the following information:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Order number or transaction ID</li>
                <li>Date and time of purchase</li>
                <li>Product name and quantity</li>
                <li>Payment method used</li>
                <li>Detailed description of the issue</li>
                <li>Screenshots or evidence of the problem (if applicable)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                5. Refund Processing Time
              </h2>
              <p className="text-gray-600">
                Once your refund request is approved, the processing time depends on your payment method:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4 mt-2">
                <li><strong>VA/Bank transfers:</strong> 3-5 business days</li>
                <li><strong>QRIS payments:</strong> 1-3 business days</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                6. Partial Refunds
              </h2>
              <p className="text-gray-600">
                In certain cases, partial refunds may be issued based on the specific circumstances of your purchase. This will be determined on a case-by-case basis by our customer service team.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                7. Contact Information
              </h2>
              <div className="text-gray-600">
                <p className="mb-2">For refund requests and customer support:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>WhatsApp:</strong> +62 858-1195-9392</p>
                  <p><strong>Email:</strong> admin@pocergeming.com</p>
                  <p><strong>Business Hours:</strong> Monday - Sunday, 24/7</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                8. Updates to This Policy
              </h2>
              <p className="text-gray-600">
                We reserve the right to update this refund policy at any time. Changes will be effective immediately upon posting on our website. We encourage you to review this policy periodically.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 