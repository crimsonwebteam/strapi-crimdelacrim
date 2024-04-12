const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres'); // Set the default database client to PostgreSQL

  const connections = {
    postgres: {
      connection: {
        // connectionString: env('DATABASE_URL'), // Optional: PostgreSQL connection string
        host: env('DATABASE_HOST'), // Database host from environment variable
        port: env.int('DATABASE_PORT', 5432), // Database port from environment variable
        database: env('DATABASE_NAME'), // Database name from environment variable
        user: env('DATABASE_USERNAME'), // Database username from environment variable
        password: env('DATABASE_PASSWORD'), // Database password from environment variable
        ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
        schema: env('DATABASE_SCHEMA', 'public'), // Optional: PostgreSQL schema
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) }, // Connection pool settings
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000), // Connection timeout settings
    },
  };
};