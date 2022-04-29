const router = require('express').Router();
const { Post } = require('../models');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();
    const posts = postData.map(post => { return post.get({ plain: true }) });

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one gallery
router.get('/dashboard', async (req, res) => {
  try {
    // const dbGalleryData = await Gallery.findByPk(req.params.id, {
    //   include: [
    //     {
    //       model: Painting,
    //       attributes: [
    //         'id',
    //         'title',
    //         'artist',
    //         'exhibition_date',
    //         'filename',
    //         'description',
    //       ],
    //     },
    //   ],
    // });

    // const gallery = dbGalleryData.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'gallery' template
    res.render('dashboard', { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// // GET one painting
// router.get('/painting/:id', async (req, res) => {
//   try {
//     const dbPaintingData = await Painting.findByPk(req.params.id);

//     const painting = dbPaintingData.get({ plain: true });
//     // Send over the 'loggedIn' session variable to the 'homepage' template
//     res.render('painting', { painting, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

module.exports = router;
