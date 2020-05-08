import { Stage } from "telegraf";
import { MiddlewareFn } from 'telegraf/typings/composer';
import { ContextRobot } from "@bot";
import startScene from "@scenes/start";

export const useScene = (): MiddlewareFn<ContextRobot> => {
  const stage = new Stage([
    startScene
  ], { ttl: 300 });
  return stage.middleware();
}