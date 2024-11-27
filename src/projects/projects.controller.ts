import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createProject(@Req() req, @Body() body: { name: string; description: string }) {
    return this.projectsService.createProject(req.user.id, body.name, body.description);
  }
}
