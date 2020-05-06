import { Router, Response } from 'express';
import Robot, { ContextRobot } from '@bot';
import Telegraf, { Context } from 'telegraf';
import { User } from 'telegraf/typings/telegram-types';

interface ListBotResponse {
  ok: boolean;
  bots?: User[];
  message?: string;
}

interface SwitchBotResponse {
  ok: boolean;
  message: string;
}

const route = Router();
let bots: {
  bot: Telegraf<ContextRobot>;
  user: User;
}[] = [];

route.get('/list', (req, res: Response<ListBotResponse>) => {
  try {
    res.json({ ok: true, bots: bots.map(bot => bot.user) });
  } catch (err) {
    res.json({ ok: false, message: err });
  }
});

route.post('/start', async (req, res: Response<SwitchBotResponse>) => {
  try {
    const { token } = req.body;

    let bot_snapshot = bots.filter((i) => i.bot.token === token);
    if (bot_snapshot.length > 0) {
      res.json({ ok: false, message: `Bot ${bot_snapshot[0].user.first_name} already started!` });
    } else {

      let init_bot = new Telegraf<ContextRobot>(token);
      await init_bot.use(Robot).launch();
      let this_bot = await init_bot.telegram.getMe();
      bots.push({ bot: init_bot, user: this_bot });
      res.json({ ok: true, message: `Bot ${this_bot.first_name}, started!` });

    }
  } catch (err) {
    res.json({ ok: false, message: err });
  }
});

route.post('/stop', async (req, res: Response<SwitchBotResponse>) => {
  try {
    const { token } = req.body;

    let bot_snapshot = bots.filter((i) => i.bot.token === token);
    if (bot_snapshot.length === 1) {
      await bot_snapshot[0].bot.stop();
      bots = bots.filter((i) => i.bot.token != token);
      res.json({ ok: true, message: `Bot ${bot_snapshot[0].user.first_name} stoped!` });
    } else {
      res.json({ ok: false, message: `This bot not is started!` });
    }
  } catch (err) {
    res.json({ ok: false, message: err });
  }
});

export default function () {
  return route;
}