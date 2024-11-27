import { Controller, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create/:projectId')
  async createTask(
    @Param('projectId') projectId: number,
    @Body() body: { title: string; description: string },
  ) {
    return this.tasksService.createTask(projectId, body.title, body.description);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async updateTask(
    @Param('id') id: number,
    @Body() body: { title: string; description: string; completed: boolean },
  ) {
    return this.tasksService.updateTask(id, body.title, body.description, body.completed);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteTask(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }
}
