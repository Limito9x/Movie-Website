import { sequelize } from "../config";
import { DataTypes, Model, Optional } from "sequelize";
import { cloudinaryDelete } from "../utils/file";

// Định nghĩa kiểu dữ liệu cho thuộc tính của Actor
interface ActorAttributes {
  id: number;
  name: string;
  sex: boolean;
  dateOfBirth?: Date;
  avatarUrl?: string;
  avatarStoragePath?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Định nghĩa các thuộc tính tùy chọn khi tạo Actor
interface ActorCreationAttributes
  extends Optional<ActorAttributes, "id" | "createdAt" | "updatedAt"> {}

// Khai báo class Actor kế thừa từ Model
class Actor
  extends Model<ActorAttributes, ActorCreationAttributes>
  implements ActorAttributes
{
  public id!: number;
  public name!: string;
  public sex!: boolean;
  public dateOfBirth?: Date;
  public avatarUrl?: string;
  public avatarStoragePath?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Actor.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: {
      type: DataTypes.BOOLEAN,
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
  },
  {
    sequelize,
    tableName: "Actors",
    timestamps: true,
    hooks: {
      beforeDestroy: async (actorInstance, options) => {
        const avatarStoragePath =
          actorInstance.getDataValue("avatarStoragePath");
        if (avatarStoragePath) {
          await cloudinaryDelete(avatarStoragePath);
        }
      },
    },
  }
);

export default Actor;
