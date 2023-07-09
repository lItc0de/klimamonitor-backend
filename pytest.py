#!/usr/bin/python
import RPi.GPIO as GPIO
import time

try:
	GPIO.setmode(GPIO.BCM)

	PIN_LED = 17

	GPIO.setup(PIN_LED, GPIO.OUT)

	GPIO.output(PIN_LED, GPIO.LOW)

	print("Waiting for sensor to settle")

	time.sleep(2)

	print("Calculating distance")

	GPIO.output(PIN_LED, GPIO.HIGH)

	time.sleep(2)

	GPIO.output(PIN_LED, GPIO.LOW)

	print("finish")

finally:
	GPIO.cleanup()
