import { Category } from '@prisma/client';

import { Message } from './message';

class Email extends Message {
  constructor(text: string, category: Category) {
    super(text, category);
    this.type = 'EMAIL'
  }
  send(ids: number[]) {
    // External API code here for sending EMAIL
    super.log(ids);
  }
}

export { Email }
