import { INTERNAL_PASSWORD_HASH } from '@app/config/constants';
import { NextFunction, Request, Response } from 'express';

type TimestampRequest = {
  timestamp: number;
  attempts: number;
};

const requestsMemo: Map<string, TimestampRequest> = new Map();

export function limitRequestsRate(request: Request, response: Response, next: NextFunction) {
  console.log(requestsMemo);
  createCurrentRequestMemoIfNotExists();

  if (reachedAtRequestsLimit()) {
    if (isOutOfTimeLimit()) return redirectToBlockedMessage();

    restartCurrentRequest();
    return next();
  }

  addAttemptsToCurrentRequest();
  next();

  function createCurrentRequestMemoIfNotExists() {
    if (requestsMemo.get(request.ip)) return;

    requestsMemo.set(request.ip, {
      attempts: 1,
      timestamp: Date.now(),
    });
  }

  function reachedAtRequestsLimit() {
    const currentIPRequests = requestsMemo.get(request.ip)!;
    return currentIPRequests.attempts > 5;
  }

  function isOutOfTimeLimit() {
    const currentIPRequests = requestsMemo.get(request.ip)!;
    const diffSinceLastRequest = Date.now() - currentIPRequests.timestamp;
    const diffInSeconds = Math.floor(diffSinceLastRequest / 1000);
    console.log('diffInSeconds', diffInSeconds);
    return diffInSeconds <= 2;
  }

  function addAttemptsToCurrentRequest() {
    const currentIPRequests = requestsMemo.get(request.ip)!;
    currentIPRequests.attempts++;
    requestsMemo.set(request.ip, currentIPRequests);
  }

  function restartCurrentRequest() {
    const currentIPRequests = requestsMemo.get(request.ip)!;
    currentIPRequests.timestamp = Date.now();
    currentIPRequests.attempts = 1;
    requestsMemo.set(request.ip, currentIPRequests);
  }

  function redirectToBlockedMessage() {
    response.redirect(`/blocked-message?token=${INTERNAL_PASSWORD_HASH}`);
  }
}
