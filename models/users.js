module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  })
  return Users
}
