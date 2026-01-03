import React from "react";

export default function SystemHealthWidget() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-shadow duration-200 h-full flex flex-col">
      <h3 className="text-gray-600 dark:text-gray-300 text-sm font-semibold mb-4 uppercase tracking-wide">
        System Health
      </h3>
      <div className="flex items-center gap-3">
        <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
        <div className="text-sm text-gray-900 dark:text-gray-200 font-medium">
          All systems operational
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
        Uptime: 99.9%
      </p>
    </div>
  );
}
