import { Middleware } from 'telegraf';
import { ContextRobot } from '@bot';

interface TemplateText {
  ok: string;
  error_unknow: string;
  error_specified: string;
  start: string;
  terms: string;
  new_chat_member: string;
  new_member_alert: string;
  channel_group_invite: string;
  group_invite_ok: string;
  terms_acepteds: string;
}

interface TemplateAnswer {
  ok: string;
  error_unknow: string;
  error_specified: string;
}

interface TemplateList {
  rules: string[]
}

export interface Templates {
  text: TemplateText;
  answer: TemplateAnswer;
  list: TemplateList;
}

export function useTemplates(templates: Templates): Middleware<ContextRobot> {
  return (ctx, next) => {
    ctx.templates = templates;
    next();
  }
}

export function Render<TValues>(template: string, values: TValues): string {
  for (const [key, value] of Object.entries(values)) {
    template = template.replace('{{' + key + '}}', value)
  }
  return template;
}

export function RenderList(list: string[]): string {
  let template = '\n';
  list.map((item: string) => {
    template += item+'\n'
  });
  return template
}