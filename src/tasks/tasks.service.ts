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
    // Get all tasks for a specific project
    async getTasksByProject(projectId: number) {
      return this.taskRepository.find({
        where: { project: { id: projectId } },
      });
    }
  
    // Get a specific task by ID
    async getTaskById(id: number) {
      const task = await this.taskRepository.findOne({
        where: { id },
        relations: ['project'], // Include the project info
      });
  
      if (!task) {
        throw new NotFoundException('Task not found');
      }
  
      return task;
    }
}
