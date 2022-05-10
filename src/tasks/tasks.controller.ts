import { Body, Controller, Get, Post, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatetTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {

    }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilters(filterDto)
        } else {
            return this.taskService.getAllTasks()
        }
    }
    
    @Get("/:id")
    getTaskById(@Param("id") id: string) {
        return this.taskService.getTaskById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreatetTaskDto): Task {
            return this.taskService.createTask(createTaskDto)
    }

    @Delete("/:id")
    deleteTask(@Param("id") id: string) {
        this.taskService.deleteTask(id)
    }

    @Patch("/:id/status")
    updateTaskStatus(
        @Param("id") id: string,
        @Body("status", TaskStatusValidationPipe) status: TaskStatus
    ) {
        return this.updateTaskStatus(id, status)
    }
}
