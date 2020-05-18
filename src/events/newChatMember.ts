import { Markup } from 'telegraf';
import { ContextRobot } from "@bot";
import { Render } from "@utils/templates";
import { InlineKeyboardButton } from "telegraf/typings/markup";

interface NewMemberResponse extends Object {
	name: string;
	user_id: number;
	group_title?: string;
	alert?: string;
}

export default async function newChatMember(ctx: ContextRobot, next: () => any) {
	ctx.message?.new_chat_members!.forEach(async (user) => {
		try {
			let buttons: InlineKeyboardButton[][] = [
				[{ text: 'Termos de uso', hide: false, callback_data: 'callback_view_terms' }],
				[{ text: 'Concordo', hide: false, callback_data: 'accept_terms' }]
			];

			ctx.restrictChatMember(user.id, {
				permissions: {
					can_send_messages: false,
					can_add_web_page_previews: false,
					can_change_info: false,
					can_invite_users: false,
					can_pin_messages: false,
					can_send_media_messages: false,
					can_send_other_messages: false,
					can_send_polls: false
				}
			}).then(() => {
				ctx.replyWithMarkdown(Render<NewMemberResponse>(
					ctx.templates!.text.new_chat_member, {
					name: user.first_name,
					user_id: user.id,
					group_title: ctx.chat!.title,
					alert: ctx.templates!.text.new_member_alert
				}), {
					disable_web_page_preview: true,
					reply_markup: Markup.inlineKeyboard(buttons)
				});
			}).catch((err) => {
				ctx.replyWithMarkdown(Render<NewMemberResponse>(
					ctx.templates!.text.new_chat_member, {
					name: user.first_name,
					user_id: user.id,
					group_title: ctx.chat!.title
				}));
			});
		} catch (err) {
			ctx.replyWithMarkdown(Render(
				ctx.templates?.text?.error_unknow!, {
				err_value: String(err)
			}
			));
		}
	})
}