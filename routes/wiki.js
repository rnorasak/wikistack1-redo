const express = require('express');
const router = express.Router();
const { main, addPage, editPage, wikiPage } = require('../views');
const { Page } = require('../models');
const layout = require('../views/layout');
const wikipage = require('../views/wikipage');

router.get('/', async (req, res, next) => {
  try {
    const allPages = await Page.findAll();
    res.send(main(allPages));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
  });
  console.log(page);
  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    if (page === null) {
      res.sendStatus(404);
    } else {
      res.send(wikiPage(page, page.author));
    }
  } catch (error) {
    next(error);
  }
});
// router.get('/:slug', async (req, res, next) => {
//   try {
//     const findSlug = await Page.findOne({
//       where: { slug: req.params.slug },
//     });
//     const author = await findSlug.getAuthor();

//     res.json(wikipage(findSlug, author));
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
