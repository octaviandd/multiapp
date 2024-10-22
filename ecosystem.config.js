/** @format */

module.exports = {
  apps: [
    {
      name: "server",
      script: "dist/index.js",
      autorestart: true,
      watch: false,
      env_production: {
        NODE_ENV: "production",
        PORT: 8000,
        DATABASE_URL: process.env.DATABASE_URL,
      },
    },
  ],
};
