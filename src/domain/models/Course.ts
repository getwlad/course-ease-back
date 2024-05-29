import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Student } from "./Student";
import { Teacher } from "./Teacher";

@Table({
  tableName: "Course",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class Course extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  active!: boolean;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @BelongsTo(() => Teacher)
  teacher!: Teacher;

  @HasMany(() => Student)
  students!: Student[];
}
