import { Input } from '@pancakeswap/uikit'
import { useState } from 'react'

interface Props {
  value: Date
  min?: Date
  max?: Date
  onChange: (date: Date) => void
}

// Simple date picker based on html input type="date-time-local"
export default function DatePicker({ value, onChange, min, max }: Props) {
  const [date, setDate] = useState(value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value)
    setDate(newDate)
    onChange(newDate)
  }
  const newDate = new Date(date)
  newDate.setMinutes(date.getMinutes() - date.getTimezoneOffset())

  let newMin: Date | undefined
  if (min) {
    newMin = new Date(min)
    newMin.setMinutes(min.getMinutes() - min.getTimezoneOffset())
  }

  let newMax: Date | undefined
  if (max) {
    newMax = new Date(max)
    newMax.setMinutes(max.getMinutes() - max.getTimezoneOffset())
  }

  return (
    <Input
      pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
      type="datetime-local"
      defaultValue={newDate.toISOString().slice(0, 16)}
      min={newMin?.toISOString().slice(0, 16)}
      max={newMax?.toISOString().slice(0, 16)}
      onChange={handleChange}
    />
  )
}
