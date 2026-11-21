import type { Task } from "../types/TaskType";

const TaskSummary = ({ tasks }: { tasks: Task[] }) => {
  const todoCount = tasks.filter(
    (task) => task.status === "todo" || task.status === "pending",
  ).length;

  const completedCount = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  const totalCount = tasks.length;

  return (
    <section className="task-summary">
      <div className="summary-card">
        <span>未完了</span>
        <strong>{todoCount}</strong>
      </div>
      <div className="summary-card">
        <span>完了</span>
        <strong>{completedCount}</strong>
      </div>
      <div className="summary-card">
        <span>全タスク</span>
        <strong>{totalCount}</strong>
      </div>
    </section>
  );
};

export default TaskSummary;
