const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack-redo', {
  logging: false,
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
});

Page.beforeValidate(page => {
  if (page.title) {
    page.slug = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    page.title = Math.floor(Math.random() * 100000).toString();
    page.slug = page.title;
  }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = { db, Page, User };
