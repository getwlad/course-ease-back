import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  HasMany,
  HasOne,
} from "sequelize-typescript";
import { Student } from "./";
import { Teacher } from "./";

@Table({
  tableName: "Course",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export default class Course extends Model {
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

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt!: Date;

  @HasOne(() => Teacher)
  teacher!: Teacher;

  @HasMany(() => Student)
  students!: Student[];
}
