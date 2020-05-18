import { ComposeRobot, ContextRobot } from "@bot";
import { Composer } from "telegraf";
import newChatMember from "./events/newChatMember";
import { accept } from "./actions/groupTerms";

const Supergroup: ComposeRobot = new Composer<ContextRobot>();

// Actions
Supergroup.action('callback_view_terms', (ctx) => ctx.answerCbQuery(undefined, undefined, {
  url: `t.me/${ctx.me}?start=view_terms`
}));
Supergroup.action('accept_terms', accept);

// Commands
Supergroup.command('setup', (ctx) => {
  ctx.reply('Is setup!');
});

// Events
Supergroup.on('new_chat_members', newChatMember);

export default Supergroup;