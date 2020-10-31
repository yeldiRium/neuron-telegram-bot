import makeAuthenticator from "@yeldirium/telegraf-authentication-middleware";

const getAuthenticationMiddleware = function ({ adminPassword }) {
  const {
    middleware: authenticationMiddleware,
    guardMiddleware,
  } = makeAuthenticator({
    authenticator: ({ token }) => {
      if (token === adminPassword) {
        return {};
      }

      return undefined;
    },
  });

  return {
    authenticationMiddleware,
    guardMiddleware,
  };
};

export { getAuthenticationMiddleware };
