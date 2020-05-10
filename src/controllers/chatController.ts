import { Middleware, Stage } from 'telegraf';
import { ContextRobot } from '@bot';
import { Render } from '@utils/templates';
import Supergroup from '@supergroup';
import Private from '@private';

export function useAuthorize(...allowed: string[]): Middleware<ContextRobot> {
  return async (ctx, next) => {
    let sender = await ctx.getChatMember(ctx.from?.id!);

    if (allowed.includes(sender.status)) {
      next();
    } else {
      interface Result {
        err_value?: string;
      }
      let values: Result = {
        err_value: 'Você não tem permissão suficiente para esta ação.'
      }
      if (ctx.updateType === 'message') {
        ctx.reply(Render<Result>(ctx.templates?.text?.error_specified!, values), {
          parse_mode: 'Markdown'
        });
      } else if (ctx.updateType === 'callback_query') {
        ctx.answerCbQuery(Render<Result>(ctx.templates?.answer?.error_specified!, values));
      }
    }
  }
}

export function usePrevent(...blocked: string[]): Middleware<ContextRobot> {
  return async (ctx, next) => {
    let sender = await ctx.getChatMember(ctx.from?.id!);

    if (!blocked.includes(sender.status)) {
      next();
    } else {
      interface Result {
        err_value?: string;
      }
      let values: Result = {
        err_value: 'Você não tem permissão suficiente para esta ação.'
      }
      if (ctx.updateType === 'message') {
        ctx.reply(Render<Result>(ctx.templates?.text?.error_specified!, values), {
          parse_mode: 'Markdown'
        });
      } else if (ctx.updateType === 'callback_query') {
        ctx.answerCbQuery(Render<Result>(ctx.templates?.answer?.error_specified!, values));
      }
    }
  }
}

export function useSec(): Middleware<ContextRobot> {
      
  return  async (ctx, next) => {
    let sender = await ctx.telegram.getChatMember(ctx.constants?.GROUP_ID!, ctx.from?.id!);

    if (sender.status != 'kicked' && !sender.until_date) {
      next();
    } else {
      ctx.scene.enter('banned');
    }
  }
}

export function useChat(): Middleware<ContextRobot> {
  return (ctx, next) => {
    if (ctx.chat?.type === "supergroup") {
      let supergroupChat = Supergroup.middleware();
      supergroupChat(ctx, next);
    } else if (ctx.chat?.type === "private") {
      let privateChat = Private.middleware();
      privateChat(ctx, next);
    } else {
      next();
    }
  }
}