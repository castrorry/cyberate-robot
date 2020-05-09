import { Composer, Middleware, Context } from "telegraf";
import { ContextRobot } from "@bot";
import { Render } from "@utils/templates";

interface ComposeRobot extends Composer<ContextRobot> {
  /**
   * Registers middleware for handling specified entities.
   */
  entity?(
    entity: string | string[],
    ...middlewares: ReadonlyArray<Middleware<ContextRobot>>
  ): this
}

export const usePrivate: ComposeRobot = new Composer<ContextRobot>();
usePrivate.start((ctx) => ctx.scene.enter('start'));
usePrivate.entity!('bot_command', (ctx) => {
  ctx.replyWithMarkdown(Render(ctx.templates?.text?.error_specified!, {
    err_value: "Nenhuma sessão ativa no momento, invoque o comando /help para saber mais."
  }));
});

export const useSupergroup: ComposeRobot = new Composer<ContextRobot>();
useSupergroup.command('setup', (ctx) => {
  ctx.reply('Is setup!');
});