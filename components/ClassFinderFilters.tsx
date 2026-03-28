'use client'

import { cn } from '@/lib/utils'

export interface ClassFinderFiltersProps {
  styleOptions: string[]
  dayOptions: string[]
  levelOptions: string[]
  selectedStyle: string
  selectedDay: string
  selectedLevel: string
  selectedAge: number
  onStyleChange: (v: string) => void
  onDayChange: (v: string) => void
  onLevelChange: (v: string) => void
  onAgeChange: (v: number) => void
  onReset: () => void
  hasActiveFilters: boolean
}

function Pill({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-4 py-2 text-xs font-medium transition-colors',
        active
          ? 'bg-[#2DD4BF] text-black border border-[#2DD4BF]'
          : 'bg-[#111916] text-[#5C7A74] border border-[rgba(45,212,191,0.12)]'
      )}
    >
      {children}
    </button>
  )
}

export default function ClassFinderFilters({
  styleOptions,
  dayOptions,
  levelOptions,
  selectedStyle,
  selectedDay,
  selectedLevel,
  selectedAge,
  onStyleChange,
  onDayChange,
  onLevelChange,
  onAgeChange,
  onReset,
  hasActiveFilters,
}: ClassFinderFiltersProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        {styleOptions.map((style) => (
          <Pill
            key={style}
            active={selectedStyle === style}
            onClick={() => onStyleChange(style)}
          >
            {style}
          </Pill>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {dayOptions.map((day) => (
          <Pill
            key={day}
            active={selectedDay === day}
            onClick={() => onDayChange(day)}
          >
            {day}
          </Pill>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {levelOptions.map((level) => (
          <Pill
            key={level}
            active={selectedLevel === level}
            onClick={() => onLevelChange(level)}
          >
            {level}
          </Pill>
        ))}
      </div>

      <div className="flex flex-col gap-3 max-w-md">
        <label className="text-xs font-medium text-[#5C7A74] tracking-wide">
          {selectedAge === 0 ? 'All ages' : `Age: ${selectedAge}`}
        </label>
        <input
          type="range"
          min={0}
          max={18}
          step={1}
          value={selectedAge}
          onChange={(e) => onAgeChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[#111916] accent-[#2DD4BF]"
        />
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className="self-start text-xs font-medium uppercase tracking-wider text-[#2DD4BF] border-b border-[rgba(45,212,191,0.35)] pb-0.5 hover:border-[#2DD4BF] transition-colors"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}
