import { sequelize } from "../config";
import { DataTypes, Model, Optional } from "sequelize";

// Định nghĩa kiểu dữ liệu cho thuộc tính của StaffInfo
interface StaffInfoAttributes {
  userId: number;
  staffID: string;
  phone: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Định nghĩa các thuộc tính tùy chọn khi tạo StaffInfo
interface StaffInfoCreationAttributes
  extends Optional<StaffInfoAttributes, "userId" | "createdAt" | "updatedAt"> {}

// Khai báo class StaffInfo kế thừa từ Model
class StaffInfo
  extends Model<StaffInfoAttributes, StaffInfoCreationAttributes>
  implements StaffInfoAttributes
{
  public userId!: number;
  public staffID!: string;
  public phone!: string;
  public address!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

StaffInfo.init(
    {
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            unique: true,
            allowNull: false,
            primaryKey: true,
        },
        staffID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "StaffInfo",
        timestamps: true,
    }
);

export default StaffInfo;
