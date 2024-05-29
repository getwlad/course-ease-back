import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "User",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class User extends Model {
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
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  active!: boolean;
}
