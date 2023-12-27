/*
  MAX31865 - ESP32
  VIN - 3V3
  GND - GND
  3V3 -
  CLK - VSPI_CLK (GPIO18)
  SDO - VSPI_MISO (GPIO19)
  SDI - VSPI_MOSI (GPIO23)
  CS  - VSPI_SS (GPIO5)
  RDY -
  PT100 3Wire - MAX31865
  WBlue - F+
  WBlue - RTD+
  WRed  - RTD-
      - F-
  Nota:
  WBlue <- ~102Ω -> WRed
  WBlue <- ~2Ω -> WBlue
  Cortar unión entre contacto 24-3 sobre Rref
*/

#include <Adafruit_MAX31865.h>

// Use software SPI: CS, DI, DO, CLK
Adafruit_MAX31865 thermo = Adafruit_MAX31865(5, 23, 19, 18);
// use hardware SPI, just pass in the CS pin
//Adafruit_MAX31865 max = Adafruit_MAX31865(10);

// The value of the Rref resistor. Use 430.0 for PT100 and 4300.0 for PT1000
#define RREF      430.0
// The 'nominal' 0-degrees-C resistance of the sensor
// 100.0 for PT100, 1000.0 for PT1000
#define RNOMINAL  100.0

#define WINDOW_SIZE 128
int16_t results[WINDOW_SIZE] = {0};
int current_result = 0;

volatile float Temperatura;

void setup() {
  Serial.begin(115200);
  Serial.println("Adafruit MAX31865 PT100 Sensor Test!");

  thermo.begin(MAX31865_2WIRE);  // set to 3WIRE or 4WIRE as necessary
}


void loop() {

  int time = millis();
  uint16_t rtd = thermo.readRTD();

  Temperatura = (thermo.temperature(RNOMINAL, RREF));
  Temperatura = (Temperatura - 1.52); //correccion de temperatura
  Serial.print("Temperatura: ");
  Serial.print(Temperatura);
  Serial.print(" °C");
  Serial.println("");


  int d = (1000 / 16) - (millis() - time);
  if (d > 0) {
    delay(d);
  }
}
