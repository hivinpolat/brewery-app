
export default () => ({
  database: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:12345@localhost:5432/brewerye',
  },
});
