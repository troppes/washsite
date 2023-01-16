const int setupReadings = 10;
double base = 0;
double runningDeviation, spinningDeviation;
double runningThreshold, spinningThreshold;
String currentStatus = "idle";
bool reset = false;

void setupStatus() {
  Serial.println("calculating baseline, please do not start the machine"); 
  double setupTotal = 0;

  // Setup Baseline
  for (int thisReading = 0; thisReading < setupReadings; thisReading++) {
    // fill the complete array for eacht setup round
    for(int i = 0; i < 100; i++) {
      accelgyro.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
      addReading(gx, gy, gz);
      delay(10);
    }
    calcAverages(averages);
    setupTotal += (abs(averages[0]) + abs(averages[1]) + abs(averages[2]));
    delay(10);
  } 

  base = setupTotal / setupReadings;
  Serial.println("calculation finished");  
}

String calcStatus(double gx, double gy, double gz){

  // add the current reading (only gyro)
  double currentVal = abs(gx) + abs(gy) + abs(gz);

  Serial.println((String) "Running: " + runningThreshold + " / Deviation: " + runningDeviation);
  Serial.println((String) "Spinning: " + spinningThreshold + " / Deviation: " + spinningDeviation);

  if(currentVal > spinningThreshold) {
    currentStatus = "spinning";
    reset = true;
  } else if(currentVal > runningThreshold) {
      if (reset) {
        currentStatus = "reset";
      } else {
        currentStatus = "running";
      }
  } else {
    if (reset) {
      currentStatus = "reset";
    } else {
      currentStatus = "idle";
    }
  }

  return currentStatus;
}

double setRunningDeviation(double deviation){
  runningDeviation = deviation;
  runningThreshold = base + (base * runningDeviation);
};

double setSpinningDeviation(double deviation){
  spinningDeviation = deviation;
  spinningThreshold = base + (base * spinningDeviation);
};
