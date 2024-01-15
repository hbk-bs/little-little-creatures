#ifndef LITTLECREATURE_H
#define LITTLECREATURE_H
#include <Arduino.h>
#include "WiFiS3.h"
#include "arduino_secrets.h"
#include "utils.h"

struct LittleCreature_Options
{
  String creature_name = "little-creature";
  String ssid = "openWrt";
  String password = "";
  String host = "cypberdeck.local";
};

class LittleCreature
{
public:
  LittleCreature();
  void begin();
  void begin(LittleCreature_Options options);
  void postRequest(std::vector<double> measurements);
  void incomingRequest();

private:
  String server = "";
  String ssid = "";
  String password = "";
  String creature_name = "";
};
#endif