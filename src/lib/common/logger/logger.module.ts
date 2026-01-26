import { provide } from '@inversifyjs/binding-decorators';
import { ILogger } from '@lib/interfaces';
import clc from 'cli-color';
import { injectable } from 'inversify';
import { loggerStatus, loggerTags, Tag, TagKey } from './logger.dictionary';
import { LOGGER } from '@lib/di/keys';

@injectable()
@provide(LOGGER)
export class Logger implements ILogger {
  private status = loggerStatus;
  private tags = loggerTags;
  private currentTag: TagKey = 'default';

  constructor() {}

  private mask(color: Function, prepend: string, append: string, data: any[]) {
    const body = data.flatMap((el: any) => {
      if (typeof el === 'object') {
        return JSON.stringify(el, null, 2);
      }
      if (typeof el === 'string') {
        return color(el);
      }
    });

    return [color(`${prepend}(status): ${append} `), ...body];
  }

  getTag(key: TagKey): Tag {
    if (!this.tags[key]) {
      return this.tags['default'];
    }
    return this.tags[key];
  }

  tag(tag: TagKey) {
    this.currentTag = tag;
    return this;
  }

  reset() {
    this.currentTag = 'default';
  }

  log(...data: any[]) {
    const status = this.status['default'];
    const tag = this.getTag(this.currentTag);
    const prepend = `${tag.icon} ${tag.flag}: `;
    const formatted = this.mask(clc.magenta, prepend, status, data);
    console.log(...formatted);
    this.reset();
  }

  success(...data: any[]) {
    const status = this.status['success'];
    const tag = this.getTag(this.currentTag);
    const prepend = `${tag.icon} ${tag.flag}: `;
    const formatted = this.mask(clc.green, prepend, status, data);
    console.log(...formatted);
    this.reset();
  }

  warning(...data: any) {
    const status = this.status['warning'];
    const tag = this.getTag(this.currentTag);
    const prepend = `${tag.icon} ${tag.flag}: `;
    const formatted = this.mask(clc.yellow, prepend, status, data);
    console.warn(...formatted);
    this.reset();
  }

  info(...data: any) {
    const status = this.status['info'];
    const tag = this.getTag(this.currentTag);
    const prepend = `${tag.icon} ${tag.flag}: `;
    const formatted = this.mask(clc.blue, prepend, status, data);
    console.info(...formatted);
    this.reset();
  }

  error(...data: any) {
    const status = this.status['error'];
    const tag = this.getTag(this.currentTag);
    const prepend = `${tag.icon} ${tag.flag}: `;
    const formatted = this.mask(clc.red, prepend, status, data);
    console.error(...formatted);
    this.reset();
  }

  debug(...data: any) {
    const status = this.status['debug'];
    const tag = this.getTag(this.currentTag);
    const prepend = `${tag.icon} ${tag.flag}: `;
    const formatted = this.mask(clc.cyan, prepend, status, data);
    console.debug(...formatted);
    this.reset();
  }

  rocket(...data: any) {
    const status = this.status['launch'];
    const tag = this.getTag(this.currentTag);
    const prepend = `${tag.icon} ${tag.flag}: `;
    const formatted = this.mask(clc.cyanBright, prepend, status, data);
    console.log(...formatted);
    this.reset();
  }
}
