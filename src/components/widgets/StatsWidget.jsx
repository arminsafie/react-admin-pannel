import { useUsersStore } from "../../store/usersStore";
import { useArticleStore } from "../../store/articleStore";

export default function StatsWidget() {
  const users = useUsersStore((s) => s.users);
  const articles = useArticleStore((s) => s.articles);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-shadow duration-200 h-full flex flex-col">
      <h3 className="text-gray-600 dark:text-gray-300 text-sm font-semibold mb-5 uppercase tracking-wide">
        Overview
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 dark:from-blue-900 dark:from-opacity-30 to-transparent">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">
            Users
          </p>
          <p className="text-3xl font-bold dark:text-blue-400 text-blue-600">
            {users.length}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-gradient-to-br from-green-50 dark:from-green-900 dark:from-opacity-30 to-transparent">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">
            Articles
          </p>
          <p className="text-3xl font-bold dark:text-green-400 text-green-600">
            {articles.length}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-gradient-to-br from-purple-50 dark:from-purple-900 dark:from-opacity-30 to-transparent">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">
            Pages
          </p>
          <p className="text-3xl font-bold dark:text-purple-400 text-purple-600">
            {Math.ceil((users.length + articles.length) / 10)}
          </p>
        </div>
      </div>
    </div>
  );
}
