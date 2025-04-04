import { KafkaBroker } from "./libs/kafkajs/kafka-broker.js";
import { RabbitMQBroker } from "./libs/rabbitmq/rabbitmq-broker.js";
import { MessageBroker } from "./messaging/messaging-broker.js";

async function main() {
  const kafka = new KafkaBroker("app-kafka", ["localhost:9092"]);
  const messageBroker = new MessageBroker(kafka);

  await messageBroker.send({ 
    topic: "topic-test", 
    messages: [{ value: "My first message" }]
  });

  await messageBroker.listen("topic-test");

  const rabbitmqBroker = new RabbitMQBroker();
  const rabbitMessageBroker = new MessageBroker(rabbitmqBroker);
  rabbitMessageBroker.send({ topic: "topic-test", messages: "Rabbit message" });
  rabbitMessageBroker.listen("topic-test");
}

main();
