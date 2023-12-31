#!/usr/bin/python

import time
import sys
import statistics
import RPi.GPIO as GPIO

def getDistance():
  GPIO.setmode(GPIO.BCM)

  PIN_TRIGGER = 17
  PIN_ECHO = 24

  GPIO.setup(PIN_TRIGGER, GPIO.OUT)
  GPIO.setup(PIN_ECHO, GPIO.IN)

  GPIO.output(PIN_TRIGGER, GPIO.LOW)

  # print("Waiting for sensor to settle")

  time.sleep(0.3)

  # print("Calculating distance")

  GPIO.output(PIN_TRIGGER, GPIO.HIGH)

  time.sleep(0.00001)

  GPIO.output(PIN_TRIGGER, GPIO.LOW)

  while GPIO.input(PIN_ECHO)==0:
    pulse_start_time = time.time()
  while GPIO.input(PIN_ECHO)==1:
    pulse_end_time = time.time()

  pulse_duration = pulse_end_time - pulse_start_time
  distance = round(pulse_duration * 17150, 2)
  # print("Distance:",distance,"cm")

  return distance


if __name__ == '__main__':
  distances = []

  try:
    while True:
      dist = getDistance()
      distances.append(dist)
      distances = distances[-5:]

      averageDistance = statistics.median(distances)

      # print(distances)
      print(averageDistance)
      sys.stdout.flush()
      time.sleep(0.5)

    # Reset by pressing CTRL + C
  except KeyboardInterrupt:
    GPIO.cleanup()
