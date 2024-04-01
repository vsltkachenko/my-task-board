import { Category } from 'src/category/entities/category.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  duedate: string

  @Column()
  priority: string 

  @Column()
  description: string

  @ManyToOne(() => Category, (category) => category.tasks, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'category_id' })
  category: Category

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updateddAt: Date
}
