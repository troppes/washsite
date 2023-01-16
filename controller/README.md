## Setup



### Variants

The washtrak_kalman variant is the default one. It includes a Kalman filter for more accurate results. The are one is more experimental for people, who want to tinker around with the raw data.

### Libraries

The following libraries are in use and need to be installed:

- AceSorting v1.0.0
- ArduinoJson v6.20.0
- BasicLinearAlgebra v3.7.0
- Kalman v1.1.0

### Find correct Thresholds

COMING SOON!

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
