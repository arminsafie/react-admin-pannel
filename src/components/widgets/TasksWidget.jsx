import React from "react";

export default function TasksWidget() {
  const tasks = [
    { id: 1, title: "Review reports" },
    { id: 2, title: "Fix bug #421" },
  ];
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-shadow duration-200 h-full flex flex-col">
      <h3 className="text-gray-600 dark:text-gray-300 text-sm font-semibold mb-4 uppercase tracking-wide">
        Tasks
      </h3>
      <ul className="text-sm space-y-2">
        {tasks.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
          >
            <span className="text-gray-900 dark:text-gray-200">{t.title}</span>
            <button className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors opacity-0 group-hover:opacity-100">
              Open
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
