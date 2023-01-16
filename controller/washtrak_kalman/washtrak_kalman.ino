#include <ArduinoJson.h>
#include <ArduinoJson.hpp>

#include <Wire.h>
#include <WiFi.h>
#include <HTTPClient.h>

#include <I2Cdev.h>
#include <MPU6050.h>

MPU6050 accelgyro;
WiFiClientSecure client;

const char* ssid = "Lord Voldemodem";
const char* password =  "R3itz-WLAN";

// Login data for Website
const char* api = "https://washback.reitz.dev/api/machines/name/H04W01";
const char* loginApi = "https://washback.reitz.dev/api/auth/login";
const char* apiUser = "machine";
const char* apiPass = "machine";
String apiToken = "";

// Only for Debugging
const bool debug = true;
const char* debugServer = "https://cms.reitz.dev/items/washtrak";
const char* debugJWT = "Bearer 176OS-NMq4MPxfcscCuTMEnKsxgroENI";

int16_t ax, ay, az, gx, gy, gz;

// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastTime = 0;
unsigned long timerDelay = 30000;

double averages[3];
double medians[3];

void setThresholds() {

  HTTPClient http;
  http.begin(client, api);
  http.addHeader("Authorization", apiToken);
  http.addHeader("Content-Type", "application/json");

  http.GET();

  DynamicJsonDocument doc(8192);
  deserializeJson(doc, http.getStream());

  setRunningDeviation(doc["machine"]["running_threshold"].as<double>());
  setSpinningDeviation(doc["machine"]["spinning_threshold"].as<double>());

  http.end();
};

String getJWTToken() {
  HTTPClient http;
  http.begin(client, loginApi);
  http.addHeader("Content-Type", "application/json");
  http.setAuthorization(apiUser, apiPass);
  
  http.POST("");
  
  DynamicJsonDocument doc(1024);
  deserializeJson(doc, http.getStream());

  http.end();

  return doc["accessToken"];
} 

void setup(void) {
  Serial.begin(9600);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("Connecting to WiFi ..");
    delay(500);
  }

  Serial.println((String)"Connected to WiFi network with IP Address: " + WiFi.localIP().toString());
  client.setInsecure(); // disable fingerprint vertification for the http client
  apiToken = "Bearer " + getJWTToken();

  // join I2C bus (I2Cdev library doesn't do this automatically)
  #if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
      Wire.begin();
  #elif I2CDEV_IMPLEMENTATION == I2CDEV_BUILTIN_FASTWIRE
      Fastwire::setup(400, true);
  #endif

  // initialize device
  Serial.println("Initializing I2C devices...");
  accelgyro.initialize();


  // verify connection
  Serial.println("Testing device connections...");
  Serial.println(accelgyro.testConnection() ? "MPU6050 connection successful" : "MPU6050 connection failed");
  
  // setup gyro
  setupGyroOffsets();

  // setup readings
  setupReading();

  // setup Status
  setupStatus();
}

void loop(void) {
  accelgyro.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
  addReading(gx, gy, gz);

  if ((millis() - lastTime) > timerDelay) {
    if(WiFi.status()== WL_CONNECTED){

      // get new Threshold / consider moving this in slow repeating code
      setThresholds();
      // fills the averages array
      calcAverages(averages);
      calcMedians(medians);
      // calculate the current status based on the averages
      String status = calcStatus(medians[0], medians[1] ,averages[2]);

      // Print Medians & Averages
      Serial.println((String) "Curr Average: " + (abs(averages[0]) + abs(averages[1]) + abs(averages[2])));
      Serial.println((String) "Curr Median: " + (abs(medians[0]) + abs(medians[1]) + abs(medians[2])));

      HTTPClient http;
      http.begin(client, api);
      http.addHeader("Authorization", apiToken);
      http.addHeader("Content-Type", "application/json");

      DynamicJsonDocument data(1024);
      data["status"] = status; 

      String json;
      serializeJson(data, json);
      int responseCode = http.POST(json);

      http.end();

       if (responseCode != 200) {
          if(responseCode == 401) {
            Serial.println((String)"Status Code: " + responseCode);
            Serial.println("Trying new JWT token");
            apiToken = "Bearer " + getJWTToken();
            Serial.println(apiToken);
          } else {
            Serial.println((String)"Status Code: " + responseCode);
            Serial.println("Please contact support!");            
          }
      }
    
      if(debug) {
        HTTPClient http;
        http.begin(client, debugServer);
        http.addHeader("Authorization", debugJWT);
        http.addHeader("Content-Type", "application/json");

        DynamicJsonDocument data(1024);
        data["avg"] = (abs(averages[0]) + abs(averages[1]) + abs(averages[2]));
        data["median"] = (abs(medians[0]) + abs(medians[1]) + abs(medians[2]));
        data["status"] = status; 

        String json;
        serializeJson(data, json);
        Serial.println("Data to send: ");
        Serial.println(json);
        Serial.println((String)"Status Code (Debug): " + http.POST(json));

        http.end();
      }
    } 
    lastTime = millis();
  }
  delay(300);
}