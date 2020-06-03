'use strict'
// import { uuid } from 'uuid';
// var uuidv4 = require('uuid/v4')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      // uuid: {
      //   type: Sequelize.UUID,
      //   defaultValue: Sequelize.UUIDV4,
      //   primaryKey: true
      // },
      // uuid: uuidv4(),
      product_name: 'test_product_name',
      product_description: 'test_product_description',
      product_category: 'test_product_cat',
      essential: false,
      image_url: 'test_string_image',
      price: 1099,
      stock_quantity: 45,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
}
