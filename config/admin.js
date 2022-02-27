module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'd5f6d4eceeba2b0fa09574590d469772'),
  },
});
