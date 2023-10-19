/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Examples',
      [
        {
          image: 'https://i.pinimg.com/564x/db/a7/ff/dba7ff167ae72276f0eb77c72a723286.jpg',
          masterId: 1,
        },
        {
          image:
            'https://i.pinimg.com/474x/8e/64/a4/8e64a4237705b1cb8e0ebf5de56f1173.jpg',
          masterId: 1,
        },
        {
          image:
            'https://i.pinimg.com/474x/c9/97/6c/c9976c4418daf6ef9714260f82ccd3cb.jpg',
          masterId: 1,
        },
        {
          image: 'https://i.pinimg.com/474x/f6/2e/7e/f62e7e6d760e4f0570d6f12051965d65.jpg',
          masterId: 1,
        },
        {
          image: 'https://i.pinimg.com/474x/3b/61/ec/3b61ec5dc90487f05203464e509ebc43.jpg',
          masterId: 2,
        },
        {
          image: 'https://i.pinimg.com/564x/cb/f9/da/cbf9da1fee7d550822471b7ad07d9cb0.jpg',
          masterId: 2,
        },
        {
          image: 'https://i.pinimg.com/736x/cb/f9/da/cbf9da1fee7d550822471b7ad07d9cb0.jpg',
          masterId: 2,
        },
        {
          image: 'https://i.pinimg.com/564x/80/1b/15/801b15e6770b554e8f48d957fb18f066.jpg',
          masterId: 2,
        },
        {
          image: 'https://i.pinimg.com/474x/91/d6/03/91d6037c183ccc9644cdd59a70857524.jpg',
          masterId: 3,
        },
        {
          image: 'https://i.pinimg.com/474x/46/b9/8a/46b98a63e649dc7de21d422c089643ef.jpg',
          masterId: 3,
        },
        {
          image: 'https://i.pinimg.com/474x/3c/8c/66/3c8c669d4b1f5ea3f8984f1193996012.jpg',
          masterId: 3,
        },
        {
          image: 'https://i.pinimg.com/474x/04/59/d7/0459d7f7d88b19c788e81f82c3f6a7e6.jpg',
          masterId: 4,
        },
        {
          image: 'https://i.pinimg.com/564x/ba/28/af/ba28af1df3750c817faa535e75b2be87.jpg',
          masterId: 4,
        },
        {
          image: 'https://i.pinimg.com/474x/1a/41/c3/1a41c3e6b9f33878d78f95b48d97a694.jpg',
          masterId: 4,
        },
        {
          image: 'https://i.pinimg.com/474x/c6/e3/3b/c6e33b468bfea236300097eeed4cfc5a.jpg',
          masterId: 4,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
