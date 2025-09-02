import { sequelize } from "../config";
import { Optional, Model, DataTypes } from "sequelize";

interface TagAttributes {
    id: number;
    name: string;
    description?: string;
}

interface TagCreationAttributes extends Optional<TagAttributes, "id"> {}

class Tag extends Model<TagAttributes, TagCreationAttributes> implements TagAttributes {
    public id!: number;
    public name!: string;
    public description?: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Tag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "tags",
    }
);

export default Tag;