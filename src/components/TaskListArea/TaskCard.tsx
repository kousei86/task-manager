import type { Task } from "../../types/TaskType";
import { useState } from "react";

const TaskCard = ({
  task,
  deleteTask,
  toggleTask,
  updateTaskTitle,
}: {
  task: Task;
  deleteTask(id: number): void;
  toggleTask(id: number): void;
  updateTaskTitle(id: number, newTitle: string): void;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(task.title);

  // タスクのタイトル編集
  const editTitle = () => {
    setEditedTitle(task.title);
    setIsEditing(true);
  };

  // タスクのタイトル保存
  const saveTitle = () => {
    const newTitle = editedTitle.trim();
    if (newTitle === "") return;

    updateTaskTitle(task.id, newTitle);
    setIsEditing(false);
  };

  // タスクのタイトル編集をキャンセル
  const cancelEdit = () => {
    //setEditedTitle(task.title);
    setIsEditing(false);
  };

  return (
    <article className="task-card">
      <input
        type="checkbox"
        checked={task.status === "completed" || task.status === "pending"}
        aria-label={task.title}
        onChange={() => toggleTask(task.id)}
      />
      <div className="task-content">
        {isEditing ? (
          <input
            type="text"
            className="titleEdit"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <>
            <span className="task-completedAt">{task.completedAt}</span>
            <span className="task-title">{task.title}</span>
          </>
        )}
      </div>
      <span className={`priority-badge priority-${task.priority}`}>
        {task.priority === "high"
          ? "高"
          : task.priority === "medium"
            ? "中"
            : "低"}
      </span>
      {isEditing ? (
        <>
          <button
            type="button"
            className="edit-button"
            aria-label="保存"
            onClick={saveTitle}
          >
            保存
          </button>
          <button
            type="button"
            className="cancel-button"
            aria-label="キャンセル"
            onClick={cancelEdit}
          >
            キャンセル
          </button>
        </>
      ) : (
        <button
          type="button"
          className="edit-button"
          aria-label="編集"
          onClick={editTitle}
        >
          編集
        </button>
      )}
      <button
        type="button"
        className="delete-button"
        aria-label="削除"
        onClick={() => deleteTask(task.id)}
      >
        🗑
      </button>
    </article>
  );
};

export default TaskCard;
