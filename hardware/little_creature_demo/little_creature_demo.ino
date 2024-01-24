#include "littlecreature.h"
#include "arduino_secrets.h"
#include "Adafruit_Debounce.h"
#define WAKE_PIN 2
LittleCreature creature;
LittleCreature_Options opts;
// unsigned long previous_millis = 0; // keeping track of time
// unsigned long interval = 1000;     // 1 seconds
Adafruit_Debounce button(WAKE_PIN, HIGH);
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  while (!Serial) {
    ;
  }
  opts.creature_name = "little-creature";
  opts.host = "little-creatures-demo-server-white-firefly-6363.fly.dev";
  opts.ssid = SECRET_SSID;
  opts.password = SECRET_PASS;
  creature.begin(opts);
}

void loop() {
  // unsigned long current_millis = millis(); // Keeping track of time.
  button.update();
  if (button.justPressed()) {
    sendData(1, 0, 0);
  }

  if (button.justReleased()) {
    sendData(0, 0, 0);
  }


  // if (current_millis - previous_millis >= interval)
  // {
  //   int reading = digitalRead(inputPin);
  //   // Serial.println(reading);
  //   creature.postRequest(std::vector<double>{

  //       (double)reading,
  //   });
  //   // Set the previous_millis to the current_millis
  //   // so we can keep track of the interval.
  //   previous_millis = current_millis;
  // }
}

void sendData(int wake_up, int reset_game, int trigger) {
  creature.postRequest(std::vector<double>{
    (double)wake_up,
    (double)reset_game,
    (double)trigger,
  });
  Serial.print(wake_up);
  Serial.print(" ");
  Serial.print(reset_game);
  Serial.print(" ");
  Serial.println(trigger);
}
