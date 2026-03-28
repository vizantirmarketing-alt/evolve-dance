import type { DanceClass } from '@/types/class'

/**
 * Seed data derived from the homepage schedule preview (`HomeSections` scheduleData).
 * Replace with your full dataset when you have the exact array from your source of truth.
 */
export const classes: DanceClass[] = [
  {
    id: 1,
    style: 'Combo — Tap + Ballet',
    level: '1',
    ageMin: 2,
    ageMax: 5,
    day: 'Monday',
    time: '4:00 PM',
    instructor: 'Miss Ashley',
    spots: 6,
  },
  {
    id: 2,
    style: 'Ballet',
    level: '2',
    ageMin: 6,
    ageMax: 8,
    day: 'Monday',
    time: '4:45 PM',
    instructor: 'Miss Rebeca',
    spots: 4,
  },
  {
    id: 3,
    style: 'Hip Hop',
    level: '1',
    ageMin: 7,
    ageMax: 10,
    day: 'Monday',
    time: '5:30 PM',
    instructor: 'Mr. Marcus',
    spots: 0,
  },
  {
    id: 4,
    style: 'Jazz',
    level: '3',
    ageMin: 10,
    ageMax: 13,
    day: 'Monday',
    time: '6:15 PM',
    instructor: 'Miss Danielle',
    spots: 5,
  },
  {
    id: 5,
    style: 'Contemporary',
    level: '3',
    ageMin: 14,
    ageMax: 18,
    day: 'Monday',
    time: '7:00 PM',
    instructor: 'Miss Rebeca',
    spots: 3,
  },
  {
    id: 6,
    style: 'Ballet — Invite Only',
    level: '3',
    ageMin: 16,
    ageMax: 18,
    day: 'Monday',
    time: '7:45 PM',
    instructor: 'Miss Rebeca',
    spots: 0,
  },
]
