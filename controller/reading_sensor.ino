#include <U8g2lib.h>
#include <Wire.h>
U8G2_SSD1306_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, /* reset=*/U8X8_PIN_NONE, /* clock=*/22, /* data=*/21);
int vibration_pin = 4;

void u8g2_prepare() {
  u8g2.setFont(u8g2_font_7x13_tf);
  u8g2.setFontRefHeightExtendedText();
  u8g2.setDrawColor(1);
  u8g2.setFontPosTop();
  u8g2.setFontDirection(0);
}

void helloWord() {
  u8g2.setFontDirection(0);
  u8g2.drawStr(0, 0, "Hello World!");
}

long TP_init() {
  delay(10);
  long measurement=pulseIn(vibration_pin, HIGH);

  return measurement;
}

void setup(void) {
  u8g2.begin();
  u8g2_prepare();
  pinMode(vibration_pin, INPUT);
  Serial.begin(9600);
}

void loop(void) {
  int val;
  val = digitalRead(vibration_pin);
  long measurement = TP_init();

  Serial.println(measurement);
  u8g2.clearBuffer();
  u8g2_prepare();
  helloWord();
  u8g2.drawStr(10, 10, convertIntegerToChar(measurement));
  u8g2.sendBuffer();
}

char* convertIntegerToChar(long N)
{
 
    int m = N;
    int digit = 0;
    while (m) {
        digit++;
        m /= 10;
    }
 
    char* arr;
    char arr1[digit];
    arr = (char*)malloc(digit);

    int index = 0;
    while (N) {
        arr1[++index] = N % 10 + '0';
        N /= 10;
    }
 
    int i;
    for (i = 0; i < index; i++) {
        arr[i] = arr1[index - i];
    }
    arr[i] = '\0';
    return (char*)arr;
}