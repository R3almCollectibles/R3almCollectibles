// src/pages/admin/AdminDashboard.tsx — BOLT.NEW FULLSCREEN ADMIN FIX
import React, { useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';

export default function AdminDashboard() {
  useEffect(() => {
    // FORCE REMOVE BOLT'S SIDEBAR — THIS IS SAFE & WORKS ONLY ON BOLT.NEW
    const boltSidebar = document.querySelector('[data-testid="sidebar"]');
    const boltHeader = document.querySelector('[data-testid="topbar"]');
    const boltFloating = document.querySelectorAll('[class*="floating"]');

    if (boltSidebar) boltSidebar.remove();
    if (boltHeader) boltHeader.remove();
    boltFloating.forEach(el => el.remove());

    // Make body full width
    document.body.style.marginLeft = '0px';
    document.body.style.paddingLeft = '0px';
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-gray-950 z-[9999]">
        <AdminSidebar />
        <div className="ml-72 min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
          <div className="p-12">
            <div className="text-center py-24">
              <h1 className="text-8xl font-black text-white mb-8">
                CAPITAL REALM
              </h1>
              <h2 className="text-5xl font-bold text-red-500 mb-12">
                ADMIN COMMAND CENTER
              </h2>
              <div className="grid grid-cols-4 gap-8 max-w-6xl mx-auto">
                <div className="bg-white/10 backdrop-blur rounded-3xl p-10 text-center">
                  <div className="text-6xl font-bold text-cyan-400">284</div>
                  <div className="text-2xl text-gray-300 mt-4">Collectibles</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-3xl p-10 text-center">
                  <div className="text-6xl font-bold text-yellow-400">18</div>
                  <div className="text-2xl text-gray-300 mt-4">Pending Review</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-3xl p-10 text-center">
                  <div className="text-6xl font-bold text-green-400">127.4 ETH</div>
                  <div className="text-2xl text-gray-300 mt-4">Total Revenue</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-3xl p-10 text-center">
                  <div className="text-6xl font-bold text-purple-400">8.9 ETH</div>
                  <div className="text-2xl text-gray-300 mt-4">Platform Fees</div>
                </div>
              </div>
              <p className="text-3xl text-gray-400 mt-16">
                You now have <span className="text-red-500 font-bold">GOD MODE</span> enabled.
              </p>
              <p className="text-xl text-gray-500 mt-8">
                Bolt.new sidebar removed. Full control restored.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}