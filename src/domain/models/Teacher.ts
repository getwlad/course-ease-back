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
  tableName: "Teacher",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export default class Teacher extends Model {
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

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  active!: boolean;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  courseId!: number | null;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt!: Date;

  @ForeignKey(() => Person)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  personId!: number;

  @BelongsTo(() => Person)
  person!: Person;

  @BelongsTo(() => Course, { foreignKey: "courseId", constraints: false })
  course!: Course | null;
}
