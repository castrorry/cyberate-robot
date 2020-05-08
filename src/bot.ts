import { Composer, Middleware, session } from 'telegraf';
import { SceneContextMessageUpdate as Context } from 'telegraf/typings/stage';
import { useConstants, Constants } from '@utils/constants';
import { useTemplates, Templates, Render } from '@utils/templates';
import { useSec, useRoute } from '@controllers/authController';
import { useScene } from '@controllers/stageController';

export interface ContextRobot extends Context {
  constants?: Constants;
  templates?: Templates;
}

const Bot = new Composer<ContextRobot>(
  // Initial middlewares
  useConstants(),
  useTemplates(require('./res/templates.json')),
  useSec(),
  session(),
  useScene(),
  useRoute()
);

Bot.command('test', (ctx) => ctx.reply('testing'));

export default Bot;