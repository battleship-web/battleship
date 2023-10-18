import redis from "redis";

const redisOptions = {
  username: "default",
  password: process.env.REDISPASSWORD,
  socket: {
    host: process.env.REDISHOST,
    port: process.env.REDISPORT,
  },
};

const redisClient = redis.createClient(redisOptions);
await redisClient.connect().catch(console.error);

export default redisClient;
