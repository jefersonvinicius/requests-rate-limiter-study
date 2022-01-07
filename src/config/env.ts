import dotenv from 'dotenv';

dotenv.config();

const env = {
  INTERNAL_PASSWORD: process.env.INTERNAL_PASSWORD ?? '',
};

export default env;
