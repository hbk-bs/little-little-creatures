#ifndef LITTLECREATURE_H
#define LITTLECREATURE_H
#include <Arduino.h>
#include "WiFiS3.h"
#include "arduino_secrets.h"
#include "utils.h"

struct LittleCreature_Options {
  String creature_name = "little-creature"; // unused
  String ssid = ""; // unused
  String password = ""; // unused
};

class LittleCreature {
public:
  LittleCreature();
  void begin();
  void begin(LittleCreature_Options options);
  void postRequest(std::vector<double> measurements);
  void incomingRequest();


private:
  String ssid = SECRET_SSID;
  String password = SECRET_PASS;
  String creature_name = "little-creature";
};
#endif