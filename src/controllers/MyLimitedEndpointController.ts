import { Request, Response } from 'express';

export class MyLimitedEndpointController {
  handle(request: Request, response: Response) {
    return response.send('You is free to access this page! :)');
  }
}
