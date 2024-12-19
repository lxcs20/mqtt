import mqtt from "mqtt";

const brokerUrl = "mqtt://127.0.0.1:1883";

const client = mqtt.connect(brokerUrl, {
    username: "guest",
    password: "guest",
    clientId: "somestring",
    clean: false,
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

    const message = "Hello from MQTT!";
    client.publish(topic, message, { qos: 1 }, (err) => {
        if (err) {
            console.error("Publish error:", err);
        } else {
            console.log(`Message published: "${message}"`);
        }
    });
});

client.on("message", (topic, message) => {
    console.log(`Message received on ${topic}: ${message.toString()}`);
});

client.on("error", (err) => {
    console.error("MQTT error:", err);
});
