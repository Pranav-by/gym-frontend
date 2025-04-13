import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const initialAttendanceData = [
  { name: 'Aman Gupta', date: '2025-04-04', timeIn: '08:00' },
  { name: 'Meera Singh', date: '2025-04-04', timeIn: '09:30' },
  { name: 'Ravi Kumar', date: '2025-04-03', timeIn: '07:45' },
  { name: 'Simran Kaur', date: '2025-04-03', timeIn: '10:15' },
];

const GymAttendance = () => {
  const [attendanceData, setAttendanceData] = useState(initialAttendanceData);
  const [searchName, setSearchName] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', date: '', timeIn: '' });
  const [showForm, setShowForm] = useState(false);

  // Count by date
  const attendanceByDate = attendanceData.reduce((acc, entry) => {
    acc[entry.date] = (acc[entry.date] || 0) + 1;
    return acc;
  }, {});

  // Filter data
  const filtered = attendanceData.filter(entry =>
    entry.name.toLowerCase().includes(searchName.toLowerCase()) &&
    (filterDate === '' || entry.date === filterDate)
  );

  // Add new entry
  const addEntry = () => {
    if (newEntry.name && newEntry.date && newEntry.timeIn) {
      setAttendanceData([...attendanceData, newEntry]);
      setNewEntry({ name: '', date: '', timeIn: '' });
      setShowForm(false);
    }
  };

  // Delete entry
  const handleDelete = (indexToDelete) => {
    const updatedData = attendanceData.filter((_, index) => index !== indexToDelete);
    setAttendanceData(updatedData);
  };

  return (
    <div className="p-10 min-h-screen text-white bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <h1 className="text-3xl font-bold text-pink-400 mb-6">📋 Gym Attendance</h1>

      {/* Search + Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          className="p-2 rounded bg-gray-800 text-white"
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="date"
          className="p-2 rounded bg-gray-800 text-white"
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      {/* Add Attendance Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-xl transition"
        >
          <Plus /> Add Attendance
        </button>
      </div>

      {/* Modal for Adding Attendance */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl space-y-4 w-full max-w-md">
            <h2 className="text-2xl text-white font-bold">➕ Add Attendance</h2>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full p-2 rounded bg-gray-800 text-white"
              value={newEntry.name}
              onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
            />
            <input
              type="date"
              className="w-full p-2 rounded bg-gray-800 text-white"
              value={newEntry.date}
              onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
            />
            <input
              type="time"
              className="w-full p-2 rounded bg-gray-800 text-white"
              value={newEntry.timeIn}
              onChange={(e) => setNewEntry({ ...newEntry, timeIn: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowForm(false)} className="text-red-400">Cancel</button>
              <button onClick={addEntry} className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700">Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Table */}
      <div className="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-blue-300 border-b border-gray-600">
              <th className="py-2">Member Name</th>
              <th className="py-2">Date</th>
              <th className="py-2">Time In</th>
              <th className="py-2 text-red-400">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry, idx) => (
              <tr key={idx} className="hover:bg-gray-700 transition">
                <td className="py-2">{entry.name}</td>
                <td className="py-2">{entry.date}</td>
                <td className="py-2 text-green-400 font-semibold">{entry.timeIn}</td>
                <td className="py-2">
                  <button
                    onClick={() => handleDelete(attendanceData.indexOf(entry))}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bar Chart */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-yellow-300">📊 Attendance Summary</h2>
        <div className="flex items-end gap-6 h-48">
          {Object.entries(attendanceByDate).map(([date, count]) => (
            <div key={date} className="text-center">
              <div
                className="bg-green-400 w-12 mx-auto rounded-t"
                style={{ height: `${count * 40}px` }}
              ></div>
              <p className="mt-2 text-sm">{date}</p>
              <p className="text-xs text-gray-300">{count} visits</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GymAttendance;
