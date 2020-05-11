import { ContextRobot } from "@bot";
import { Render } from "@utils/templates";

async function newChatMember(ctx: ContextRobot, next: () => any) {
	ctx.message?.new_chat_members!.forEach((user) => {
		try {
			
		} catch (err) {
			ctx.replyWithMarkdown(Render(
        ctx.templates?.text?.error_unknow!, {
					err_value: String(err)
				}
      ));
		}
	})
}