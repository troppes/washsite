const int statusReadings = 5;
int base = 0;
// base offset is used to make the calculations more reliable, e.g. if the gx = 0; then an deviation doesnt do anything
const int baseOffset = 3;
double runningDeviation, spinningDeviation;
int runningThreshold, spinningThreshold;

int readings[statusReadings];  // the readings from the analog input
int readIndex = 0;          // the index of the current reading
int total = 0;              // the running total
String currentStatus = "idle";

void setupStatus() {
  Serial.println("calculating baseline, please do not start the machine"); 

  for (int thisReading = 0; thisReading < statusReadings; thisReading++) {
    accelgyro.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
    int currentValue = (abs(gx) + abs(gy) + abs(gz)) / 6;
    total += currentValue;
    readings[thisReading] = currentValue;
    delay(100);
  } 

  base = total / statusReadings + baseOffset;

  runningThreshold = base + (base * runningDeviation);
  spinningThreshold = base + (base * spinningDeviation);

  Serial.println("calculation finished");  

}

void addStatusReading(int ax, int ay, int az, int gx, int gy, int gz){

  // remove the old reading
  total = total - readings[readIndex];

  // add the current reading (only gyro)
  readings[readIndex] = (abs(gx) + abs(gy) + abs(gz)) / 3;

  // add the new reading
  total = total + readings[readIndex];

  // advance to the next position in the array:
  readIndex = readIndex + 1;

  // wrap to beginning
  if (readIndex >= numReadings) {
    readIndex = 0;
  }

  int currentTotal = total / statusReadings;

  if(currentTotal > spinningThreshold) {
    currentStatus = "spinning";
  } else if(currentTotal > runningThreshold) {
    currentStatus = "running";
  } else {
    currentStatus = "idle";
  }
}

double setRunningDeviation(double deviation){
  runningDeviation = deviation;
  runningThreshold = base + (base * runningDeviation);
};

double setSpinningDeviation(double deviation){
  spinningDeviation = deviation;
  spinningThreshold = base + (base * spinningDeviation);
};

String getCurrentStatus(){
  return currentStatus;
}