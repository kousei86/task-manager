import "./App.css";
import type { Task, SelectedStatus } from "./types/TaskType.ts";
import TaskSummary from "./components/TaskSummary.tsx";
import TaskForm from "./components/TaskForm.tsx";
import TaskList from "./components/TaskListArea/TaskList.tsx";
import { useState, useRef, useEffect } from "react";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "会議資料を作成する",
      priority: "high",
      status: "todo",
      completedAt: null,
    },
    {
      id: 2,
      title: "レポートを確認する",
      priority: "medium",
      status: "todo",
      completedAt: null,
    },
    {
      id: 3,
      title: "メールを返信する",
      priority: "low",
      status: "completed",
      completedAt: "2026-11-20 13:11",
    },
  ]);

  //絞り込みの状態管理
  const [selectedStatus, setSelectedStatus] =
    useState<SelectedStatus>("incomplete");

  // 時間監視の状態管理
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  // タイマーのキャンセル
  const cancelTimer = (id: number) => {
    // 以前のタイマーがあれば取り消す
    const existingTimer = timersRef.current.get(id);

    if (existingTimer !== undefined) {
      clearTimeout(existingTimer);
      timersRef.current.delete(id);
    }
  };

  // 削除機能
  const deleteTask = (id: number) => {
    // 以前のタイマーがあれば取り消す
    cancelTimer(id);

    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // タスクのタイトル更新
  const updateTaskTitle = (id: number, newTitle: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            title: newTitle,
          };
        }
        return task;
      }),
    );
  };

  // 絞り込みの計算
  const listedTasks = tasks.filter((task) => {
    if (selectedStatus === "incomplete") {
      return task.status === "todo" || task.status === "pending";
    }

    if (selectedStatus === "completed") {
      return task.status === "completed";
    }

    return true;
  });

  // 未完了と完了の切り替え
  const toggleTask = (id: number) => {
    const targetTask = tasks.find((task) => task.id === id);
    if (!targetTask) {
      return;
    }

    // 以前のタイマーがあれば取り消す
    cancelTimer(id);

    // 現在のタスク状態を変更する
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) {
          return task;
        }

        if (task.status === "todo") {
          return {
            ...task,
            status: "pending",
            completedAt: null,
          };
        }

        if (task.status === "pending") {
          return {
            ...task,
            status: "todo",
            completedAt: null,
          };
        }

        if (task.status === "completed") {
          return {
            ...task,
            status: "todo",
            completedAt: null,
          };
        }

        return task;
      }),
    );

    // 新しいタイマーを予約する
    if (targetTask.status === "todo") {
      const timerId = setTimeout(() => {
        setTasks((prev) =>
          prev.map((task) => {
            if (task.id === id && task.status === "pending") {
              return {
                ...task,
                status: "completed",
                completedAt: new Date().toLocaleString("ja-JP"),
              };
            }

            return task;
          }),
        );
        timersRef.current.delete(id);
      }, 1000);
      timersRef.current.set(id, timerId);
    }
  };

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timerId) => {
        clearTimeout(timerId);
      });

      timers.clear();
    };
  }, []);

  return (
    <main className="app-shell">
      <div className="task-board">
        <header className="app-header">
          <span className="app-logo">✓</span>
          <h1>My Task Board</h1>
        </header>

        <TaskSummary tasks={tasks} />

        <TaskForm setTasks={setTasks} setSelectedStatus={setSelectedStatus} />

        <TaskList
          tasks={listedTasks}
          deleteTask={deleteTask}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          toggleTask={toggleTask}
          updateTaskTitle={updateTaskTitle}
        />
      </div>
    </main>
  );
};

export default App;
