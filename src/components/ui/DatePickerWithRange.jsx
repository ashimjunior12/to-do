'use client';

import * as React from 'react';
import { addDays, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function DatePickerWithRange({ className, setDate }) {
  const [localDate, setLocalDate] = React.useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  return (
    <div className={`grid gap-2 ${className}`}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant='outline'
            className={`w-[300px] justify-start text-left font-normal ${
              !localDate && 'text-muted-foreground'
            }`}
          >
            <CalendarIcon />
            {localDate?.from ? (
              localDate.to ? (
                <>
                  {format(localDate.from, 'LLL dd, y')} -{' '}
                  {format(localDate.to, 'LLL dd, y')}
                </>
              ) : (
                format(localDate.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={localDate?.from}
            selected={localDate}
            onSelect={(newDate) => {
              setLocalDate(newDate);
              setDate(newDate); // Pass selected date to parent component
            }}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
