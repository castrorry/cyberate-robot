import { ComposeRobot, ContextRobot } from "@bot";
import { Composer } from "telegraf";
import { Render } from "@utils/templates";
import start from "@commands/start";
import { accept } from "./actions/groupTerms";

const Private: ComposeRobot = new Composer<ContextRobot>();

// Actions
Private.action('accept_terms', accept);

Private.start(start());
Private.command('myid', (ctx) => ctx.replyWithMarkdown('*ID:* `' + ctx.from?.id + '`'));

Private.entity!('bot_command', (ctx) => {
  ctx.replyWithMarkdown(Render(ctx.templates?.text?.error_specified!, {
    err_value: "Nenhuma sessão ativa no momento, invoque o comando /help para saber mais."
  }));
});

export default Private;