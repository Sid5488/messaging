import { Kafka } from "kafkajs";

import { MessageBroker } from "../../messaging/messaging-broker.js";

class KafkaBroker extends MessageBroker {
  constructor(clientId, brokers) {
    const kafka = new Kafka({
      clientId,
      brokers
    });

    super(kafka);

    this.broker = kafka;
  }

  async listen(topic, fromBeginning = true) {
    const consumer = this.broker.consumer({ groupId: "app-kafka-listener" });
    await consumer.connect();

    await consumer.subscribe({ topic, fromBeginning });

    await consumer.run({
      eachMessage: async ({ topic, message, partition }) => {
        console.log({
          value: message.value.toString()
        });

        setTimeout(async () => await consumer.disconnect(), 500);
      }
    });
  }

  async send({ topic, messages }) {
    const producer = this.broker.producer();
    await producer.connect();

    const response = await producer.send({
      topic,
      messages
    });
  
    await producer.disconnect();

    return response;
  }
}

export { KafkaBroker };
