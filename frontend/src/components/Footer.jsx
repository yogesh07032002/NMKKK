export default function Footer() {
  return (
    <footer className="bg-[#0F2A3A] text-[#E6EEF3] mt-20">
      
      {/* ---------------- TOP FOOTER ---------------- */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold text-white">
            NMK Career Guidance
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#C7D5DD]">
            A trusted platform providing verified government job updates,
            career guidance, and support services for aspirants across
            Maharashtra.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="/jobs" className="hover:text-white transition">
                Latest Jobs
              </a>
            </li>
            <li>
              <a href="/guidance" className="hover:text-white transition">
                Career Guidance
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Resources
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                Exam Notifications
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Admit Cards
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Results
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Syllabus & PDFs
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Get in Touch
          </h3>
          <p className="text-sm text-[#C7D5DD]">
            Maharashtra, India
          </p>
          <p className="text-sm mt-2 text-[#C7D5DD]">
            Email: support@nmkcareers.in
          </p>
          <p className="text-sm mt-2 text-[#C7D5DD]">
            Helpline: +91 9XXXXXXXXX
          </p>
        </div>
      </div>

      {/* ---------------- DIVIDER ---------------- */}
      <div className="border-t border-white/10"></div>

      {/* ---------------- BOTTOM FOOTER ---------------- */}
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-[#C7D5DD]">
        <p>
          © 2025 NMK Career Guidance. All Rights Reserved.
        </p>

        <div className="flex gap-6 mt-3 md:mt-0">
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white transition">
            Disclaimer
          </a>
        </div>
      </div>
    </footer>
  );
}
