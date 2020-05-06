import { Context, Composer } from 'telegraf';
import { useConstants, Constants } from '@utils/constants';
import { useTemplates, Templates, Render } from '@utils/templates';
import { useSec } from '@controllers/authController';

export interface ContextRobot extends Context {
  constants?: Constants;
  templates?: Templates;
}

const Bot = new Composer<ContextRobot>(
// Initial middlewares
  useConstants(),
  useTemplates(require('./res/templates.json')),
  useSec()
);

Bot.start((ctx) => {
  ctx.replyWithMarkdown(Render(
    ctx.templates?.text?.ok!,
    {
      ok_value: 'bot iniciado!'
    }
  ))
});

export default Bot;