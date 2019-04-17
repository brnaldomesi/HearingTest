/**
constants file that defines how the test
works and is constrained
**/
export const LEFT_EAR = 'L'
export const RIGHT_EAR = 'R'

export const MAX_DECIBELS = 75
export const MIN_DECIBELS = 30

export const SOUND_FAIL = 5
export const SOUND_SUCCESS = -10
/**
used to configure the test and get a baseline of user
hearing results
**/
export const START_DECIBELS = 30;
export const CONFIGURE_FAIL = 15;

export const REPEATS_NEEDED = 2

export const TIME_TO_RESPOND = 1250; // 1.25 seconds
export const RANDOM_TIME_MIN = 1750; // 1.75 seconds
export const RANDOM_TIME_MAX = 3500; // 3.5 seconds
/**
used to generate the random interval between testing sounds
**/
export function generateRandomTimeBetweenSounds() {
  return (Math.random() * (RANDOM_TIME_MIN - RANDOM_TIME_MAX) + RANDOM_TIME_MAX);
}
/**
hz values that the test plays
**/
export const HZDATA = [1000, 2000, 4000, 500];
