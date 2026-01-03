import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useArticleStore } from "../store/articleStore";

export default function Articles() {
  const { articles, deleteArticle, editArticle } = useArticleStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  // Get single article if ID is in params
  const selectedArticle = id
    ? articles.find((a) => a.id === parseInt(id))
    : null;

  const handleEditClick = (article) => {
    setEditingId(article.id);
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      author: article.author,
      category: article.category,
      image: article.image,
      readTime: article.readTime,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = (id) => {
    editArticle(id, formData);
    setEditingId(null);
    setFormData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row dark:bg-gray-900 bg-gray-50">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Navbar />
        <main className="p-4 md:p-6 md:row-span-8 md:col-span-4 mt-16 md:mt-0 mb-20 md:mb-0 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {selectedArticle ? (
              // Detail View
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8 border border-transparent dark:border-gray-700">
                <button
                  onClick={() => navigate("/articles")}
                  className="mb-6 flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                  Back to Articles
                </button>

                {editingId === selectedArticle.id ? (
                  <div className="space-y-6">
                    {/* Image Section */}
                    <div>
                      <label className="block text-sm font-semibold dark:text-gray-300 mb-3">
                        Featured Image
                      </label>
                      <img
                        src={formData.image || selectedArticle.image}
                        className="w-full h-96 rounded-lg object-cover mb-4"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-2 rounded w-full"
                      />
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-sm font-semibold dark:text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={formData.title || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="bg-gray-200 dark:bg-gray-700 dark:text-white px-4 py-2 rounded w-full text-2xl font-bold"
                      />
                    </div>

                    {/* Meta Information */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold dark:text-gray-300 mb-2">
                          Author
                        </label>
                        <input
                          type="text"
                          value={formData.author || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, author: e.target.value })
                          }
                          className="bg-gray-200 dark:bg-gray-700 dark:text-white px-4 py-2 rounded w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold dark:text-gray-300 mb-2">
                          Category
                        </label>
                        <input
                          type="text"
                          value={formData.category || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              category: e.target.value,
                            })
                          }
                          className="bg-gray-200 dark:bg-gray-700 dark:text-white px-4 py-2 rounded w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold dark:text-gray-300 mb-2">
                          Read Time
                        </label>
                        <input
                          type="text"
                          value={formData.readTime || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              readTime: e.target.value,
                            })
                          }
                          className="bg-gray-200 dark:bg-gray-700 dark:text-white px-4 py-2 rounded w-full"
                        />
                      </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-sm font-semibold dark:text-gray-300 mb-2">
                        Excerpt
                      </label>
                      <textarea
                        value={formData.excerpt || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, excerpt: e.target.value })
                        }
                        className="bg-gray-200 dark:bg-gray-700 dark:text-white px-4 py-2 rounded w-full h-24"
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <label className="block text-sm font-semibold dark:text-gray-300 mb-2">
                        Content
                      </label>
                      <textarea
                        value={formData.content || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, content: e.target.value })
                        }
                        className="bg-gray-200 dark:bg-gray-700 dark:text-white px-4 py-2 rounded w-full h-32"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-transparent dark:border-gray-700">
                      <button
                        onClick={() => handleSaveEdit(selectedArticle.id)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Featured Image */}
                    <img
                      src={selectedArticle.image}
                      className="w-full h-96 rounded-lg object-cover mb-6"
                    />

                    {/* Title */}
                    <h1 className="text-4xl font-bold dark:text-white mb-4">
                      {selectedArticle.title}
                    </h1>

                    {/* Meta Information */}
                    <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-transparent dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 dark:text-gray-400">
                          By
                        </span>
                        <span className="font-semibold dark:text-white">
                          {selectedArticle.author}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold">
                          {selectedArticle.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <span className="text-gray-600 dark:text-gray-400">
                          {selectedArticle.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Excerpt */}
                    <p className="text-lg dark:text-gray-300 mb-6 italic text-gray-700">
                      {selectedArticle.excerpt}
                    </p>

                    {/* Content */}
                    <div className="prose dark:prose-invert max-w-none mb-6">
                      <p className="dark:text-gray-200 text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {selectedArticle.content}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-6 border-t border-transparent dark:border-gray-700">
                      <button
                        onClick={() => handleEditClick(selectedArticle)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition"
                      >
                        Edit Article
                      </button>
                      <button
                        onClick={() => {
                          deleteArticle(selectedArticle.id);
                          navigate("/articles");
                        }}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition"
                      >
                        Delete Article
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              // List View
              <>
                <h1 className="text-2xl md:text-3xl font-bold mb-6 dark:text-white">
                  Articles
                </h1>
                <div className="grid gap-4 md:gap-6">
                  {articles.map((article) => (
                    <div
                      key={article.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 md:p-6 border border-transparent dark:border-gray-700"
                    >
                      {editingId === article.id ? (
                        <div className="space-y-4">
                          {/* Image Section */}
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex flex-col gap-2">
                              <img
                                src={formData.image || article.image}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover"
                              />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="bg-gray-200 dark:bg-gray-700 dark:text-white px-2 py-1 rounded text-sm"
                              />
                            </div>

                            {/* Edit Form */}
                            <div className="flex-1 space-y-3">
                              <div>
                                <label className="block text-sm dark:text-gray-300 mb-1">
                                  Title
                                </label>
                                <input
                                  type="text"
                                  value={formData.title || ""}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      title: e.target.value,
                                    })
                                  }
                                  className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-2 rounded w-full"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-sm dark:text-gray-300 mb-1">
                                    Author
                                  </label>
                                  <input
                                    type="text"
                                    value={formData.author || ""}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        author: e.target.value,
                                      })
                                    }
                                    className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-2 rounded w-full"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm dark:text-gray-300 mb-1">
                                    Category
                                  </label>
                                  <input
                                    type="text"
                                    value={formData.category || ""}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        category: e.target.value,
                                      })
                                    }
                                    className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-2 rounded w-full"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm dark:text-gray-300 mb-1">
                                  Read Time
                                </label>
                                <input
                                  type="text"
                                  value={formData.readTime || ""}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      readTime: e.target.value,
                                    })
                                  }
                                  className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-2 rounded w-full"
                                />
                              </div>

                              <div>
                                <label className="block text-sm dark:text-gray-300 mb-1">
                                  Excerpt
                                </label>
                                <textarea
                                  value={formData.excerpt || ""}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      excerpt: e.target.value,
                                    })
                                  }
                                  className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-2 rounded w-full h-16"
                                />
                              </div>

                              <div>
                                <label className="block text-sm dark:text-gray-300 mb-1">
                                  Content
                                </label>
                                <textarea
                                  value={formData.content || ""}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      content: e.target.value,
                                    })
                                  }
                                  className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-2 rounded w-full h-20"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 pt-4 border-t dark:border-gray-700">
                            <button
                              onClick={() => handleSaveEdit(article.id)}
                              className="flex-1 text-green-500 hover:text-white hover:bg-green-500 px-4 py-2 transition-all duration-300 rounded-lg cursor-pointer font-semibold text-sm md:text-base"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancel}
                              className="flex-1 text-gray-500 hover:text-white hover:bg-gray-500 px-4 py-2 transition-all duration-300 rounded-lg cursor-pointer font-semibold text-sm md:text-base"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col md:flex-row gap-4">
                          {/* Image */}
                          <img
                            src={article.image}
                            className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover flex-shrink-0"
                          />

                          {/* Content */}
                          <div className="flex-1">
                            <h3 className="text-base md:text-lg font-bold dark:text-white mb-2">
                              {article.title}
                            </h3>
                            <p className="text-sm dark:text-gray-300 mb-3 line-clamp-2">
                              {article.excerpt}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs dark:text-gray-400 mb-4">
                              <div>
                                <span className="font-semibold">Author: </span>
                                {article.author}
                              </div>
                              <div>
                                <span className="font-semibold">
                                  Category:{" "}
                                </span>
                                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded inline-block">
                                  {article.category}
                                </span>
                              </div>
                              <div>
                                <span className="font-semibold">
                                  Read Time:{" "}
                                </span>
                                {article.readTime}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditClick(article)}
                                className="flex-1 md:flex-none text-blue-500 hover:text-white hover:bg-blue-500 px-3 py-1 transition-all duration-300 rounded-lg cursor-pointer text-sm font-semibold"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteArticle(article.id)}
                                className="flex-1 md:flex-none text-red-500 hover:text-white hover:bg-red-500 px-3 py-1 transition-all duration-300 rounded-lg cursor-pointer text-sm font-semibold"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
