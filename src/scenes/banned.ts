import { BaseScene } from "telegraf";
import { ContextRobot } from "@bot";
import { Render } from "@utils/templates";

interface Result {
  err_value?: string;
}

const bannedScene = new BaseScene<ContextRobot>('banned');

bannedScene.enter((ctx) => {
  if (ctx.updateType === 'message') {
    ctx.replyWithMarkdown(Render<Result>(
      ctx.templates?.text?.error_specified!,
      { err_value: 'Não posso interagir com usuários banidos ou restritos.' }
    ));
  } else if (ctx.updateType === 'callback_query') {
    ctx.answerCbQuery(Render<Result>(
      ctx.templates?.answer?.error_specified!,
      { err_value: 'Não posso interagir com usuários banidos ou restritos.' }
    ));
  }
})

bannedScene.use(() => { });

export default bannedScene;