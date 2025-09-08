import { sequelize } from "../config";
import { DataTypes, Model, Optional } from "sequelize";
import { cloudinaryDelete } from "../utils/file";
import bcrypt from "bcrypt";

// Định nghĩa kiểu dữ liệu cho thuộc tính của User
interface UserAttributes {
  id: number;
  fullName: string;
  sex: boolean;
  dateOfBirth?: Date;
  role: "user" | "staff" | "admin";
  avatarUrl?: string;
  avatarStoragePath?: string;
  email: string;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Định nghĩa các thuộc tính tùy chọn khi tạo User
interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

// Khai báo class User kế thừa từ Model
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public fullName!: string;
  public sex!: boolean;
  public dateOfBirth?: Date;
  public role!: "user" | "staff" | "admin";
  public avatarUrl?: string;
  public avatarStoragePath?: string;
  public email!: string;
  public username!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "staff", "admin"),
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
    },
    avatarUrl: {
      type: DataTypes.STRING,
    },
    avatarStoragePath: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Users",
    timestamps: true,
    hooks: {
      beforeDestroy: async (userInstance, options) => {
        const avatarStoragePath =
          userInstance.getDataValue("avatarStoragePath");
        if (avatarStoragePath) {
          await cloudinaryDelete(avatarStoragePath);
        }
      },
      beforeCreate: async (userInstance, options) => {
        if (userInstance.password) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(userInstance.password, salt);
          userInstance.password = hashedPassword;
        }
      },
    },
  }
);

export default User;
