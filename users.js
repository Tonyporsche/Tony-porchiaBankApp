var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const { registerUser, loginUser, profileInfo, updateUser } = require('../controllers/userControllers');
const { auth } = require('../middlewares/auth');

const passwordOptions = {
  minLength: 6,
  minLowercase: 1,
  minUppercase: 0,
  minNumbers: 0,
  minSymbols: 0,
  returnScore: false,
  pointsPerUnique: 1,
  pointsPerRepeat: 0.5,
  pointsForContainingLower: 10,
  pointsForContainingUpper: 10,
  pointsForContainingNumber: 10,
  pointsForContainingSymbol: 10
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.status(200).json({ user: "lesley" })
});

router.post('/register',
  body("userName").notEmpty().isLength({ min: 3 }).toLowerCase(),
  body('email').isEmail(),
  body('password').isStrongPassword(passwordOptions),
  body('re_password').isStrongPassword(passwordOptions),
  async (req, res, next) => {
    const { userName, email, password, re_password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (password !== re_password) {
      return res.status(400).json({ errors: ['password did not match'] });
    }

    try {
      const user = await registerUser(userName, email, password || re_password);
      if (user) {
        return res.status(200).json({ user, success: true });
      }
    } catch (e) {
      res.status(400).json({ errors: [e.message] });
    }

  })

router.post('/login',
  body('email').isEmail(),
  body('password').isStrongPassword(passwordOptions),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const out = await loginUser(email, password);
      if (out) {
        return res.status(200).json({ ...out })
      }
    } catch (e) {
      res.status(400).json({ errors: [e.message] });
    }
  });

router.get('/profile', auth, async (req, res, next) => {
  const id = req.user.id;
  try {
    const user = await profileInfo(id);
    if (user) {
      return res.status(200).json({ user });
    }
  } catch (e) {
    res.status(400).json({ errors: [e.message] });
  }
})

router.post('/update_profile', auth,
  body("userName").notEmpty().isLength({ min: 3 }).toLowerCase(),
  body('email').isEmail(),
  async (req, res, next) => {
    const { userName, email, password, re_password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user;
    if (password || re_password) {
      if (password !== re_password) {
        return res.status(400).json({ errors: ['password did not match'] });
      } else {
        try {
          user = await updateUser(req.user.id, userName, email, password);
        } catch (e) {
          return res.status(400).json({ errors: [e.message] });
        }
      }
    }
    try {
      user = await updateUser(req.user.id, userName, email);
    } catch (e) {
      return res.status(400).json({ errors: [e.message] });
    }
    return res.status(200).json({ user });

  })
module.exports = router;
