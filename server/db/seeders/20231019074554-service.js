/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Services',
      [
        {
          name: 'Массаж лица',
          price: '1200',
          time: 30,
          categoryId: 1,
        },
        {
          name: 'Чистка лица',
          price: '1500',
          time: 60,
          categoryId: 1,
        },
        {
          name: 'Пилинг',
          price: '2000',
          time: 90,
          categoryId: 1,
        },
        {
          name: 'Микродермабразия',
          price: '2500',
          time: 90,
          categoryId: 1,
        },
        {
          name: 'Лазерная эпиляция',
          price: '3000',
          time: 120,
          categoryId: 1,
        },
        {
          name: 'Мезотерапия',
          price: '3500',
          time: 90,
          categoryId: 1,
        },
        {
          name: 'Ботокс',
          price: '4000',
          time: 60,
          categoryId: 1,
        },
        {
          name: 'Филлеры',
          price: '4500',
          time: 90,
          categoryId: 1,
        },
        {
          name: 'Омоложение кожи',
          price: '5000',
          time: 120,
          categoryId: 1,
        },
        {
          name: 'Плацентарная маска',
          price: '5500',
          time: 60,
          categoryId: 1,
        },
        {
          name: 'Маникюр классический',
          price: '1000',
          time: 60,
          categoryId: 2,
        },
        {
          name: 'Маникюр с покрытием гель-лак',
          price: '1500',
          time: 90,
          categoryId: 2,
        },
        {
          name: 'Педикюр классический',
          price: '1200',
          time: 90,
          categoryId: 2,
        },
        {
          name: 'Педикюр с покрытием гель-лак',
          price: '1700',
          time: 90,
          categoryId: 2,
        },
        {
          name: 'Маникюр с дизайном',
          price: '2000',
          time: 120,
          categoryId: 2,
        },
        {
          name: 'Педикюр с дизайном',
          price: '2200',
          time: 120,
          categoryId: 2,
        },
        {
          name: 'Маникюр и педикюр комплекс',
          price: '2500',
          time: 150,
          categoryId: 2,
        },
        {
          name: 'Маникюр и педикюр VIP',
          price: '3000',
          time: 180,
          categoryId: 2,
        },
        {
          name: 'Гигиенический педикюр',
          price: '900',
          time: 60,
          categoryId: 2,
        },
        {
          name: 'Медицинский педикюр',
          price: '1400',
          time: 90,
          categoryId: 2,
        },
        {
          name: 'Стрижка',
          price: '800',
          time: 30,
          categoryId: 3,
        },
        {
          name: 'Стрижка мужская',
          price: '800',
          time: 30,
          categoryId: 3,
        },
        {
          name: 'Стрижка женская',
          price: '1200',
          time: 60,
          categoryId: 3,
        },
        {
          name: 'Окрашивание волос',
          price: '1500',
          time: 90,
          categoryId: 3,
        },
        {
          name: 'Укладка волос',
          price: '1000',
          time: 60,
          categoryId: 3,
        },
        {
          name: 'Полировка волос',
          price: '700',
          time: 30,
          categoryId: 3,
        },
        {
          name: 'Свадебная укладка',
          price: '4000',
          time: 90,
          categoryId: 3,
        },
        {
          name: 'Кератиновое выпрямление волос',
          price: '3000',
          time: 180,
          categoryId: 3,
        },
        {
          name: 'Уход за волосами',
          price: '900',
          time: 60,
          categoryId: 3,
        },
        {
          name: 'Мужская стрижка и бритье',
          price: '1200',
          time: 60,
          categoryId: 3,
        },
        {
          name: 'Моделирование бороды',
          price: '800',
          time: 30,
          categoryId: 3,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Services', {});
  },
};
