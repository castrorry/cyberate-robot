import { BaseScene } from "telegraf";
import { ContextRobot } from '@bot';
import { Render } from "@utils/templates";
import { startController } from "@controllers/commandController";

const startScene = new BaseScene<ContextRobot>('start');

// Scene enter and exit event
startScene.enter(startController());
startScene.leave((ctx) => ctx.replyWithMarkdown(Render(ctx.templates?.text?.end!, { session_name: ctx.scene.current?.id })));

// Scene commands
startScene.command('end', (ctx) => ctx.scene.leave());
startScene.command('tree', (ctx) => ctx.reply('Tree is!'));

// Scene default breaker
startScene.use((ctx) => { });

export default startScene;