// src/pages/PhysicalStorageSecurity.tsx
import { Shield, Camera, Users, Building2 } from "lucide-react";

export default function PhysicalStorageSecurity() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-gray-900 py-20 px-6 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Military-Grade Physical Vaults
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Assets are stored in purpose-built, geographically dispersed,
            underground facilities with 24/7 armed security and biometric
            controls.
          </p>
        </div>
      </section>

      {/* Security Layers */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Multi-Layered Physical Security
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: Building2,
                title: "Fortress Construction",
                items: [
                  "Reinforced concrete & steel vaults",
                  "Class V+ UL-rated doors",
                  "Seismic & flood protection",
                ],
              },
              {
                icon: Camera,
                title: "Surveillance & Monitoring",
                items: [
                  "4K AI-powered cameras (interior & exterior)",
                  "Motion, thermal & acoustic sensors",
                  "24/7 remote monitoring center",
                ],
              },
              {
                icon: Users,
                title: "Access Control",
                items: [
                  "Dual biometric + PIN authentication",
                  "Man-traps and anti-tailgating",
                  "Zero-knowledge visitor policy",
                ],
              },
            ].map((layer, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <layer.icon className="w-14 h-14 mb-6 text-slate-700 dark:text-slate-300" />
                <h3 className="text-2xl font-semibold mb-6">{layer.title}</h3>
                <ul className="space-y-3">
                  {layer.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <Shield className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Certifications & Compliance</h2>
          <div className="flex flex-wrap justify-center gap-10 text-lg font-medium">
            <div>SOC 2 Type II</div>
            <div>ISO 27001</div>
            <div>PCI DSS</div>
            <div>UL Class V Vault</div>
            <div>Private Armed Security Licensed</div>
          </div>
        </div>
      </section>
    </div>
  );
}