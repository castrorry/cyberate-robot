import { ComposeRobot, ContextRobot } from "@bot";
import { Composer } from "telegraf";

const Supergroup: ComposeRobot = new Composer<ContextRobot>();
Supergroup.command('setup', (ctx) => {
  ctx.reply('Is setup!');
});

export default Supergroup;