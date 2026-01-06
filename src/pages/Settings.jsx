import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useSettingsStore } from "../store/settingsStore";
import { useWidgetsStore, DEFAULT_WIDGETS } from "../store/widgetsStore";
import { toast } from "react-toastify";

export default function Settings() {
  const navigate = useNavigate();
  const {
    panelName,
    colorPalette,
    sidebarWidth,
    itemsPerPage,
    notifications,
    autoSave,
    colorPalettes,
    setPanelName,
    setColorPalette,
    setSidebarWidth,
    setItemsPerPage,
    setNotifications,
    setAutoSave,
  } = useSettingsStore();

  const [formData, setFormData] = useState({
    panelName,
    colorPalette,
    sidebarWidth,
    itemsPerPage,
    notifications,
    autoSave,
  });

  const handleSave = () => {
    setPanelName(formData.panelName);
    setColorPalette(formData.colorPalette);
    setSidebarWidth(formData.sidebarWidth);
    setItemsPerPage(formData.itemsPerPage);
    setNotifications(formData.notifications);
    setAutoSave(formData.autoSave);
    toast.success("Settings saved successfully!");
    console.log(formData);
  };

  const availableWidgets = useWidgetsStore((s) => s.availableWidgets);
  const enabledWidgets = useWidgetsStore((s) => s.enabledWidgets);
  const toggleWidget = useWidgetsStore((s) => s.toggleWidget);
  const setEnabledWidgets = useWidgetsStore((s) => s.setEnabledWidgets);
  const setAvailableWidgets = useWidgetsStore((s) => s.setAvailableWidgets);

  // Ensure defaults are present (useful if persisted state is incomplete)
  useEffect(() => {
    if (!availableWidgets || availableWidgets.length < DEFAULT_WIDGETS.length) {
      useWidgetsStore.getState().setAvailableWidgets(DEFAULT_WIDGETS);
      // also ensure enabledWidgets includes defaults if empty
      const curEnabled = useWidgetsStore.getState().enabledWidgets || [];
      if (curEnabled.length < DEFAULT_WIDGETS.length) {
        useWidgetsStore
          .getState()
          .setEnabledWidgets(DEFAULT_WIDGETS.map((w) => w.id));
      }
    }
  }, [availableWidgets]);

  const moveUp = (id) => {
    const idx = availableWidgets.findIndex((w) => w.id === id);
    if (idx > 0) {
      const nextAvail = [...availableWidgets];
      [nextAvail[idx - 1], nextAvail[idx]] = [
        nextAvail[idx],
        nextAvail[idx - 1],
      ];
      setAvailableWidgets(nextAvail);

      // also reorder enabledWidgets if present
      const idxE = enabledWidgets.indexOf(id);
      if (idxE > 0) {
        const nextEnabled = [...enabledWidgets];
        [nextEnabled[idxE - 1], nextEnabled[idxE]] = [
          nextEnabled[idxE],
          nextEnabled[idxE - 1],
        ];
        setEnabledWidgets(nextEnabled);
      }
    }
  };

  const moveDown = (id) => {
    const idx = availableWidgets.findIndex((w) => w.id === id);
    if (idx !== -1 && idx < availableWidgets.length - 1) {
      const nextAvail = [...availableWidgets];
      [nextAvail[idx + 1], nextAvail[idx]] = [
        nextAvail[idx],
        nextAvail[idx + 1],
      ];
      setAvailableWidgets(nextAvail);

      // also reorder enabledWidgets if present
      const idxE = enabledWidgets.indexOf(id);
      if (idxE !== -1 && idxE < enabledWidgets.length - 1) {
        const nextEnabled = [...enabledWidgets];
        [nextEnabled[idxE + 1], nextEnabled[idxE]] = [
          nextEnabled[idxE],
          nextEnabled[idxE + 1],
        ];
        setEnabledWidgets(nextEnabled);
      }
    }
  };

  const colorOptions = [
    { name: "Blue", value: "blue", gradient: "from-blue-500 to-blue-600" },
    {
      name: "Purple",
      value: "purple",
      gradient: "from-purple-500 to-purple-600",
    },
    { name: "Green", value: "green", gradient: "from-green-500 to-green-600" },
    { name: "Red", value: "red", gradient: "from-red-500 to-red-600" },
    {
      name: "Orange",
      value: "orange",
      gradient: "from-orange-500 to-orange-600",
    },
    { name: "Pink", value: "pink", gradient: "from-pink-500 to-pink-600" },
  ];
  // working on widthOptions
  const widthOptions = [
    { name: "Compact", value: "compact" },
    { name: "Normal", value: "normal" },
    { name: "Wide", value: "wide" },
  ];
  const sidebWidth = useSettingsStore((s) => s.sidebarWidth);
  return (
    <div className="min-h-screen flex flex-col md:flex-row dark:bg-gray-900 bg-gray-50">
      <Sidebar />
      <div
        className={`flex-1 ${
          sidebWidth === "compact"
            ? "md:ml-48"
            : sidebWidth === "wide"
            ? "md:ml-80"
            : "md:ml-64"
        } `}
      >
        <Navbar />
        <main className="p-4 md:p-6 md:row-span-8 md:col-span-4 mt-16 md:mt-0 mb-20 md:mb-0">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={() => navigate("/")}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
              >
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-400"
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
              </button>
              <h1 className="text-3xl font-bold dark:text-white">Settings</h1>
            </div>

            {/* Settings Cards */}
            <div className="space-y-6">
              {/* Panel Name Settings */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-transparent dark:border-gray-700">
                <h2 className="text-xl font-bold dark:text-white mb-4 flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    ></path>
                  </svg>
                  Panel Settings
                </h2>
                <div>
                  <label className="block text-sm font-semibold dark:text-gray-300 mb-2">
                    Panel Name
                  </label>
                  <input
                    type="text"
                    value={formData.panelName}
                    onChange={(e) =>
                      setFormData({ ...formData, panelName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-transparent dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    Customize the name of your admin panel (shown in navbar)
                  </p>
                </div>
              </div>

              {/* Color Palette Settings */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-transparent dark:border-gray-700">
                <h2 className="text-xl font-bold dark:text-white mb-4 flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a6 6 0 016 6v4a6 6 0 016 6v4a2 2 0 01-2 2h-4.5"
                    ></path>
                  </svg>
                  Color Palette
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Choose your preferred color theme
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() =>
                        setFormData({ ...formData, colorPalette: color.value })
                      }
                      className={`relative group rounded-lg p-4 transition-all transform hover:scale-105 ${
                        formData.colorPalette === color.value
                          ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-gray-800 dark:ring-white shadow-lg"
                          : ""
                      }`}
                    >
                      <div
                        className={`w-full h-24 rounded-lg bg-gradient-to-br ${color.gradient} shadow-md`}
                      ></div>
                      <p className="text-center text-sm font-semibold dark:text-white mt-2">
                        {color.name}
                      </p>
                      {formData.colorPalette === color.value && (
                        <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1">
                          <svg
                            className="w-5 h-5 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Display Settings */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-transparent dark:border-gray-700">
                <h2 className="text-xl font-bold dark:text-white mb-4 flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5h.01v.01H12v-.01z"
                    ></path>
                  </svg>
                  Display Settings
                </h2>

                <div className="space-y-4">
                  {/* Sidebar Width */}
                  <div>
                    <label className="block text-sm font-semibold dark:text-gray-300 mb-2">
                      Sidebar Width
                    </label>
                    <select
                      value={formData.sidebarWidth}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sidebarWidth: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-transparent dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                      {widthOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Items Per Page */}
                  <div>
                    <label className="block text-sm font-semibold dark:text-gray-300 mb-2">
                      Items Per Page
                    </label>
                    <select
                      value={formData.itemsPerPage}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          itemsPerPage: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-transparent dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                      <option value={5}>5 items</option>
                      <option value={10}>10 items</option>
                      <option value={20}>20 items</option>
                      <option value={50}>50 items</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Preferences Settings */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-transparent dark:border-gray-700">
                <h2 className="text-xl font-bold dark:text-white mb-4 flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    ></path>
                  </svg>
                  Preferences
                </h2>

                <div className="space-y-4">
                  {/* Notifications Toggle */}
                  <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-semibold dark:text-white">
                        Enable Notifications
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive notifications for important updates
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.notifications}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            notifications: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Auto-Save Toggle */}
                  <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-semibold dark:text-white">
                        Auto-Save Changes
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Automatically save changes without confirmation
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.autoSave}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            autoSave: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Widgets Manager */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-transparent dark:border-gray-700 mt-6">
              <h2 className="text-xl font-bold dark:text-white mb-4 flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7h18M3 12h18M3 17h18"
                  ></path>
                </svg>
                Widgets
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Manage which widgets appear on the dashboard and their order.
              </p>

              <div className="space-y-3">
                {availableWidgets.map((w) => {
                  const enabled = enabledWidgets.includes(w.id);
                  return (
                    <div
                      key={w.id}
                      className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold dark:text-white">
                          {w.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {w.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={enabled}
                              onChange={() => toggleWidget(w.id)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex flex-col">
                          <button
                            onClick={() => moveUp(w.id)}
                            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                            title="Move up"
                          >
                            <svg
                              className="w-4 h-4 text-gray-700 dark:text-gray-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 15l7-7 7 7"
                              ></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => moveDown(w.id)}
                            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                            title="Move down"
                          >
                            <svg
                              className="w-4 h-4 text-gray-700 dark:text-gray-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Save Button */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleSave}
                className={`flex-1 bg-gradient-to-r ${colorPalettes[colorPalette].gradient} hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2`}
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
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Save Settings
              </button>
              <button
                onClick={() =>
                  setFormData({
                    panelName,
                    colorPalette,
                    sidebarWidth,
                    itemsPerPage,
                    notifications,
                    autoSave,
                  })
                }
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                Reset
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
