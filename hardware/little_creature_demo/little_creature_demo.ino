#include "littlecreature.h"
int inputPin = 2;
LittleCreature creature;
LittleCreature_Options opts;
unsigned long previous_millis = 0;  // keeping track of time
unsigned long interval = 1000;     // 1 seconds
void setup() {
  pinMode(inputPin, INPUT_PULLUP);
  // put your setup code here, to run once:
  Serial.begin(9600);
  while (!Serial) { ; }
  opts.creature_name = "little-creature";
  creature.begin(opts);
}

void loop() {
  unsigned long current_millis = millis();  // Keeping track of time.
  if (current_millis - previous_millis >= interval) {
    int reading = digitalRead(inputPin);
    //Serial.println(reading);
    creature.postRequest(std::vector<double>{
      (double)random(0, 1023),
      (double)random(0, 1023),
      (double)reading,
    });
    // Set the previous_millis to the current_millis 
    // so we can keep track of the interval.
    previous_millis = current_millis;  
  }
}
