import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | PDF62",
  description: "Terms of service and usage conditions for PDF62.",
}

export default function TermsPage() {
  return (
    <div className="p-8 text-slate-11">
      <h1 className="text-4xl font-bold text-slate-12 tracking-tight">Terms of Service</h1>
      <p className="mb-10 text-sm">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

      <div className="space-y-10 text-base leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using PDF62 ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">2. Description of Service</h2>
          <p>
            PDF62 provides users with a suite of PDF manipulation tools (such as merging, splitting, compressing, and extracting). The processing is performed locally on your device via your web browser. We do not store, host, or transfer your file contents to our servers for processing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">3. User Conduct and Responsibilities</h2>
          <p className="mb-4">
            You agree to use the Service only for lawful purposes. You are solely responsible for the knowledge of and adherence to any and all laws, rules, and regulations pertaining to your use of the Service. You agree not to:
          </p>
          <ul className="list-disc pl-6 space-y-3 marker:text-slate-8">
            <li>Use the Service to process illegal, harmful, or offensive content.</li>
            <li>Interfere with or disrupt the Service or servers or networks connected to the Service.</li>
            <li>Attempt to gain unauthorized access to any portion of the website.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">4. Intellectual Property Rights</h2>
          <p>
            All content on the PDF62 website, including but not limited to text, graphics, logos, icons, and software, is the property of PDF62 or its content suppliers and is protected by international copyright laws. You retain full ownership and intellectual property rights over any documents you process using our Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">5. Advertisements</h2>
          <p>
            The Service is provided free of charge and is supported by advertising. You agree that PDF62 may place advertising on the Service. The manner, mode, and extent of such advertising are subject to change without specific notice to you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">6. Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an "as is" and "as available" basis. PDF62 makes no warranty that the Service will meet your requirements, or that the Service will be uninterrupted, timely, secure, or error-free. We are not responsible for any data loss or corruption that may occur during the processing of your files on your device.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">7. Limitation of Liability</h2>
          <p>
            In no event shall PDF62 be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or the inability to use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">8. Modifications to Service and Terms</h2>
          <p>
            PDF62 reserves the right at any time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. We may also revise these Terms of Service at any time without notice. By using this website you are agreeing to be bound by the then-current version of these Terms of Service.
          </p>
        </section>
      </div>
    </div>
  )
}
