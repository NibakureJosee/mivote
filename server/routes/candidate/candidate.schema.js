const candidateSchema = {
  Candidate: {
    type: 'object',
    properties: {
      _id: { type: 'string' },
      poll: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          author: { type: 'string' },
          candidates: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          location: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          status: {
            type: 'string',
            enum: ['PENDING', 'ONGOING', 'CLOSED', 'CANCELLED'],
          },
          created_on: {
            type: 'string',
          },
        },
      },
      votes: { type: 'number' },
      nationalId: { type: 'string' },
      profilePicture: { type: 'string' },
      gender: { type: 'string' },
      mission: { type: 'string' },
    },
  },
};

module.exports = candidateSchema;
