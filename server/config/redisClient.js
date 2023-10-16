import redis from "redis";

const redisOptions =
  process.env.APP_ENV === "production"
    ? {
        url: process.env.REDIS_URL,
      }
    : {
        port: 6370,
        host: "localhost",
      };
const redisClient = redis.createClient(redisOptions);
redisClient.connect().catch(console.error);

export default redisClient;
