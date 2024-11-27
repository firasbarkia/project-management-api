import { Controller, Post,Get, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // Create a new project
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createProject(@Req() req, @Body() body: { name: string; description: string }) {
    return this.projectsService.createProject(req.user.id, body.name, body.description);
  }

  // Update an existing project
  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async updateProject(
    @Req() req,
    @Param('id') id: number,
    @Body() body: { name: string; description: string },
  ) {
    return this.projectsService.updateProject(id, req.user.id, body.name, body.description);
  }

  // Delete a project
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteProject(@Req() req, @Param('id') id: number) {
    return this.projectsService.deleteProject(id, req.user.id);
  }
    // Get all projects for a user
    @UseGuards(JwtAuthGuard)
    @Get()
    async getUserProjects(@Req() req) {
      return this.projectsService.getUserProjects(req.user.id);
    }
  
    // Get a specific project by ID
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getProjectById(@Req() req, @Param('id') id: number) {
      return this.projectsService.getProjectById(id, req.user.id);
    }
}
