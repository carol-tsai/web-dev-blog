const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
   console.log(req.body);
   try {
      const newPost = await Post.create({
         ...req.body,
      });

      res.status(200).json(newPost);
   } catch (err) {
      res.status(400).json(err);
   }
});

module.exports = router;