#include "utils.h"
String clear_pad(double val)
{
  std::ostringstream oss;
  oss << std::setprecision(8) << std::noshowpoint << val;
  std::string str = oss.str();
  return str.c_str();
}