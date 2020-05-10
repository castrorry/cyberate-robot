import { Composer, session } from 'telegraf';
import { SceneContextMessageUpdate as Context } from 'telegraf/typings/stage';
import { useConstants, Constants } from '@utils/constants';
import { useTemplates, Templates } from '@utils/templates';
import { useSec, useRoute } from '@controllers/authController';
import { useScene } from '@controllers/stageController';
import { useArgs } from '@utils/args';

export interface ContextRobot extends Context {
  constants?: Constants;
  templates?: Templates;

  getArgs?: () => string[];
}

const Bot = new Composer<ContextRobot>(
  // Initial middlewares
  useConstants(),
  useTemplates(require('./res/templates.json')),
  useArgs(),
  session(),
  useScene(),
  useSec(),
  useRoute()
);

export default Bot;