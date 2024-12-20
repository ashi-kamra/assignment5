import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError, NotFoundError } from "./errors";

export interface MessageDoc extends BaseDoc {
  message: string;
  sender: ObjectId;
  receiver: ObjectId;
}

export default class MessageConcept {
  public readonly messageHistory: DocCollection<MessageDoc>; //instanca variable

  constructor(collectionName: string) {
    this.messageHistory = new DocCollection<MessageDoc>(collectionName);
    // Create index on messageHistory to make search queries for it performant
    void this.messageHistory.collection.createIndex({ message: 1 });
  }

  async displayMessages(sender: ObjectId, receiver: ObjectId) {
    const messages = await this.messageHistory.readMany({
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender },
      ],
    });
    if (!messages) {
      throw new NotFoundError(`No messages between ${sender} and ${receiver} exist`);
    }
    return messages;
  }

  async sendMessage(message: string, sender: ObjectId, receiver: ObjectId) {
    const _id = this.messageHistory.createOne({ message, sender, receiver });
    return { msg: "Message sent!", _id: await this.messageHistory.readOne({ _id }) }; //can i just put id instead of the readOne?
  }

  async getMessage(message: string) {
    //is it okay if its a string????
    const messageObj = await this.messageHistory.readOne({ message: message });
    if (!messageObj) {
      throw new NotFoundError(`Message ${message} does not exist!`);
    }
    return messageObj;
  }

  async delete(_id: ObjectId, user: ObjectId) {
    await this.assertUserIsSender(_id, user);
    await this.assertUserIsReceiver(_id, user);
    await this.messageHistory.deleteOne({ _id });
    return { msg: "Post deleted successfully!" };
  }

  async assertOwner(user: ObjectId, message: string) {
    const messageObj = await this.messageHistory.readOne({ message: message });
    if (!messageObj) {
      throw new NotFoundError(`Message ${messageObj} does not exist!`);
    }
    if (user.toString() !== messageObj.sender.toString() || messageObj.receiver.toString()) {
      throw new NotAllowedError("User is not sender or receiver of item!");
    }
  }

  private async assertUserIsSender(_id: ObjectId, user: ObjectId) {
    const message = await this.messageHistory.readOne({ _id });
    if (!message) {
      throw new NotFoundError(`Message ${_id} does not exist!`);
    }
    if (message.sender.toString() !== user.toString()) {
      throw new NotAllowedError("User is not sender of message!");
    }
  }

  private async assertUserIsReceiver(_id: ObjectId, user: ObjectId) {
    const message = await this.messageHistory.readOne({ _id });
    if (!message) {
      throw new NotFoundError(`Message ${_id} does not exist!`);
    }
    if (message.receiver.toString() !== user.toString()) {
      throw new NotAllowedError("User is not receiver of message!");
    }
  }
}
