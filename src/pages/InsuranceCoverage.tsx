// src/pages/InsuranceCoverage.tsx
import { Shield, FileText, GlobeAmericas } from "lucide-react";

export default function InsuranceCoverage() {
  return (
    <div className="min-hop-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 py-20 px-6 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Comprehensive Insurance Protection
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            All client assets are covered by a $750M+ institutional insurance
            program underwritten by Lloyd’s of London and other A-rated carriers.
          </p>
        </div>
      </section>

      {/* Coverage Highlights */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            What’s Covered
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "Theft & Burglary",
                desc: "Physical theft from vaults (armed robbery, insider theft)",
                limit: "$500M per occurrence",
              },
              {
                title: "Cyber Crime",
                desc: "Hacking, private key compromise, fraudulent transfers",
                limit: "$250M aggregate",
              },
              {
                title: "Employee Dishonesty",
                desc: "Internal fraud or collusion",
                limit: "$100M",
              },
              {
                title: "Physical Damage",
                desc: "Fire, flood, natural disasters",
                limit: "Full replacement value",
              },
              {
                title: "In-Transit Coverage",
                desc: "Armed transport between facilities",
                limit: "$150M per conveyance",
              },
              {
                title: "Mysterious Disappearance",
                desc: "Unexplained loss during audits",
                limit: "$50M",
              },
            ].map((cov, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <Shield className="w-12 h-12 text-emerald-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{cov.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {cov.desc}
                </p>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Limit: {cov.limit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Underwriters */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Underwritten By</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 text-2xl font-medium opacity-80">
            <div>Lloyd’s of London</div>
            <div>·</div>
            <div>AIG</div>
            <div>·</div>
            <div>Chubb</div>
            <div>·</div>
            <div>Arch Insurance</div>
          </div>
          <p className="mt-8 text-lg text-gray-600 dark:text-gray-400">
            <FileText className="inline w-5 h-5 mr-2" />
            Full policy wording available upon request (NDA required for
            sensitive limits)
          </p>
        </div>
      </section>
    </div>
  );
}