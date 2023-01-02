const int numReadings = 10;

int readingsX[numReadings];  // the readings from the analog input
int readIndexX = 0;          // the index of the current reading
int totalX = 0;              // the running total
int averageX = 0;            // the average

int readingsY[numReadings];  // the readings from the analog input
int readIndexY = 0;          // the index of the current reading
int totalY = 0;              // the running total
int averageY = 0;            // the average

int readingsZ[numReadings];  // the readings from the analog input
int readIndexZ = 0;          // the index of the current reading
int totalZ = 0;              // the running total
int averageZ = 0;            // the average

int readingsGX[numReadings];  // the readings from the analog input
int readIndexGX = 0;          // the index of the current reading
int totalGX = 0;              // the running total
int averageGX = 0;            // the average

int readingsGY[numReadings];  // the readings from the analog input
int readIndexGY = 0;          // the index of the current reading
int totalGY = 0;              // the running total
int averageGY = 0;            // the average

int readingsGZ[numReadings];  // the readings from the analog input
int readIndexGZ = 0;          // the index of the current reading
int totalGZ = 0;              // the running total
int averageGZ = 0;            // the average


void setupReading() {
    for (int thisReading = 0; thisReading < numReadings; thisReading++) {
    readingsX[thisReading] = 0;
    readingsY[thisReading] = 0;
    readingsZ[thisReading] = 0;

    readingsGX[thisReading] = 0;
    readingsGY[thisReading] = 0;
    readingsGZ[thisReading] = 0;
  }  
}

void addReading(int ax, int ay, int az, int gx, int gy, int gz){
   // subtract the last reading:
  totalX = totalX - readingsX[readIndexX];
  totalY = totalY - readingsY[readIndexY];
  totalZ = totalZ - readingsZ[readIndexZ];

  // gyro
  totalGX = totalGX - readingsGX[readIndexGX];
  totalGY = totalGY - readingsGY[readIndexGY];
  totalGZ = totalGZ - readingsGZ[readIndexGZ];

  readingsX[readIndexX] = ax;
  readingsY[readIndexY] = ay;
  readingsZ[readIndexZ] = az;

  readingsGX[readIndexGX] = gx;
  readingsGY[readIndexGY] = gy;
  readingsGZ[readIndexGZ] = gz;

  // add the reading to the total:
  totalX = totalX + readingsX[readIndexX];
  totalY = totalY + readingsY[readIndexY];
  totalZ = totalZ + readingsZ[readIndexZ];

  totalGX = totalGX + readingsGX[readIndexGX];
  totalGY = totalGY + readingsGY[readIndexGY];
  totalGZ = totalGZ + readingsGZ[readIndexGZ];

  // advance to the next position in the array:
  readIndexX = readIndexX + 1;
  readIndexY = readIndexY + 1;
  readIndexZ = readIndexZ + 1;

  readIndexGX = readIndexGX + 1;
  readIndexGY = readIndexGY + 1;
  readIndexGZ = readIndexGZ + 1;

  // wrap to beginning
  if (readIndexX >= numReadings) {
    readIndexX = 0;
  }
  if (readIndexY >= numReadings) {
    readIndexY = 0;
  }
  if (readIndexZ >= numReadings) {
    readIndexZ = 0;
  }

  if (readIndexGX >= numReadings) {
    readIndexGX = 0;
  }
  if (readIndexGY >= numReadings) {
    readIndexGY = 0;
  }
  if (readIndexGZ >= numReadings) {
    readIndexGZ = 0;
  }

};

void calcAverages(int* averages) {
  // calculate the average:
  averages[0] = totalX / numReadings;
  averages[1] = totalY / numReadings;
  averages[2] = totalZ / numReadings;

  averages[3] = totalGX / numReadings;
  averages[4] = totalGY / numReadings;
  averages[5] = totalGZ / numReadings;
}