export interface Task {
  name: string;
  description: string;
  priority: number;
  due?: Date;
}