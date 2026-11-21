import type { Dispatch, SetStateAction } from "react";
import type { SelectedStatus, Task } from "../../types/TaskType";
import TaskCard from "./TaskCard";

const TaskList = ({
  tasks,
  deleteTask,
  selectedStatus,
  setSelectedStatus,
  toggleTask,
  updateTaskTitle,
}: {
  tasks: Task[];
  deleteTask(id: number): void;
  selectedStatus: SelectedStatus;
  setSelectedStatus: Dispatch<SetStateAction<SelectedStatus>>;
  toggleTask(id: number): void;
  updateTaskTitle(id: number, newTitle: string): void;
}) => {
  return (
    <section className="task-list-section">
      <h2>タスク一覧</h2>

      <nav className="filter-buttons" aria-label="タスクの絞り込み">
        <button
          type="button"
          className={`filter-button ${selectedStatus === "incomplete" ? "active" : ""}`}
          aria-pressed={selectedStatus === "incomplete"}
          onClick={() => setSelectedStatus("incomplete")}
        >
          未完了
        </button>
        <button
          type="button"
          className={`filter-button ${selectedStatus === "completed" ? "active" : ""}`}
          aria-pressed={selectedStatus === "completed"}
          onClick={() => setSelectedStatus("completed")}
        >
          完了
        </button>
        <button
          type="button"
          className={`filter-button ${selectedStatus === "all" ? "active" : ""}`}
          aria-pressed={selectedStatus === "all"}
          onClick={() => setSelectedStatus("all")}
        >
          すべて
        </button>
      </nav>

      <div className="task-cards">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            updateTaskTitle={updateTaskTitle}
          />
        ))}
      </div>
    </section>
  );
};

export default TaskList;
