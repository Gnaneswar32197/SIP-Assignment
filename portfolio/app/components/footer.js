export default function Footer() {
  return (
    <footer className="bg-[#020617] text-white px-8 md:px-16 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Left Section */}
        <div className="md:col-span-1">
          <img
            src="https://www.kfintech.com/new-assets/images/logo/kfintech-monochrome.svg"
            alt="KFintech Logo"
            className="w-40 mb-6"
          />

          <p className="text-gray-400 text-sm leading-8">
            KFintech serves the mission-critical needs of asset managers with
            clients spanning mutual funds, AIFs, pension, wealth managers and
            corporates in India and abroad.
          </p>
        </div>

      
        <div>
          <h2 className="text-lg font-semibold mb-4 uppercase">
            About Us
          </h2>

          <ul className="space-y-3 text-gray-300 text-sm">
            <li>About KFintech</li>
            <li>Careers</li>
            <li>Contact Us</li>
          </ul>

          <h2 className="text-lg font-semibold mt-8 mb-4 uppercase">
            Mutual Fund Solutions
          </h2>

          <ul className="space-y-3 text-gray-300 text-sm">
            <li>Distributor Solutions</li>
            <li>Channel Partner Solutions</li>
            <li>Investor Solutions</li>
            <li>Korp Connect</li>
          </ul>
        </div>

    
        <div>
          <h2 className="text-lg font-semibold mb-4 uppercase">
            Corporate Registry
          </h2>

          <ul className="space-y-3 text-gray-300 text-sm">
            <li>Karisma</li>
            <li>Evoting</li>
            <li>Fintrak</li>
            <li>Kprism</li>
          </ul>

          <h2 className="text-lg font-semibold mt-8 mb-4 uppercase">
            National Pension
          </h2>

          <ul className="space-y-3 text-gray-300 text-sm">
            <li>NPS</li>
            <li>CRA Login</li>
          </ul>
        </div>

      
        <div>
          <h2 className="text-lg font-semibold mb-4 uppercase">
            Get In Touch
          </h2>

          <ul className="space-y-3 text-gray-300 text-sm">
            <li>+91-40-67162222</li>
            <li>91000 94099</li>
            <li>einward.ris@kfintech.com</li>
            <li>kfinkart.support@kfintech.com</li>
          </ul>

          <h2 className="text-lg font-semibold mt-8 mb-4 uppercase">
            Legal
          </h2>

          <ul className="space-y-3 text-gray-300 text-sm">
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Disclosures</li>
          </ul>
        </div>

      </div>
    </footer>
  );
}