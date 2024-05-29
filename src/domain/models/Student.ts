import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Course } from "./";
import { Person } from "./";

@Table({
  tableName: "Student",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export default class Student extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  cpf!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  enrollment!: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  courseId!: number;

  @ForeignKey(() => Person)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  personId!: number;

  @BelongsTo(() => Person)
  person!: Person;

  @BelongsTo(() => Course)
  course!: Course;
}
