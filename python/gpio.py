#!/usr/bin/python

import time
import sys
import RPi.GPIO as GPIO

def getDistance():
  GPIO.setmode(GPIO.BCM)

  PIN_TRIGGER = 17
  PIN_ECHO = 24

  GPIO.setup(PIN_TRIGGER, GPIO.OUT)
  GPIO.setup(PIN_ECHO, GPIO.IN)

  GPIO.output(PIN_TRIGGER, GPIO.LOW)

  # print("Waiting for sensor to settle")

  time.sleep(2)

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
  try:
    while True:
      dist = getDistance()
      print(dist)
      sys.stdout.flush()
      time.sleep(0.2)

    # Reset by pressing CTRL + C
  except KeyboardInterrupt:
    GPIO.cleanup()
