db.createUser({
  user: 'sqr_root',
  pwd: 'sqrpwd123',
  roles: [
    {
      role: 'readWrite',
      db: 'sqr_db',
    },
  ],
});
