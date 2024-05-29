import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Course } from "./Course";
import { Person } from "./Person";

@Table({
  tableName: "Teacher",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class Teacher extends Model {
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
  cpfCnpj!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  specialization!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  experienceYears!: number;

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
