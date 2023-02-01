const router = require("express").Router();
const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  const postId = req.params.id;

  // Retrieve the post data from the database based on the post ID
  const post = await Post.findByPk(postId);

  // Render the Handlebars template, passing the post data as context
  res.render("post", {
    title: post.title,
    content: post.content,
    id: post.id,
  });
});

router.get("/dashboard", async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  // If the user is already logged in, redirect the request to another route
  res.render("signup");
});

router.get("/createPost", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (!req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("createPost");
});

router.get("/editpost/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      where: {
        user_id: req.session.id,
      },
    });

    const post = postData.get({ plain: true });

    res.render("editPost", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/singlepost/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      where: {
        user_id: req.session.id,
      },
    });

    const post = postData.get({ plain: true });

    res.render("singlepost", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
// Use withAuth middleware to prevent access to route
router.get("/homepage", async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render("homepage", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/comment", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Serialize data so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
  res.render("post");
});

module.exports = router;
