import React from "react";

export default function ActiveSessionsWidget() {
  const sessions = 12; // placeholder
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-shadow duration-200 h-full flex flex-col">
      <h3 className="text-gray-600 dark:text-gray-300 text-sm font-semibold mb-4 uppercase tracking-wide">
        Active Sessions
      </h3>
      <div className="flex items-baseline gap-2">
        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
          {sessions}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          users online
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
        Currently active
      </p>
    </div>
  );
}
