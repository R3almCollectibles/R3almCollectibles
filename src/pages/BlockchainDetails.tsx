// src/pages/BlockchainDetails.tsx
import { Shield, Lock, Globe, CheckCircle2 } from "lucide-react";

export default function BlockchainDetails() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-800 py-20 px-6 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Immutable Blockchain Ledger
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Every transaction and custody event is recorded on a permissioned,
            enterprise-grade blockchain — transparent, tamper-proof, and
            auditable in real time.
          </p>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            {
              icon: Shield,
              title: "Permissioned Network",
              desc: "Only verified custodians and regulators have access",
            },
            {
              icon: Lock,
              title: "Cryptographic Proofs",
              desc: "Every asset movement signed with private keys",
            },
            {
              icon: Globe,
              title: "Global Replication",
              desc: "Data replicated across 12+ geographic nodes",
            },
            {
              icon: CheckCircle2,
              title: "Real-Time Audit Trail",
              desc: "Instant verification by auditors and clients",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
            >
              <item.icon className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Details */}
      <section className="bg-white dark:bg-gray-800 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Technical Specifications
          </h2>
          <div className="grid md:grid-cols-2 gap-12 text-lg">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Consensus</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Raft-based consensus for high throughput</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Finality in &lt; 2 seconds</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Security</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Hardware Security Modules (HSM) for all keys</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Multi-signature cold storage policies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}