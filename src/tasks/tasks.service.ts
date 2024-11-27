import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Project } from '../projects/entities/project.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createTask(projectId: number, title: string, description: string) {
    const project = await this.projectRepository.findOne({ where: { id: projectId } });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const task = this.taskRepository.create({ title, description, project });
    return this.taskRepository.save(task);
  }

  async updateTask(id: number, title: string, description: string, completed: boolean) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    task.title = title;
    task.description = description;
    task.completed = completed;
    return this.taskRepository.save(task);
  }

  async deleteTask(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.taskRepository.remove(task);
    return { message: 'Task deleted successfully' };
  }
}
