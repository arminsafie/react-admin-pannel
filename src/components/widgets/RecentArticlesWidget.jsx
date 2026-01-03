import { useArticleStore } from "../../store/articleStore";
import { useNavigate } from "react-router-dom";

export default function RecentArticlesWidget() {
  const articles = useArticleStore((s) => s.articles);
  const navigate = useNavigate();

  const recent = [...articles].slice(-3).reverse();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-shadow duration-200 h-full flex flex-col">
      <h3 className="text-gray-600 dark:text-gray-300 text-sm font-semibold mb-5 uppercase tracking-wide">
        Recent Articles
      </h3>
      <ul className="space-y-4">
        {recent.map((a) => (
          <li key={a.id} className="flex items-start gap-3 group">
            <img
              src={a.image}
              alt={a.title}
              className="w-12 h-12 rounded-lg object-cover shadow-sm group-hover:shadow-md transition-shadow"
            />
            <div className="flex-1 min-w-0">
              <button
                onClick={() => navigate(`/articles/${a.id}`)}
                className="text-sm font-semibold dark:text-white text-gray-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
              >
                {a.title}
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {a.author}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
