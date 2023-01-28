const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/comment', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
          comment: req.body.comment,
          date_created: req.body.date_created,
          post_id: req.body.post_id,
          user_id: req.body.user_id,
        });
        res.status(200).json(commentData);
      } catch (err) {
        res.status(500).json(err);
      }
    });

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!commentData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
