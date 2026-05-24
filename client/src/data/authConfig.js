// Centralised config for the auth API.
// The CRA proxy (package.json "proxy") forwards /api/* to Express on port 5000.

const authConfig = {
  loginEndpoint: 'https://netflix-clone-l8wv.onrender.com/api/auth/login',

  // Demo credentials shown on the login page hint bar
  demoCredentials: [
    { email: 'user@netflix.com',  password: 'netflix123' },
    { email: 'admin@netflix.com', password: 'admin456'   },
  ],
};

export default authConfig;
