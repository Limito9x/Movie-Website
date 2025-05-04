const { sequelize } = require("../config");
const { DataTypes } = require("sequelize");
const { deleteFile } = require("../utils/file");

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
    beforeDestroy: async (actor, options) => {
      // Xóa ảnh trên firebase storage
      if (actor.avatarStoragePath) {
        await deleteFile(actor.avatarStoragePath);
      }
    },
  },
});

module.exports = Actor;