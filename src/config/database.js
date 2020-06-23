module.exports = {
   dialect: 'mysql',
   host: 'ioffertas.club',
   username: 'cesar',
   password: '387060cesaR$',
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