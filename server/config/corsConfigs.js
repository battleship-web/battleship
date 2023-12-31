import allowedOrigins from "./allowedOrigins.js";

const corsConfigs = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // remove ||!origin to block postman request
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by Cors"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsConfigs;
