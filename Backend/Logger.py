from enum import Enum


class LogLevel(Enum):
    Debug = 0
    Error = 1
    Critical = 2

def Log(lvl : LogLevel, e : Exception):
    print("Logger" + lvl + ":" + e)

def Log(lvl : LogLevel , msg : str = ""):
    print("Logger" + lvl + ":" + msg)
