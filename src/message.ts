import { Category, Type } from '@prisma/client';
import { logRecord } from './queues/log.queue';

class Message {
  text: string;
  type: Type;
  category: Category;
  constructor(theText: string, theCategory: Category) {
    this.text = theText;
    this.category = theCategory;
  }
  log(ids: number[]) {
    ids.forEach(async (id) => {
      logRecord({
        userId: id,
        message: this.text,
        type: this.type,
        category: this.category
      })
    });
  }
}

export { Message }
