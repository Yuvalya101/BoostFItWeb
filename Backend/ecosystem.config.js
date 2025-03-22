module.exports = {
  apps: [
    {
      name: "Rest BoostFitWeb",
      script: "./dist/index.js",
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
