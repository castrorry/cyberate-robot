import { ComposeRobot, ContextRobot } from "@bot";
import { Composer } from "telegraf";
import { Render } from "@utils/templates";
import start from "@commands/start";

const Private: ComposeRobot = new Composer<ContextRobot>();
Private.start(start());
Private.entity!('bot_command', (ctx) => {
  ctx.replyWithMarkdown(Render(ctx.templates?.text?.error_specified!, {
    err_value: "Nenhuma sessão ativa no momento, invoque o comando /help para saber mais."
  }));
});

export default Private;