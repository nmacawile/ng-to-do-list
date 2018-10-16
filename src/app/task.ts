export interface Task {
  completed: boolean;
  name: string;
  description?: string;
  priority: number;
  due?: Date;
}