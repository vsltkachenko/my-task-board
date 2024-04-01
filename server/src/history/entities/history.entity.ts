import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  actionId: number = 0

  @Column()
  oldCategoryName: string = ''

  @Column()
  newCategoryName: string = ''

  @Column()
  oldTaskName: string = ''

  @Column()
  newTaskName: string = ''

  @Column()
  taskId: number 

  // @Column()
  // categoryId: number 

  @CreateDateColumn()
  createdAt: Date
}
