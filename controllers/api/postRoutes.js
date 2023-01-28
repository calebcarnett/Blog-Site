const router = require('express').Router();
const { Post, Comment } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ['comment', "post_id", "user_id"]
        }
      ]
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    const postData = await Post.create({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      name: req.body.name,
      title: req.body.title,
      content: req.body.content,
      username: req.body.username,
      date_created: req.body.date_created,
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:post_id', async (req, res) => {
  const postData = await Post.update(
    {
      name: req.body.name,
      title: req.body.title,
      content: req.body.content,
      date_created: req.body.date_created,
    },
    {
      where: {
        post_id: req.params.post_id,
      },
    }
  );

  return res.json(postData);
});

router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!postData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
