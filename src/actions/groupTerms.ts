import { ContextRobot } from "@bot";
import { Render } from "@utils/templates";

interface Result {
  err_value?: string;
  ok_value?: string;
}

export async function accept(ctx: ContextRobot, next: () => any) {
  ctx.telegram.restrictChatMember(
    ctx.constants!.GROUP_ID,
    ctx.from?.id!,
    {
      permissions: {
        can_send_messages: true,
        can_add_web_page_previews: true,
        can_change_info: false,
        can_invite_users: false,
        can_pin_messages: false,
        can_send_media_messages: true,
        can_send_other_messages: true,
        can_send_polls: true
      }
    }
  ).then(() => {
    ctx.answerCbQuery(Render<Result>(ctx.templates!.answer.ok, {
      ok_value: 'Agora você podera interagir oficialmente no grupo.'
    })).then(async () => {
      ctx.editMessageText(ctx.callbackQuery!.message!.text!, {
        parse_mode: 'Markdown'
      })
    })
  }).catch((err) => {
    ctx.answerCbQuery(Render<Result>(
      ctx.templates!.answer.error_unknow, {
      err_value: String(err)
    }), true);
  })
}