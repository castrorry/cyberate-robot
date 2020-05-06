import { Middleware } from 'telegraf';
import { ContextRobot } from '@bot';

export interface Constants {
  GROUP_ID: number;
  CHANNEL_ID: number;
}

export function useConstants (): Middleware<ContextRobot> {
  return (ctx: ContextRobot, next: () => any) => {
    ctx.constants = {
      GROUP_ID: Number(process.env.GROUP_ID) || -1001244967281,
      CHANNEL_ID: Number(process.env.CHANNEL_ID) || -1001376466484
    }
    next();
  }
}