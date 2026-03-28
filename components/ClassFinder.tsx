'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ClassFinderFilters from './ClassFinderFilters'
import ClassCard from './ClassCard'
import { classes } from '@/data/classes'
import type { DanceClass } from '@/types/class'

const LEVEL_TO_CODE: Record<string, DanceClass['level'] | null> = {
  All: null,
  Beginner: '1',
  Intermediate: '2',
  Advanced: '3',
}

function matchesFilters(
  c: DanceClass,
  selectedStyle: string,
  selectedDay: string,
  selectedLevel: string,
  selectedAge: number
): boolean {
  if (selectedStyle !== 'All' && c.style !== selectedStyle) return false
  if (selectedDay !== 'All' && c.day !== selectedDay) return false

  if (selectedLevel !== 'All') {
    const code = LEVEL_TO_CODE[selectedLevel]
    if (code !== null && code !== undefined && c.level !== code) return false
  }

  if (selectedAge !== 0 && (selectedAge < c.ageMin || selectedAge > c.ageMax)) {
    return false
  }

  return true
}

const styleOptions = [
  'All',
  ...Array.from(new Set(classes.map((c) => c.style))),
]

const dayOptions = [
  'All',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const levelOptions = ['All', 'Beginner', 'Intermediate', 'Advanced']

export default function ClassFinder() {
  const [selectedStyle, setSelectedStyle] = useState('All')
  const [selectedDay, setSelectedDay] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [selectedAge, setSelectedAge] = useState(0)

  const hasActiveFilters =
    selectedStyle !== 'All' ||
    selectedDay !== 'All' ||
    selectedLevel !== 'All' ||
    selectedAge !== 0

  const filtered = classes.filter((c) =>
    matchesFilters(c, selectedStyle, selectedDay, selectedLevel, selectedAge)
  )

  const handleReset = () => {
    setSelectedStyle('All')
    setSelectedDay('All')
    setSelectedLevel('All')
    setSelectedAge(0)
  }

  const count = filtered.length
  const countLabel =
    count === 1 ? '1 class found' : `${count} classes found`

  return (
    <div className="flex flex-col gap-10 px-6 py-16 md:px-12 max-w-7xl mx-auto">
      <h1 className="font-display text-[clamp(32px,5vw,52px)] font-bold text-[#f0faf8] leading-tight">
        Find your class
      </h1>

      <ClassFinderFilters
        styleOptions={styleOptions}
        dayOptions={dayOptions}
        levelOptions={levelOptions}
        selectedStyle={selectedStyle}
        selectedDay={selectedDay}
        selectedLevel={selectedLevel}
        selectedAge={selectedAge}
        onStyleChange={setSelectedStyle}
        onDayChange={setSelectedDay}
        onLevelChange={setSelectedLevel}
        onAgeChange={setSelectedAge}
        onReset={handleReset}
        hasActiveFilters={hasActiveFilters}
      />

      <p className="text-sm text-[#5C7A74]">{countLabel}</p>

      {filtered.length === 0 ? (
        <p className="text-[15px] text-[#5C7A74]">
          No classes match — try different filters
        </p>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filtered.map((c, index) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
              >
                <ClassCard
                  style={c.style}
                  level={c.level}
                  ageMin={c.ageMin}
                  ageMax={c.ageMax}
                  day={c.day}
                  time={c.time}
                  instructor={c.instructor}
                  spots={c.spots}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
