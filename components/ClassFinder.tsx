'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
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

export default function ClassFinder({ surface = 'dark' }: { surface?: 'dark' | 'light' }) {
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

  const isLight = surface === 'light'
  const headingClass = isLight ? 'text-[#1F1F1C]' : 'text-[#f0faf8]'
  const bodyMuted = isLight ? 'text-[#6D6C67]' : 'text-[#e2e8f0]'

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 md:px-12">
      <h2 className={cn('font-display text-[clamp(28px,3.5vw,42px)] font-bold leading-tight', headingClass)}>
        Find your class
      </h2>

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
        surface={surface}
      />

      <p className={cn('text-[14px] leading-[1.7] md:text-[15px]', bodyMuted)}>{countLabel}</p>

      {filtered.length === 0 ? (
        <p className={cn('text-[15px] md:text-[16px]', bodyMuted)}>No classes match — try different filters</p>
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
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
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
                  surface={surface}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
