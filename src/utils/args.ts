import { Middleware } from "telegraf";
import { ContextRobot } from "@bot";

export function useArgs(): Middleware<ContextRobot> {
	return (ctx, next) => {
		ctx.getArgs = () => ctx.message?.text!.split(' ');
		next();
	}
}