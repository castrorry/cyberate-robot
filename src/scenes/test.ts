import { BaseScene, Context, Composer } from "telegraf";
import { ContextRobot } from '@bot';
import { Render } from "@utils/templates";
import { start } from "@controllers/commandController";
import { Message, ParseMode } from "telegraf/typings/telegram-types";
import { InlineKeyboardButton } from "telegraf/typings/markup";

interface MyContext extends Context {
    editMessageCaption(
        caption?: string,
        parse_mode?: ParseMode,
        reply_markup?: InlineKeyboardButton
    ): Promise<Message | boolean>
}

const testScene = new Composer<MyContext>('test');

// Scene enter and exit event
testScene.enter((ctx) => ctx.replyWithMarkdown('`HELLOOOO`'));
testScene.leave((ctx) => ctx.replyWithMarkdown('`BYEEEE`'));

// Scene commands
testScene.command('end', (ctx) => ctx.scene.leave());
testScene.command('tree', (ctx) => ctx.reply('Tree is test!'));
testScene.command('edit', (ctx) => {
    ctx.reply('aaa', {

    })
})

// Scene default breaker
testScene.use((ctx) => { });

export default testScene;