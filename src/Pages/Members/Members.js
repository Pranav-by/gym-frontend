import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HoverSound from '../../utils/HoverSound';

const Members = () => {
  const originalMembers = [
    { id: '001', name: 'John Doe', email: 'john@example.com', joined: '2025-04-01', plan: 'Gold' },
    { id: '002', name: 'Aman Gupta', email: 'aman@gymmail.com', joined: '2025-04-03', plan: 'Platinum' },
    { id: '003', name: 'Meera Singh', email: 'meera.singh@gymmail.com', joined: '2025-04-04', plan: 'Standard' },
    { id: '004', name: 'Ravi Kumar', email: 'ravi.kumar@gymmail.com', joined: '2025-04-02', plan: 'Basic' },
  ];

  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [planFilter, setPlanFilter] = useState('');

  const filteredMembers = originalMembers
    .filter((member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((member) => (planFilter ? member.plan === planFilter : true))
    .sort((a, b) =>
      sortAsc
        ? new Date(a.joined) - new Date(b.joined)
        : new Date(b.joined) - new Date(a.joined)
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white p-6 font-sans overflow-x-hidden">
      <HoverSound />

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-4xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-10 drop-shadow-xl"
      >
        👥 Joined Members Panel
      </motion.h1>

      {/* Controls */}
      <motion.div
        className="flex flex-wrap gap-4 justify-center items-center mb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <input
          type="text"
          placeholder="🔍 Search by name/email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-900 px-4 py-2 rounded-lg border border-gray-700 text-white w-64 hover:shadow-lg transition-all focus:ring-2 focus:ring-purple-600"
        />
        <select
          value={planFilter}
          onChange={(e) => setPlanFilter(e.target.value)}
          className="bg-gray-900 px-4 py-2 rounded-lg border border-gray-700 text-white hover:shadow-lg focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">All Plans</option>
          <option value="Basic">Basic</option>
          <option value="Standard">Standard</option>
          <option value="Gold">Gold</option>
          <option value="Platinum">Platinum</option>
        </select>
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 shadow-xl"
        >
          Sort by Date {sortAsc ? '⬆️' : '⬇️'}
        </button>
      </motion.div>

      {/* Count */}
      <motion.div
        className="text-center text-green-400 font-medium mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Total Members: {filteredMembers.length}
      </motion.div>

      {/* Table */}
      <div className="overflow-x-auto bg-[#0d0d0d]/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10">
        <table className="min-w-full table-auto text-sm md:text-base">
          <thead className="text-left bg-gradient-to-r from-gray-800 to-gray-900 text-green-400">
            <tr>
              <th className="py-4 px-6"># ID</th>
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Joined</th>
              <th className="py-4 px-6">Plan</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, index) => (
              <motion.tr
                key={index}
                whileHover={{ scale: 1.015 }}
                className="hover:bg-gray-800 transition-all"
              >
                <td className="py-3 px-6 font-semibold text-gray-300">#{member.id}</td>
                <td className="py-3 px-6 text-white">{member.name}</td>
                <td className="py-3 px-6 text-blue-300">{member.email}</td>
                <td className="py-3 px-6 text-gray-400">{member.joined}</td>
                <td className="py-3 px-6 text-yellow-400 font-bold">{member.plan}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;
