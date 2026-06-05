import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | PDF62",
  description: "Privacy policy and terms of data processing for PDF62.",
}

export default function PrivacyPage() {
  return (
    <div className="p-8 text-slate-11">
      <h1 className="text-4xl font-bold text-slate-12 tracking-tight">Privacy Policy</h1>
      <p className="mb-10 text-sm">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

      <div className="space-y-10 text-base leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">1. Introduction</h2>
          <p>
            Welcome to PDF62. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">2. Local File Processing (Privacy by Design)</h2>
          <p>
            Our core promise to you is privacy by design. We process your PDF files locally on your device using WebAssembly technology. This means your files are <strong className="text-slate-12 font-semibold">never uploaded to our servers</strong>. All merging, splitting, compressing, and extracting happens entirely within your web browser. We do not have access to the contents of your files, ensuring your sensitive data remains strictly on your device.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">3. Data We Collect</h2>
          <p className="mb-4">
            While your files never leave your device, we may collect certain information to provide and improve our service, and to display advertisements:
          </p>
          <ul className="list-disc pl-6 space-y-3 marker:text-slate-8">
            <li>
              <strong className="text-slate-12 font-semibold">Usage Data:</strong> We may collect anonymous analytics data regarding how the website is accessed and used. This includes information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.
            </li>
            <li>
              <strong className="text-slate-12 font-semibold">Cookies and Tracking Data:</strong> We use cookies and similar tracking technologies to track the activity on our website and hold certain information.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">4. Third-Party Advertisements</h2>
          <p className="mb-4">
            To keep our services free, we display third-party advertisements. We use external advertising companies to serve ads when you visit our website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
          </p>
          <p>
            These third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on PDF62, which are sent directly to your browser. They automatically receive your IP address when this occurs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">5. Third-Party Service Providers</h2>
          <p>
            We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">6. Security of Data</h2>
          <p>
            The security of your data is important to us. Remember that while your files are processed locally and securely, no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">7. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through our website.
          </p>
        </section>
      </div>
    </div>
  )
}
