const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'mysecret'; // Replace this with your actual secret key
const expiration = '2h'; // Set the expiration time for the token

module.exports = {
  // Custom GraphQLError for authentication issues
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),

  // Middleware function for authentication
  authMiddleware: function ({ req }) {
    // Allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // Split the token from Bearer <token>
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // Verify the token and add user data to the request
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    // Return the request object
    return req;
  },

  // Function to sign a JWT token
  signToken: function ({ email, username, userId }) {
    const payload = { email, username, userId };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
