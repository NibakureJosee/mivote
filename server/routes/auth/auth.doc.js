const user = {
  _id: 'string',
  names: 'string',
  phone: 'string',
  email: 'string',
  address: 'string',
  nationalId: 'string',
  role: 'string',
};

const loggedInUser = {
  ...user,
  token: 'sample token',
};

const registerUser = {
  tags: ['auth'],
  description: 'register a new user',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            names: {
              type: 'string',
              description: "The user's names",
              example: 'John Doe',
              required: true,
            },
            phone: {
              type: 'string',
              description: "the user's phone",
              example: '0788102030',
              required: true,
            },
            email: {
              type: 'string',
              description: "the user's email",
              example: 'example@gmail.com',
              required: true,
            },
            address: {
              type: 'string',
              description: "the user's national id",
              example: 'Huye',
              required: true,
            },
            nationalId: {
              type: 'string',
              description: "the user's national id",
              example: '123456789',
              required: true,
            },
            password: {
              type: 'string',
              description: "the user's password",
              example: '123!!user',
              required: true,
            },
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Created user',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
              data: '#/components/schemas/User',
            },
            example: {
              message: 'Returned message',
              data: user,
            },
          },
        },
      },
    },
    400: {
      description: 'Bad request',
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
        },
      },
    },
  },
};

const registerUserAdmin = {
  tags: ['auth'],
  description: 'register a new user',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            names: {
              type: 'string',
              description: "The user's names",
              example: 'John Doe',
              required: true,
            },
            phone: {
              type: 'string',
              description: "the user's phone",
              example: '0788102030',
              required: true,
            },
            email: {
              type: 'string',
              description: "the user's email",
              example: 'example@gmail.com',
              required: true,
            },
            nationalId: {
              type: 'string',
              description: "the user's national id",
              example: '123456789',
              required: true,
            },
            address: {
              type: 'string',
              description: "the user's national id",
              example: 'Huye',
              required: true,
            },
            password: {
              type: 'string',
              description: "the user's password",
              example: '123!!user',
              required: true,
            },
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Created user',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
              data: '#/components/schemas/User',
            },
            example: {
              message: 'Returned message',
              data: user,
            },
          },
        },
      },
    },
    400: {
      description: 'Bad request',
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
        },
      },
    },
  },
};

const loginUser = {
  tags: ['auth'],
  description: 'login user',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            phone: {
              type: 'string',
              description: "the user's phone",
              example: '0788102030',
              required: true,
            },
            password: {
              type: 'string',
              description: "the user's password",
              example: '123!!user',
              required: true,
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Created user',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                },
                data: '#/components/schemas/User',
              },
              example: {
                message: 'Returned message',
                data: loggedInUser,
              },
            },
          },
        },
      },
      400: {
        description: 'Bad request',
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Logged in successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
              data: {
                type: 'object',
                properties: {
                  _id: { type: 'string' },
                  names: { type: 'string' },
                  phone: { type: 'string' },
                  email: { type: 'string' },
                  nationalId: { type: 'string' },
                  role: { type: 'string' },
                  token: { type: 'string' },
                },
              },
            },
            example: {
              message: 'Returned message',
              data: loggedInUser,
            },
          },
        },
      },
    },
    400: {
      description: 'Bad request',
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
        },
      },
    },
  },
};

const authRouteDoc = {
  '/api/v1/auth/register': {
    post: registerUser,
  },
  '/api/v1/auth/register-admin': {
    post: registerUserAdmin,
  },
  '/api/v1/auth/login': {
    post: loginUser,
  },
};

module.exports = authRouteDoc;
