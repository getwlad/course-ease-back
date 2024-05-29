require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  define: {
    timestamp: true, // cria duas colunas: createdAt e updateAt
    underscored: true, // nomeclatura nao camelcase
    underscoredAll: true,
    freezeTableName: true,
  },
};
