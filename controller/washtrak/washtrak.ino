#include <ArduinoJson.h>
#include <ArduinoJson.hpp>

#include <Wire.h>
#include <WiFi.h>
#include <HTTPClient.h>

#include <I2Cdev.h>
#include <MPU6050.h>

MPU6050 accelgyro;
WiFiClientSecure client;

int vibration_pin = 4;
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

#define LED_PIN 13
bool blinkState = false;

// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastTime = 0;
unsigned long timerDelay = 5000;

int averages[6];

long readData() {
  delay(10);
  long measurement = pulseIn(vibration_pin, HIGH);

  return measurement;
}

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
  pinMode(vibration_pin, INPUT);

  Serial.begin(9600);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("Connecting to WiFi ..");
    delay(500);
  }

  Serial.println((String)"Connected to WiFi network with IP Address: " + WiFi.localIP().toString());

  // disable fingerprint vertification for the http client
  client.setInsecure();
  apiToken = "Bearer " + getJWTToken();
  setThresholds();

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
  //setupGyroOffsets();

  // setup readings
  setupReading();

  // setup Status
  setupStatus();

  // configure Arduino LED pin for output
  pinMode(LED_PIN, OUTPUT);
}

void loop(void) {
  accelgyro.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
  addReading(ax, ay, az, gx, gy, gz);

  //Send an HTTP POST request every 5 seconds
  if ((millis() - lastTime) > timerDelay) {
    if(WiFi.status()== WL_CONNECTED){
      // fills the averages array
      calcAverages(averages);
      // calculate the current status based on the averages
      addStatusReading(averages[0], averages[1], averages[2], averages[3], averages[4] ,averages[5]);

      HTTPClient http;
      http.begin(client, api);
      http.addHeader("Authorization", apiToken);
      http.addHeader("Content-Type", "application/json");

      DynamicJsonDocument data(1024);
      data["status"] = getCurrentStatus(); 

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
        data["accel_x"] = averages[0];
        data["accel_y"] = averages[1];
        data["accel_z"] = averages[2];
        data["gyro_x"] = averages[3];
        data["gyro_y"] = averages[4];
        data["gyro_z"] = averages[5];
        data["status"] = getCurrentStatus(); 

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
  
  // blink LED to indicate activity
  blinkState = !blinkState;
  digitalWrite(LED_PIN, blinkState);
  delay(10);
}