import { Composer, Middleware } from "telegraf";
import { ContextRobot } from "@bot";
import { Render } from "@utils/templates";

declare class ComposerRobot<TContext extends ContextRobot> extends Composer<TContext> {
  /**
   * Registers middleware for handling specified entities.
   */
  entity(
    entity: string | string[],
    ...middlewares: ReadonlyArray<Middleware<ContextRobot>>
  ): this
}

const chat = new ComposerRobot<ContextRobot>();
chat.start((ctx) => ctx.scene.enter('start'));
chat.entity('bot_command', (ctx) => {
  ctx.replyWithMarkdown(Render(ctx.templates?.text?.error_specified!, {
    err_value: "Nenhuma sessão ativa no momento, invoque o comando /help para saber mais."
  }));
});

export default chat;