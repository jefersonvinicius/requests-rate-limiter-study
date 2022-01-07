import { Hashing } from '@app/common/Hashing';
import env from './env';

export const INTERNAL_PASSWORD_HASH = Hashing.hash(env.INTERNAL_PASSWORD);
