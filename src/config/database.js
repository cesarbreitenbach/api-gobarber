module.exports = {
   dialect: 'mysql',
   host: 'locahost',
   username: 'root',
   password: '123456',
   database: 'orm',
   define: {
     timestamps: true,
     underscored: true,
     underscoredAll: true,
   },
   pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
}