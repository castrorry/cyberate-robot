import { Composer, session, Middleware } from 'telegraf';
import { SceneContextMessageUpdate as Context } from 'telegraf/typings/stage';
import { useConstants, Constants } from '@utils/constants';
import { useTemplates, Templates } from '@utils/templates';
import { useSec, useChat } from '@controllers/chatController';
import { useScene } from '@controllers/stageController';
import { useArgs } from '@utils/args';

export interface ContextRobot extends Context {
  constants?: Constants;
  templates?: Templates;

  getArgs?: () => string[];
}

export interface ComposeRobot extends Composer<ContextRobot> {
  /**
   * Registers middleware for handling specified entities.
   */
  entity?(
    entity: string | string[],
    ...middlewares: ReadonlyArray<Middleware<ContextRobot>>
  ): this
}

const Bot = new Composer<ContextRobot>(
  // Initial middlewares
  useConstants(),
  useTemplates(require('./res/templates.json')),
  useArgs(),
  session(),
  useScene(),
  useSec(),
  useChat()
);



export default Bot;