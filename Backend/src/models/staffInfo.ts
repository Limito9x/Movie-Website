import { sequelize } from "../config";
import { DataTypes, Model, Optional } from "sequelize";

// Định nghĩa kiểu dữ liệu cho thuộc tính của StaffInfo
interface StaffInfoAttributes {
  id: number;
  staffID: string;
  phone: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Định nghĩa các thuộc tính tùy chọn khi tạo StaffInfo
interface StaffInfoCreationAttributes
  extends Optional<StaffInfoAttributes, "id" | "createdAt" | "updatedAt"> {}

// Khai báo class StaffInfo kế thừa từ Model
class StaffInfo
  extends Model<StaffInfoAttributes, StaffInfoCreationAttributes>
  implements StaffInfoAttributes
{
  public id!: number;
  public staffID!: string;
  public phone!: string;
  public address!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

StaffInfo.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
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
        hooks: {
            // Generate staffID based on latest staff created
            async beforeCreate(staffInfo: StaffInfo) {
                const latestStaff = await StaffInfo.findOne({
                    order: [["id", "DESC"]],
                });
                const nextId = latestStaff ? latestStaff.id + 1 : 1;
                staffInfo.staffID = `S${nextId.toString().padStart(5, "0")}`;
            },
        },
    }
);

export default StaffInfo;
