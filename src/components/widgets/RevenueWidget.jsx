import React from "react";

export default function RevenueWidget() {
  const revenue = "$12,340";
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-shadow duration-200 h-full flex flex-col">
      <h3 className="text-gray-600 dark:text-gray-300 text-sm font-semibold mb-4 uppercase tracking-wide">
        Revenue
      </h3>
      <div className="text-4xl font-bold text-green-600 dark:text-green-400">
        {revenue}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
        Last 30 days
      </p>
    </div>
  );
}
