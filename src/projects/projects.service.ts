import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  // Create a new project
  async createProject(userId: number, name: string, description: string) {
    const project = this.projectRepository.create({ name, description, user: { id: userId } });
    return this.projectRepository.save(project);
  }

  // Update a project by ID
  async updateProject(id: number, userId: number, name: string, description: string) {
    const project = await this.projectRepository.findOne({ where: { id, user: { id: userId } } });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    project.name = name;
    project.description = description;
    return this.projectRepository.save(project);
  }

  // Delete a project by ID
  async deleteProject(id: number, userId: number) {
    const project = await this.projectRepository.findOne({ where: { id, user: { id: userId } } });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.projectRepository.remove(project);
    return { message: 'Project deleted successfully' };
  }
}
