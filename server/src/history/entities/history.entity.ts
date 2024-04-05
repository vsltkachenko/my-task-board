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

  @Column({ nullable: true })
  oldCategoryName: string

  @Column({ nullable: true })
  newCategoryName: string

  @Column({ nullable: true })
  oldTaskName: string

  @Column({ nullable: true })
  newTaskName: string

  @Column({ nullable: true }) // Позначення поля, яке можна не передавати
  oldPriority: string

  @Column({ nullable: true })
  newPriority: string

  @Column({ nullable: true })
  oldDuedate: string

  @Column({ nullable: true })
  newDuedate: string

  @Column({ nullable: true })
  oldDescription: string

  @Column({ nullable: true })
  newDescription: string

  @Column({ nullable: true })
  taskId: number   

  @CreateDateColumn()
  createdAt: Date
}
