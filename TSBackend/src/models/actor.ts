import { sequelize } from "../config";
import { DataTypes } from "sequelize";
import { cloudinaryDelete } from "../utils/file";

const Actor = sequelize.define("Actor", {
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
  hooks: {
    beforeDestroy: async (actor: any, options) => {
      const avatarStoragePath = actor.getDataValue ? actor.getDataValue('avatarStoragePath') : actor.avatarStoragePath;
      if (avatarStoragePath) {
        await cloudinaryDelete(avatarStoragePath);
      }
    },
  },
});

export default Actor;