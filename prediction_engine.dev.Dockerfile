FROM tensorflow/tensorflow:latest-gpu-jupyter


RUN mkdir -p /prediction_engine

COPY ./prediction_engine /prediction_engine

RUN  "cd" "/prediction_engine"
CMD "python" "/prediction_engine/main.py"