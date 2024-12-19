import mqtt from "mqtt";

const brokerUrl = "mqtt://127.0.0.1:1883";
// const brokerUrl = "6a60f28984b7463ea25d6758548c25b3.s1.eu.hivemq.cloud:8883";

// Connect to RabbitMQ
const client = mqtt.connect(brokerUrl, {
    username: "guest",
    password: "guest",
});

const topic = "test/topic";

client.on("connect", () => {
    console.log("Connected to RabbitMQ (MQTT)");

    client.subscribe(topic, (err) => {
        if (err) {
            console.error("Subscription error:", err);
        } else {
            console.log(`Subscribed to topic: ${topic}`);
        }
    });

    let count = 0;
    let message = `my message to mqtt ${count}`;
    client.publish(topic, message, { qos: 2 }, (err) => {
        if (err) {
            console.error("Publish error:", err);
        } else {
            console.log(`Message published: "${message}"`);
        }
    });

    setInterval(() => {
        client.publish(
            topic,
            `my message to mqtt ${count}`,
            { qos: 1, retain: true },
            (err) => {
                count += 1;
                if (err) {
                    console.error("Publish error:", err);
                } else {
                    console.log(
                        `Message published: my message to mqtt ${count}`
                    );
                }
            }
        );
    }, 5000);
});
