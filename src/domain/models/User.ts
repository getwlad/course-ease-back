import {
  Table,
  Column,
  Model,
  DataType,
  BeforeSave,
} from "sequelize-typescript";
import bcrypt from "bcrypt";

@Table({
  tableName: "User",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export default class User extends Model {
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

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt!: Date;

  @BeforeSave
  static async hashPassword(user: User) {
    if (user.changed("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
  }
}
