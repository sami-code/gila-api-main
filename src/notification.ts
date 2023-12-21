import { Category } from '@prisma/client';

import { Message } from './message';

class Notification extends Message {
  constructor(text: string, category: Category) {
    super(text, category);
    this.type = 'NOTIFICATION';
  }
  send(ids: number[]) {
    // External API code here for sending Push Notification
    super.log(ids);
  }
}

export { Notification }
