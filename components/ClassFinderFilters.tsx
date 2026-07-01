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
  /** `light` = cream page (classes). Default matches original dark finder. */
  surface?: 'dark' | 'light'
}

function Pill({
  children,
  active,
  onClick,
  surface,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
  surface: 'dark' | 'light'
}) {
  const inactive =
    surface === 'light'
      ? 'border border-[#D6DFDA] bg-white text-[#1F1F1C] hover:border-[#0ABAB5]/50'
      : 'border border-[rgba(10,186,181,0.12)] bg-[#111916] text-[#94a3b8]'
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-4 py-3 text-[12px] font-medium transition-colors md:text-[13px]',
        active ? 'border-[#0ABAB5] bg-[#0ABAB5] text-black' : inactive
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
  surface = 'dark',
}: ClassFinderFiltersProps) {
  const labelClass = surface === 'light' ? 'text-[#6D6C67]' : 'text-[#94a3b8]'
  const rangeTrack = surface === 'light' ? 'bg-[#D6DFDA]' : 'bg-[#111916]'

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        {styleOptions.map((style) => (
          <Pill
            key={style}
            active={selectedStyle === style}
            surface={surface}
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
            surface={surface}
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
            surface={surface}
            onClick={() => onLevelChange(level)}
          >
            {level}
          </Pill>
        ))}
      </div>

      <div className="flex max-w-md flex-col gap-3">
        <label className={cn('text-[11px] font-medium tracking-[0.15em] md:text-[12px]', labelClass)}>
          {selectedAge === 0 ? 'All ages' : `Age: ${selectedAge}`}
        </label>
        <input
          type="range"
          min={0}
          max={18}
          step={1}
          value={selectedAge}
          onChange={(e) => onAgeChange(Number(e.target.value))}
          className={cn(
            'h-2 w-full cursor-pointer appearance-none rounded-full accent-[#0ABAB5]',
            rangeTrack
          )}
        />
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className="self-start text-[11px] font-medium uppercase tracking-wider text-teal-hover border-b border-[rgba(10,186,181,0.35)] pb-0.5 hover:border-[#0ABAB5] transition-colors md:text-[12px]"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}
