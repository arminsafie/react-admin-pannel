import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const sampleData = [
  { name: "Jan", users: 20 },
  { name: "Feb", users: 35 },
  { name: "Mar", users: 50 },
  { name: "Apr", users: 65 },
  { name: "May", users: 80 },
];

export default function ChartWidget() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-shadow duration-200 h-full flex flex-col">
      <h3 className="text-gray-600 dark:text-gray-300 text-sm font-semibold mb-4 uppercase tracking-wide">
        User Growth
      </h3>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <BarChart data={sampleData}>
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "0.5rem",
              }}
            />
            <Bar dataKey="users" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
