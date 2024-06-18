const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const userPhoneExists = await User.findOne({
      phone: req.body.phone,
    });
    const userEmailExists = await User.findOne({
      email: req.body.email,
    });

    const userNationalIdExists = await User.findOne({
      nationalId: req.body.nationalId,
    });

    if (userPhoneExists || userEmailExists || userNationalIdExists)
      return res.status(409).send({ message: 'User already exist' });

    const encryptedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      ...req.body,
      password: encryptedPassword,
    });

    const foundUser = newUser.toJSON();
    foundUser.role = 'USER';
    delete foundUser.password;

    return res.status(201).send({ message: 'User created!', data: foundUser });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

exports.registerAdmin = async (req, res) => {
  try {
    const userPhoneExists = await User.findOne({
      phone: req.body.phone,
    });
    const userEmailExists = await User.findOne({
      email: req.body.email,
    });

    const userNationalIdExists = await User.findOne({
      nationalId: req.body.nationalId,
    });

    if (userPhoneExists || userEmailExists || userNationalIdExists)
      return res.status(409).send({ message: 'User already exist' });

    const encryptedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      ...req.body,
      password: encryptedPassword,
    });

    const foundUser = newUser.toJSON();
    foundUser.isAdmin = true;
    delete foundUser.password;

    return res.status(201).send({ message: 'User created!', data: foundUser });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.body.phone });

    if (!user) {
      return res.status(400).send({ message: 'User account not found' });
    } else {
      const foundUser = user.toJSON();
      delete foundUser.password;
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword)
        return res.status(400).send({ message: 'Invalid credentials' });

      const token = jwt.sign(
        {
          user_id: user._id,
          phone: user.phone,
        },
        'mivote_secret',
        { expiresIn: '1d' }
      );
      foundUser.token = token;

      return res
        .status(200)
        .send({ message: 'User logged in!', data: foundUser });
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
