export type Priority = "high" | "medium" | "low";

export type TaskStatus = "todo" | "pending" | "completed";

export type Task = {
  id: number;
  title: string;
  priority: Priority;
  status: TaskStatus;
  completedAt: string | null;
};

export type SelectedStatus = "incomplete" | "completed" | "all";
