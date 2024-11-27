import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Users, (user) => user.projects, { onDelete: 'CASCADE' })
  user: Users;

  @OneToMany(() => Task, (task) => task.project, { cascade: true })
  tasks: Task[];
}
