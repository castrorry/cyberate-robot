import { Middleware } from "telegraf";
import { InlineKeyboardButton, Markup } from "telegraf/typings/markup";
import { ContextRobot } from "@bot";
import { RenderList } from "@utils/templates";

function start(): Middleware<ContextRobot> {


	return (ctx, next) => {
		let args = ctx.getArgs!();
		if (args.length <= 1) {
			ctx.scene.enter('start');
		} else {
			if (args[1] === 'group_terms') {
				let response = `${ctx.templates?.text?.terms!}\n${RenderList(
					ctx.templates?.list?.rules!
				)}`;
				let button: InlineKeyboardButton[] = [
					{ text: 'Li e concordo', hide: false, callback_data: 'accept_terms' }
				];
				ctx.replyWithMarkdown(response, {
					reply_markup: Markup.inlineKeyboard(button)
				})
			}
		}
	}
}

export default start;