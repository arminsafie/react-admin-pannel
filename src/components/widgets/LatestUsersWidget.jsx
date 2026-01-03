import React from "react";
import { Link } from "react-router-dom";

export default function LatestUsersWidget() {
  // placeholder content — can be wired to real store/data
  const users = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Brown" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-shadow duration-200 h-full flex flex-col">
      <h3 className="text-gray-600 dark:text-gray-300 text-sm font-semibold mb-5 uppercase tracking-wide">
        Latest Users
      </h3>
      <ul className="text-sm space-y-3">
        {users.map((u) => (
          <li
            key={u.id}
            className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
          >
            <span className="text-gray-900 dark:text-gray-200 font-medium">
              {u.name}
            </span>
            <Link
              to={`/users`}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors opacity-0 group-hover:opacity-100"
            >
              View
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
