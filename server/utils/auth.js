const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'mysecret'; // Replace this with your actual secret key
const expiration = '2h'; // Set the expiration time for the token

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  // Middleware function for authentication
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    if (!token) {
      return req;
    }
    try {
      const { data } = jwt.verify(token, secret, { expiresIn: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }
    return req
  },

  // Function to sign a JWT token
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
