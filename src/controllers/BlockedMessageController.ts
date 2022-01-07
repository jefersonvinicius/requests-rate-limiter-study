import { Hashing } from '@app/common/Hashing';
import { INTERNAL_PASSWORD_HASH } from '@app/config/constants';
import env from '@app/config/env';
import { Request, Response } from 'express';

export class BlockedMessageController {
  handle(request: Request, response: Response) {
    const tokenHash = String(request.query.token ?? '');

    if (!Hashing.match(env.INTERNAL_PASSWORD, tokenHash)) {
      return response.redirect('/');
    }

    const ip = request.ip;
    return response.send(`Your ip (${ip}) had blocked because you reach the limit! :(`);
  }
}
