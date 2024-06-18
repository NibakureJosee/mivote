const userSchema = {
  User: {
    type: 'object',
    properties: {
      _id: { type: 'string' },
      names: { type: 'string' },
      phone: { type: 'string' },
      email: { type: 'string' },
      nationalId: { type: 'string' },
      role: { type: 'string' },
    },
  },
};

module.exports = userSchema;
