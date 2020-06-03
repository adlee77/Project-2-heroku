module.exports = function (sequelize, DataTypes) {
  var Products = sequelize.define('Products', {
    // uuid: {
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4,
    //   primaryKey: true
    // },
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true
    },
    product_name: DataTypes.STRING,
    product_description: DataTypes.TEXT,
    product_category: DataTypes.STRING,
    essential: DataTypes.BOOLEAN,
    image_url: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock_quantity: DataTypes.INTEGER
    // createdAt: new Date(),
    // updatedAt: new Date()
  })
  return Products
}
