import redis from "redis";

const redisOptions =
  process.env.APP_ENV === "production"
    ? {
        password: process.env.REDISPASSWORD,
        socket: {
          host: process.env.REDISHOST,
          port: process.env.REDISPORT,
        },
      }
    : {
        port: 6379,
        host: "localhost",
      };
const redisClient = redis.createClient(redisOptions);
await redisClient.connect().catch(console.error);

export default redisClient;
