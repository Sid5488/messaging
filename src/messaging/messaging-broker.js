class MessageBroker {
  /** @type {MessageBroker} */
  #messageBroker;

  constructor(messageBroker) {
    if (messageBroker !== undefined) this.#messageBroker = messageBroker;
  }

  async listen(topic, fromBeginning = true) {
    await this.#messageBroker.listen(topic, fromBeginning);
  }

  async send({ topic, messages }) {
    return this.#messageBroker.send({ topic, messages });
  }
}

export { MessageBroker }
