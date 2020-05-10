import { Middleware } from "telegraf";
import { ContextRobot } from "@bot";

export function startController(): Middleware<ContextRobot> {
	return (ctx, next) => {
		let args = ctx.getArgs!();
		if (args.length <= 1) {
			ctx.replyWithMarkdown(ctx.templates?.text?.start!);
		} else {
			ctx.reply(JSON.stringify(args));
		}
	}
}