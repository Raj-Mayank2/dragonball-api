from enum import Enum


class Gender(str, Enum):
    MALE = "MALE"
    FEMALE = "FEMALE"
    UNKNOWN = "UNKNOWN"


class Status(str, Enum):
    ALIVE = "ALIVE"
    DEAD = "DEAD"
    UNKNOWN = "UNKNOWN"


class Species(str, Enum):
    HUMAN = "HUMAN"
    SAIYAN = "SAIYAN"
    HALF_SAIYAN = "HALF_SAIYAN"
    NAMEKIAN = "NAMEKIAN"
    FROST_DEMON = "FROST_DEMON"
    BIO_ANDROID = "BIO_ANDROID"
    MAJIN = "MAJIN"
    GOD_OF_DESTRUCTION = "GOD_OF_DESTRUCTION"
    ANDROID = "ANDROID"
    ANGEL = "ANGEL"
    KAI = "KAI"
    OTHER = "OTHER"