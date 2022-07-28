import tensorflow as tf
import psutil
print("Hello from Microservice predictionEngine am listening at ports:")

processes = psutil.process_iter()
print("Ports:")
for proc in processes:
    for c in proc.connections():
        if c.status == 'LISTEN':
            print(c.laddr.port)


print(tf.reduce_sum(tf.random.normal([1000, 1000])))