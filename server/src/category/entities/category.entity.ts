import { Task } from 'src/task/entities/task.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  id: number

  @Column()
  title: string

  @OneToMany(() => Task, (task) => task.category)
  tasks: Task[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
