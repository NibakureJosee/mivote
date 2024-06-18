const poll = {
  _id: 'sample poll id',
  title: 'Presidential Elections',
  author: "author's user id",
  candidates: ['sample candidate id'],
  description: 'elections are open to all eligible to vote',
  status: 'ONGOING',
};

const candidate = {
  _id: 'candidate id',
  votes: 3,
  nationalId: '1345677889900',
  profilePicture: '',
  poll: "candidate's poll id",
  gender: 'FEMALE',
  mission: 'candidate biography',
};

const getPollsByStatus = {
  tags: ['polls'],
  description: 'List of all of the polls according to the provided status',
  parameters: [
    {
      in: 'path',
      name: 'status',
      required: true,
      schema: {
        type: 'string',
        enum: ['PENDING', 'ONGOING', 'CLOSED', 'CANCELLED'],
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
                items: {
                  $ref: '#/components/schemas/Poll',
                },
              },
            },
            example: {
              message: 'Returned message',
              data: [poll],
            },
          },
        },
      },
    },
  },
};

const getAllPolls = {
  tags: ['polls'],
  description: 'List of all of the polls',
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
                items: '#/components/schemas/Poll',
              },
            },
            example: {
              message: 'Returned message',
              data: [poll],
            },
          },
        },
      },
    },
  },
};

const createPoll = {
  tags: ['polls'],
  description: 'create a poll',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: "The poll's title",
              example: 'Presidential Elections',
            },
            author: {
              type: 'string',
              description: 'The id of the author of the poll',
              example: "sample author's user id",
            },
            description: {
              type: 'string',
              description: "The poll's brief description",
              example:
                'A poll for presidents. All citizens are allowed to participate',
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
              data: {
                type: 'object',
                properties: {
                  _id: { type: 'string' },
                  title: { type: 'string' },
                  author: { type: 'string' },
                  candidates: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                  description: {
                    type: 'string',
                  },
                  status: {
                    type: 'string',
                    enum: ['PENDING', 'ONGOING', 'CLOSED', 'CANCELLED'],
                  },
                },
              },
            },
            example: {
              message: 'Returned message',
              data: poll,
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

const voteCandidateInPoll = {
  tags: ['polls'],
  description: 'vote a candidate in a poll',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            user_id: {
              type: 'string',
              description: 'The voting user id',
              example: 'user id',
            },
            poll_id: {
              type: 'string',
              description: 'The id of the poll',
              example: 'poll id',
            },
            candidate_id: {
              type: 'string',
              description: 'the id of the candidate',
              example: 'candidate id',
            },
            status: {
              type: 'string',
              enum: ['PENDING', 'ONGOING', 'CLOSED', 'CANCELLED'],
              example: 'PENDING',
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
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

const pollRouteDoc = {
  '/api/v1/polls': {
    get: getAllPolls,
    post: createPoll,
  },
  '/api/v1/polls/{status}': {
    get: getPollsByStatus,
  },
  '/api/v1/polls/candidate/vote': {
    post: voteCandidateInPoll,
  },
};

module.exports = pollRouteDoc;
