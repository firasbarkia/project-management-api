import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createProject(userId: number, name: string, description: string) {
    const project = this.projectRepository.create({ name, description, user: { id: userId } });
    return this.projectRepository.save(project);
  }
}
