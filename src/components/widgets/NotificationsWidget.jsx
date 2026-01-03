import React from "react";

export default function NotificationsWidget() {
  const notes = ["Server backup completed", "New comment on article"];
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-shadow duration-200 h-full flex flex-col">
      <h3 className="text-gray-600 dark:text-gray-300 text-sm font-semibold mb-4 uppercase tracking-wide">
        Notifications
      </h3>
      <ul className="text-sm space-y-2">
        {notes.map((n, i) => (
          <li
            key={i}
            className="flex justify-between items-start p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="text-gray-900 dark:text-gray-200">{n}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              now
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
