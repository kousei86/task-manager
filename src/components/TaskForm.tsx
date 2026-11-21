import type { SelectedStatus, Task, Priority } from "../types/TaskType";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

const TaskForm = ({
  setTasks,
  setSelectedStatus,
}: {
  setTasks: Dispatch<SetStateAction<Task[]>>;
  setSelectedStatus: Dispatch<SetStateAction<SelectedStatus>>;
}) => {
  const [taskName, setTaskName] = useState<string>("");
  const [taskPriority, setTaskPriority] = useState<Priority>("medium");

  const addNewTask = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = taskName.trim();
    if (trimmedName === "") return;

    setTasks((prev) => [
      {
        id: Math.max(0, ...prev.map((task) => task.id)) + 1,
        title: trimmedName,
        priority: taskPriority,
        status: "todo",
        completedAt: null,
      },
      ...prev,
    ]);

    setTaskName("");
    setTaskPriority("medium");
    setSelectedStatus("incomplete");
  };

  return (
    <section className="task-form-section">
      <h2>新しいタスク</h2>

      <form className="task-form" onSubmit={addNewTask}>
        <input
          type="text"
          placeholder="タスク名を入力してください"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <div className="form-bottom">
          <div className="priority-field">
            <label htmlFor="priority">重要度</label>
            <select
              id="priority"
              value={taskPriority}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setTaskPriority(e.target.value as Priority)
              }
            >
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
          </div>

          <button type="submit" className="add-button">
            ＋ 追加
          </button>
        </div>
      </form>
    </section>
  );
};

export default TaskForm;
