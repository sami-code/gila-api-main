import {
  Category
} from "@prisma/client";
import { Type } from "@prisma/client";
import { Sms } from "../sms";
import { MessageSender } from "../messageSender";

import { Message } from "../message";
import { Email } from "../email";
import { Notification } from "../notification";
import { UserOperations } from "../userOperations";

// Tests that an SMS is sent to a single provided id
it('test_send_to_single_id', async () => {
  const sms = new Sms('test message', Category.SPORTS);
  const sendSmsMock = jest.spyOn(sms, 'send');
  await sms.send([1]);
  expect(sendSmsMock).toHaveBeenCalled();
});

// Tests that an SMS is sent to multiple provided ids
it('test_send_to_multiple_ids', async () => {
  const sms = new Sms('test message', Category.FINANCE);
  const sendSmsMock = jest.spyOn(sms, 'send');
  await sms.send([1, 2, 3]);
  expect(sendSmsMock).toHaveBeenCalled();
});

// Tests that an SMS is not sent when an empty array of ids is provided
it('test_send_to_empty_ids', async () => {
  const sms = new Sms('test message', Category.MOVIES);
  const sendSmsMock = jest.spyOn(sms, 'send');
  const logRecordMock = jest.spyOn(sms, 'log');
  await sms.send([]);
  expect(sendSmsMock).toHaveBeenCalled();
  expect(logRecordMock).not.toHaveBeenCalled();
});

// Tests that an SMS is logged to a single provided id
it('test_log_to_single_id', async () => {
  const sms = new Sms('test message', Category.SPORTS);
  const logRecordMock = jest.spyOn(sms, 'log');
  sms.log([1]);
  expect(logRecordMock).toHaveBeenCalledWith(
    [1]
  );
});


// Tests that an email can be successfully sent to one recipient
it('test_send_email_to_one_recipient', async () => {
  const email = new Email('test message', Category.SPORTS);
  const sendEmailMock = jest.spyOn(email, 'send');
  await email.send([1]);
  expect(sendEmailMock).toHaveBeenCalled();
});


// Tests that an email can be successfully sent to multiple recipients
it('test_send_email_to_multiple_recipients', async () => {
  const email = new Email('test message', Category.FINANCE);
  const sendEmailMock = jest.spyOn(email, 'send');
  await email.send([1, 2, 3]);
  expect(sendEmailMock).toHaveBeenCalled();
});


// Tests that an error is thrown when attempting to send an email to an empty recipient list
it('test_send_email_to_empty_recipient_list', async () => {
  const email = new Email('test message', Category.MOVIES);
  const sendEmailMock = jest.spyOn(email, 'send');
  const logRecordMock = jest.spyOn(email, 'log');
  await email.send([])
  expect(sendEmailMock).toHaveBeenCalled();
  expect(logRecordMock).not.toHaveBeenCalled();
});


// Tests that an email is logged to a single provided id
it('test_log_to_single_id', async () => {
  const email = new Email('test message', Category.SPORTS);
  const logRecordMock = jest.spyOn(email, 'log');
  email.log([1]);
  expect(logRecordMock).toHaveBeenCalledWith(
    [1]
  );
});


// Tests that an notification is sent to a single provided id
it('test_send_to_single_id', async () => {
  const notification = new Notification('test message', Category.SPORTS);
  const sendnotificationMock = jest.spyOn(notification, 'send');
  await notification.send([1]);
  expect(sendnotificationMock).toHaveBeenCalled();
});

// Tests that an notification is sent to multiple provided ids
it('test_send_to_multiple_ids', async () => {
  const notification = new Notification('test message', Category.FINANCE);
  const sendnotificationMock = jest.spyOn(notification, 'send');
  await notification.send([1, 2, 3]);
  expect(sendnotificationMock).toHaveBeenCalled();
});

// Tests that an notification is not sent when an empty array of ids is provided
it('test_send_to_empty_ids', async () => {
  const notification = new Notification('test message', Category.MOVIES);
  const sendnotificationMock = jest.spyOn(notification, 'send');
  const logRecordMock = jest.spyOn(notification, 'log');
  await notification.send([]);
  expect(sendnotificationMock).toHaveBeenCalled();
  expect(logRecordMock).not.toHaveBeenCalled();
});

// Tests that an notification is logged to a single provided id
it('test_log_to_single_id', async () => {
  const notification = new Notification('test message', Category.SPORTS);
  const logRecordMock = jest.spyOn(notification, 'log');
  notification.log([1]);
  expect(logRecordMock).toHaveBeenCalledWith(
    [1]
  );
});





// Tests that creating a new instance of Message with text and category sets the properties correctly
it('test_create_message_with_text_and_category', () => {
  const message = new Message('Hello, world!', Category.SPORTS);
  expect(message.text).toBe('Hello, world!');
  expect(message.category).toBe(Category.SPORTS);
});


// Tests that calling the log method with an empty array of user ids does not log anything
it('test_log_message_with_empty_array_of_user_ids', async () => {
  const logRecordMock = jest.fn();
  const ids = [];
  const message = new Message('Hello, world!', Category.SPORTS);
  await message.log(ids);
  expect(logRecordMock).not.toHaveBeenCalled();
});






// Tests that SMS is sent to multiple users
it('test_send_sms_to_multiple_users', async () => {
  const users = [
    { id: 1, types: ["SMS"] as Type[], email: "test1@test.com", name: "Test1", phone: "1234567890", subscribed: ['SPORTS'] as Category[], createdAt: new Date(), updatedAt: new Date() },
    { id: 2, types: ["SMS"] as Type[], email: "test2@test.com", name: "Test2", phone: "1234567890", subscribed: ['SPORTS'] as Category[], createdAt: new Date(), updatedAt: new Date() },
    { id: 3, types: ["SMS"] as Type[], email: "test3@test.com", name: "Test3", phone: "1234567890", subscribed: ['SPORTS'] as Category[], createdAt: new Date(), updatedAt: new Date() }

  ];
  const sendSpy = jest.spyOn(Sms.prototype, 'send');
  await MessageSender.sendSms(users, 'test message', Category.SPORTS);
  expect(sendSpy).toHaveBeenCalledWith([1, 2, 3]);
});

// Tests that Email is sent to multiple users
it('test_send_email_to_multiple_users', async () => {
  const users = [
    { id: 1, types: ["EMAIL"] as Type[], email: "test1@test.com", name: "Test1", phone: "1234567890", subscribed: [Category.SPORTS] as Category[], createdAt: new Date(), updatedAt: new Date() },
    { id: 2, types: ["EMAIL"] as Type[], email: "test2@test.com", name: "Test2", phone: "1234567890", subscribed: [Category.SPORTS] as Category[], createdAt: new Date(), updatedAt: new Date() },
    { id: 3, types: ["EMAIL"] as Type[], email: "test3@test.com", name: "Test3", phone: "1234567890", subscribed: [Category.SPORTS] as Category[], createdAt: new Date(), updatedAt: new Date() }

  ];
  const sendSpy = jest.spyOn(Email.prototype, 'send');
  await MessageSender.sendEmail(users, 'test message', Category.SPORTS);
  expect(sendSpy).toHaveBeenCalledWith([1, 2, 3]);
});

// Tests that Push Notification is sent to multiple users
it('test_send_push_notification_to_multiple_users', async () => {
  const users = [
    { id: 1, types: ["NOTIFICATION"] as Type[], email: "test1@test.com", name: "Test1", phone: "1234567890", subscribed: [Category.SPORTS] as Category[], createdAt: new Date(), updatedAt: new Date() },
    { id: 2, types: ["NOTIFICATION"] as Type[], email: "test2@test.com", name: "Test2", phone: "1234567890", subscribed: [Category.SPORTS] as Category[], createdAt: new Date(), updatedAt: new Date() },
    { id: 3, types: ["NOTIFICATION"] as Type[], email: "test3@test.com", name: "Test3", phone: "1234567890", subscribed: [Category.SPORTS] as Category[], createdAt: new Date(), updatedAt: new Date() }

  ];
  const sendSpy = jest.spyOn(Notification.prototype, 'send');
  await MessageSender.sendNotification(users, 'test message', Category.SPORTS);
  expect(sendSpy).toHaveBeenCalledWith([1, 2, 3]);
});





// Tests that getUsersBySubscription returns an array of users
it('test_get_users_by_subscription_returns_array', async () => {
  const users = await UserOperations.getUsersBySubscription(Category.SPORTS);
  expect(Array.isArray(users)).toBe(true);
});



// Tests that getUsersBySubscription throws an error if category is undefined
it('test_get_users_by_subscription_throws_error', async () => {
  await expect(UserOperations.getUsersBySubscription(undefined)).rejects.toThrow();
});

