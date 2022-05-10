import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid'
import { CreatetTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks(): Task[] {
        return this.tasks
    }

    getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
        const { status, search } = filterDto
        let tasks = this.getAllTasks()
        if (status) {
            tasks = tasks.filter(t => t.status === status)
        }
        if (search) {
            tasks = tasks.filter(t => t.title.includes(search) || t.description.includes(search))
        }
        return tasks
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find(task => task.id === id)
        if (!found) {
            throw new NotFoundException()
        }
        return found
    }

    createTask(createTaskDto: CreatetTaskDto): Task {
        const { title, description } = createTaskDto
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        return task
    }

    deleteTask(id: string): void {
        const found = this.getTaskById(id)
        this.tasks = this.tasks.filter(task => task.id !== id)
    }

    updateTaskStatus(id: string, taskStatus: TaskStatus): Task {
        const task = this.getTaskById(id)
        task.status = taskStatus
        return task
    }
}
