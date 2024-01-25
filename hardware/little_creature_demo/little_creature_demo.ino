#include "Adafruit_Debounce.h"
#include <Arduino_JSON.h>

#define WAKE_PIN 2

Adafruit_Debounce button_wake(WAKE_PIN, LOW); // will be INPUT_PULLUP button_wake goes to ground
void setup() {
  Serial.begin(9600);
  while (!Serial) {
    ;
  }
 
  button_wake.begin();
}

void loop() {
  button_wake.update();
  if (button_wake.justPressed()) {
    sendData(1, 0, 0);
  }

  if (button_wake.justReleased()) {
    sendData(0, 0, 0);
  }


}

void sendData(int wake_up, int reset_game, int trigger) {
  JSONVar myObject;
  JSONVar myArray;


  myArray[0] = wake_up;
  myArray[1] = reset_game;
  myArray[2] = trigger;
  // you can add more values here e.g.
  // myArray[3] = something else;

  // important dont edit below this line
  myObject["measurements"] = myArray;
  myObject["channel"] = "little-creatures";
  String jsonString = JSON.stringify(myObject);
  Serial.print("data:");
  Serial.println(jsonString);
  // The above code needs to stay intact
}
