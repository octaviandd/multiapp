/** @format */

module.exports = {
  apps: [
    {
      name: "my-node-backend",
      script: "dist/index.js",
      autorestart: true,
      watch: false,
      env_production: {
        NODE_ENV: "production",
        PORT: 8000,
        DATABASE_URL: process.env.DATABASE_URL,
        AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
        AWS_S3_REGION: process.env.AWS_S3_REGION,
        AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
        AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
      },
    },
  ],
};
