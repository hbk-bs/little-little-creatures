#ifndef LOGGER_H
#define LOGGER_H
#include <Arduino.h>

struct Logger_Options {

} class Logger {
public:
  Logger();
  void begin();
  void begin(Logger_Options options);
  void log(String message);
  void log(int message);
  void log(double message);
  void log(float message);
  void log(char message);
  void log(char[] message);
  String level;
};
#endif