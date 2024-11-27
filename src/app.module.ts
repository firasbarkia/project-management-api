import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'project_management',
      autoLoadEntities: true,
      synchronize: true, // Only for development, disable in production
    }),
    UsersModule,
    AuthModule,
    ProjectsModule,
    TasksModule,
  ],
})
export class AppModule {}
