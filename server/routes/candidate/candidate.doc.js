const candidate = {
  _id: 'candidate id',
  votes: 3,
  nationalId: '1345677889900',
  profilePicture: '',
  poll: "candidate's poll id",
  gender: 'FEMALE',
  mission: 'candidate biography',
};

const getCandidatesByPoll = {
  tags: ['candidates'],
  description: 'List of all candidates in a certain poll',
  parameters: [
    {
      in: 'path',
      name: 'poll_id',
      required: true,
      schema: {
        type: 'string',
      },
    },
  ],
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
              data: {
                type: 'array',
                items: '#/components/schemas/Candidate',
              },
            },
            example: {
              message: 'Returned message',
              data: [candidate],
            },
          },
        },
      },
    },
  },
};

const createCandidate = {
  tags: ['candidates'],
  description: 'create a new candidate',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            poll: {
              type: 'string',
              description: 'the poll id this candidate is in',
              example: 'sample poll id',
            },
            mission: {
              type: 'string',
              description: 'the full biography of this candidate',
              example: 'sample biography of a candidate',
            },
            nationalId: {
              type: 'string',
              description: "the user's national id",
              example: '123456789',
              required: true,
            },
            gender: {
              type: 'string',
              description: "the user's gender",
              example: 'MALE',
              required: true,
            },
            profilePicture: {
              type: 'string',
              description: "the user's profile picture url",
              example: '',
              required: true,
            },
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Created poll',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
              data: '#/components/schemas/Candidate',
            },
            example: {
              message: 'Returned message',
              data: candidate,
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

const updateCandidate = {
  tags: ['candidates'],
  description: 'create a new candidate',
  parameters: [
    {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'string',
      },
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            poll: {
              type: 'string',
              description: 'the poll id this candidate is in',
              example: 'sample poll id',
            },
            mission: {
              type: 'string',
              description: 'the full biography of this candidate',
              example: 'sample biography of a candidate',
            },
            nationalId: {
              type: 'string',
              description: "the user's national id",
              example: '123456789',
              required: true,
            },
            gender: {
              type: 'string',
              description: "the user's gender",
              example: 'MALE',
              required: true,
            },
            profilePicture: {
              type: 'string',
              description: "the user's profile picture url",
              example: '',
              required: true,
            },
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Created poll',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
              data: '#/components/schemas/Candidate',
            },
            example: {
              message: 'Returned message',
              data: candidate,
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

const candidateRouteDoc = {
  '/api/v1/candidates': {
    post: createCandidate,
  },
  '/api/v1/candidates/{poll_id}': {
    get: getCandidatesByPoll,
    put: updateCandidate,
  },
};

module.exports = candidateRouteDoc;
