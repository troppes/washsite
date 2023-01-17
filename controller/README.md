## Setup

- Fill in the credentials in the washtrak(_kalman).ino.

- Place the sensor inside the washing machine and power it on. It will start a setup process, which can be viewed on the serial console. If you do not connect it to a computer wait until the status of the washing machine changes to idle. 
  - Note: During the setup process the machine starts to measure the idle vibration and calculates offsets for the sensors. Do not disturb the sensor during that time.

### Variants

The washtrak_kalman variant is the default one. It includes a Kalman filter for more accurate results. The are one is more experimental for people, who want to tinker around with the raw data.

## Libraries

The following libraries are in use and need to be installed:

- AceSorting v1.0.0
- ArduinoJson v6.20.0
- BasicLinearAlgebra v3.7.0
- Kalman v1.1.0

### Find correct Thresholds

For setting up treshhold enable debugging by setting the corresponding boolean. With this the values can either be sent to an API or can be read direcly from the serial console. Then see what values are measured by the sensor during the running/spinning phases and set the tresholds accordingly.

- Note: Since the sensors tend to drift after exposure to long strong vibrations the system will automatically reboot when it detecs a drop after spinning. Please keep this in mind when settings the threshold, that only the long spinning programm is detected.

## Hardware used

If you want to build the project yourself you can use the following hardware:

- MPU-6050
- ESP32 Dev Kit C V4 NodeMCU
- Cables

PHOTOS COMING SOON!

A sodering iron was used to more permanently fix the cables to the gyro sensor, since the spinning programm can loosen the pins. 

## Pin mapping

| MPU-6050  | ESP32 Dev Kit  |
|---|---|
| VCC  | 3.3V  |
| GND  | GND |
| SCL  | 22  |
| SDA | 21 |