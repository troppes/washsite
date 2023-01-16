#include <AceSorting.h>
using ace_sorting::shellSortKnuth;

#include <Kalman.h>
using namespace BLA;

const int numReadings = 100;

#define n_g 0.5 // gyro measurement noise
#define m_g 0.1 // model std (1/inertia)

KALMAN<3,3> K; // your Kalman filter
BLA::Matrix<3> obs; // observation vector

double readings[numReadings];  // the readings from the analog input
int readIndex = 0;          // the index of the current reading
double total = 0;              // the running total

void setupKalman() {
  // evolution matrix
  K.F = {1.0, 0.0, 0.0,
         0.0, 1.0, 0.0,
         0.0, 0.0, 1.0};
  // measurement matrix
  K.H = {1.0, 0.0, 0.0,
         0.0, 1.0, 0.0,
         0.0, 0.0, 1.0};
  // measurement covariance matrix
  K.R = {n_g*n_g, 0.0, 0.0,
         0.0, n_g*n_g, 0.0,
         0.0, 0.0, n_g*n_g};
  // model covariance matrix
  K.Q = {m_g*m_g, 0.0, 0.0,
         0.0, m_g*m_g, 0.0,
         0.0, 0.0, m_g*m_g};
  
}

double readingsGX[numReadings];  // the readings from the analog input
int readIndexGX = 0;          // the index of the current reading
double totalGX = 0;              // the running total

double readingsGY[numReadings];  // the readings from the analog input
int readIndexGY = 0;          // the index of the current reading
double totalGY = 0;              // the running total

double readingsGZ[numReadings];  // the readings from the analog input
int readIndexGZ = 0;          // the index of the current reading
double totalGZ = 0;              // the running total


void setupReading() {
    setupKalman();

    for (int thisReading = 0; thisReading < numReadings; thisReading++) {
    accelgyro.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
    addReading(gx,gy, gz);
    
    readingsGX[thisReading] = gx;
    readingsGY[thisReading] = gy;
    readingsGZ[thisReading] = gz;

    delay(100);
  }  
}

void addReading(int gx, int gy, int gz){

  obs(0) = gx;
  obs(1) = gy;
  obs(2) = gz;

  K.update(obs);

  // gyro
  totalGX = totalGX - readingsGX[readIndexGX];
  totalGY = totalGY - readingsGY[readIndexGY];
  totalGZ = totalGZ - readingsGZ[readIndexGZ];

  readingsGX[readIndexGX] = K.x(0);
  readingsGY[readIndexGY] = K.x(1);
  readingsGZ[readIndexGZ] = K.x(2);

  totalGX = totalGX + readingsGX[readIndexGX];
  totalGY = totalGY + readingsGY[readIndexGY];
  totalGZ = totalGZ + readingsGZ[readIndexGZ];

  readIndexGX = readIndexGX + 1;
  readIndexGY = readIndexGY + 1;
  readIndexGZ = readIndexGZ + 1;

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

void calcAverages(double* averages) {
  // calculate the average:
  averages[0] = totalGX / numReadings;
  averages[1] = totalGY / numReadings;
  averages[2] = totalGZ / numReadings;
}


void calcMedians(double* medians) {

  double copyReadingsGX[numReadings];
  double copyReadingsGZ[numReadings];
  double copyReadingsGY[numReadings];

  // duplicate arrays
  for(int i = 0; i < numReadings; i++) {
    copyReadingsGX[i] = readingsGX[i];
    copyReadingsGY[i] = readingsGY[i];
    copyReadingsGZ[i] = readingsGZ[i];
  }

  // sort array 
  shellSortKnuth(copyReadingsGX, numReadings);
  shellSortKnuth(copyReadingsGY, numReadings);
  shellSortKnuth(copyReadingsGZ, numReadings);

  medians[0] = readingsGX[numReadings/2];
  medians[1] = readingsGY[numReadings/2];
  medians[2] = readingsGZ[numReadings/2];
}
