import { connect } from "amqplib/callback_api.js";

class RabbitMQBroker {
  send({ topic, messages }) {
    connect("amqp://guest:guest@localhost", (error0, connection) => {
      if (error0) {
        throw error0;
      }

      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }

        channel.assertQueue(topic, {
          durable: false
        });

        channel.sendToQueue(topic, Buffer.from(messages));
        console.log(`[x] Sent: ${messages}`);

        setTimeout(() => connection.close(), 500);
      });
    });
  }

  listen(topic) {
    connect("amqp://guest:guest@localhost", (error0, connection) => {
      if (error0) {
        throw error0;
      }

      connection.createChannel((error1, channel) => {
        channel.assertQueue(topic, {
          durable: false
        });

        console.log(`[x] waiting for messages`);

        channel.consume(topic, (message) => {
          console.log(`[x] Received: ${message.content.toString()}`);
        }, {
          noAck: true
        });

        setTimeout(() => connection.close(), 500);
      });
    });
  }
}

export { RabbitMQBroker };
