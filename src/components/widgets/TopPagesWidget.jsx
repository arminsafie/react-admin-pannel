import React from "react";

export default function TopPagesWidget() {
  const pages = [
    { id: 1, title: "Home", views: 1200 },
    { id: 2, title: "Blog", views: 800 },
  ];
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-shadow duration-200 h-full flex flex-col">
      <h3 className="text-gray-600 dark:text-gray-300 text-sm font-semibold mb-4 uppercase tracking-wide">
        Top Pages
      </h3>
      <ul className="text-sm space-y-2">
        {pages.map((p) => (
          <li
            key={p.id}
            className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="text-gray-900 dark:text-gray-200 font-medium">
              {p.title}
            </span>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
              {p.views.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
