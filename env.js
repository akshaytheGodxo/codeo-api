module.exports = {
    PORT: process.env.PORT || 8080,
    DB_URL: process.env.DB_URL || "postgresql://postgres:akshay123@localhost:5432/testting",
    JWT_SECRET: process.env.JWT_SECRET || "k0C7lzzznJGGh7NJHSB8GgfhKhye/Ot5n7pNFe/m0E0=",
    REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
    NODE_ENV: process.env.NODE_ENV || 'development',

}