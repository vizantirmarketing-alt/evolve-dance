export interface DanceClass {
  id: number
  style: string
  level: '1' | '2' | '3'
  ageMin: number
  ageMax: number
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'
  time: string
  instructor: string
  spots: number
}
