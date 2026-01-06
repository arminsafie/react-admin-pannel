import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useSettingsStore } from "../store/settingsStore";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useWidgetsStore, DEFAULT_WIDGETS } from "../store/widgetsStore";
import StatsWidget from "../components/widgets/StatsWidget";
import ChartWidget from "../components/widgets/ChartWidget";
import RecentArticlesWidget from "../components/widgets/RecentArticlesWidget";
import LatestUsersWidget from "../components/widgets/LatestUsersWidget";
import ActiveSessionsWidget from "../components/widgets/ActiveSessionsWidget";
import RevenueWidget from "../components/widgets/RevenueWidget";
import TasksWidget from "../components/widgets/TasksWidget";
import NotificationsWidget from "../components/widgets/NotificationsWidget";
import SystemHealthWidget from "../components/widgets/SystemHealthWidget";
import TopPagesWidget from "../components/widgets/TopPagesWidget";

export default function Dashboard() {
  const panelName = useSettingsStore((s) => s.panelName);
  const availableWidgets = useWidgetsStore((s) => s.availableWidgets);
  const setAvailableWidgets = useWidgetsStore((s) => s.setAvailableWidgets);
  const setEnabledWidgets = useWidgetsStore((s) => s.setEnabledWidgets);

  useEffect(() => {
    if (!availableWidgets || availableWidgets.length < DEFAULT_WIDGETS.length) {
      setAvailableWidgets(DEFAULT_WIDGETS);
      setEnabledWidgets(DEFAULT_WIDGETS.map((w) => w.id));
    }
  }, [availableWidgets, setAvailableWidgets, setEnabledWidgets]);

  const [editing, setEditing] = useState(false);
  const enabledWidgets = useWidgetsStore((s) => s.enabledWidgets || []);

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = enabledWidgets.indexOf(active.id);
    const newIndex = enabledWidgets.indexOf(over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      const reordered = arrayMove([...enabledWidgets], oldIndex, newIndex);
      setEnabledWidgets(reordered);
    }
  };

  function SortableWidget({ id, children, disabled }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
      isOver,
      isSorting,
    } = useSortable({ id, disabled });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition: isSorting
        ? "transform 150ms cubic-bezier(0.25, 1, 0.5, 1)"
        : "none",
      opacity: isDragging ? 0.4 : 1,
      cursor: disabled ? "default" : "grab",
      zIndex: isDragging ? 1000 : isOver ? 50 : "auto",
      boxShadow: isDragging ? "0 25px 50px -12px rgba(0, 0, 0, 0.4)" : "none",
      scale: isDragging ? 1.05 : 1,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...(!disabled ? listeners : {})}
        className={`rounded-lg transition-all duration-100 h-full ${
          isOver && !isDragging
            ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20"
            : ""
        }`}
      >
        {children}
      </div>
    );
  }
  // side bar width setting
  const sidebarWidth = useSettingsStore((s) => s.sidebarWidth);
  return (
    <div className="min-h-screen flex flex-col md:flex-row dark:bg-gray-900 bg-gray-50">
      <Sidebar />
      <div
        className={`flex-1 ${
          sidebarWidth === "compact"
            ? "md:ml-54"
            : sidebarWidth === "wide"
            ? "md:ml-80"
            : "md:ml-64"
        } `}
      >
        <Navbar />
        <main className="p-4 md:p-6 md:row-span-8 md:col-span-4 mt-16 md:mt-0 mb-20 md:mb-0">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 dark:text-white">
              {panelName}
            </h1>

            <div className="flex items-center justify-between mb-6">
              <div />
              <button
                onClick={() => setEditing((s) => !s)}
                className={`px-4 py-2 md:block hidden rounded-lg text-sm font-semibold transition-all duration-200 ${
                  editing
                    ? "bg-blue-600 text-white shadow-lg hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {editing ? "Done Editing" : "✎ Edit widgets"}
              </button>
            </div>

            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
            >
              <SortableContext
                items={enabledWidgets}
                strategy={verticalListSortingStrategy}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 overflow-hidden transition-all duration-200 auto-rows-fr">
                  {enabledWidgets.map((id) => {
                    const content = (() => {
                      if (id === "stats") return <StatsWidget key={id} />;
                      if (id === "chart") return <ChartWidget key={id} />;
                      if (id === "recentArticles")
                        return <RecentArticlesWidget key={id} />;
                      if (id === "latestUsers")
                        return <LatestUsersWidget key={id} />;
                      if (id === "activeSessions")
                        return <ActiveSessionsWidget key={id} />;
                      if (id === "revenue") return <RevenueWidget key={id} />;
                      if (id === "tasks") return <TasksWidget key={id} />;
                      if (id === "notifications")
                        return <NotificationsWidget key={id} />;
                      if (id === "systemHealth")
                        return <SystemHealthWidget key={id} />;
                      if (id === "topPages") return <TopPagesWidget key={id} />;
                      return null;
                    })();

                    return (
                      <SortableWidget key={id} id={id} disabled={!editing}>
                        {content}
                      </SortableWidget>
                    );
                  })}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </main>
      </div>
    </div>
  );
}
