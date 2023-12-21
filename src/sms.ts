import { Category } from '@prisma/client';

import { Message } from './message';

class Sms extends Message {
  constructor(text: string, category: Category) {
    super(text, category);
    this.type = 'SMS';
  }
  send(ids: number[]) {
    // External API code here for sending SMS
    super.log(ids);
  }
}

export { Sms }
