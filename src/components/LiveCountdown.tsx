import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Calendar } from 'lucide-react';

interface LiveCountdownProps {
  startDateString: string;
}

export default function LiveCountdown({ startDateString }: LiveCountdownProps) {
  const [timePassed, setTimePassed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      // Base date in Brasília Time (UTC-3)
      const startString = startDateString.includes('T') ? startDateString : `${startDateString}T00:00:00-03:00`;
      const start = new Date(startString);
      if (isNaN(start.getTime())) return;

      const now = new Date();
      const diffMs = now.getTime() - start.getTime();

      if (diffMs < 0) {
        setTimePassed({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: 0 });
        return;
      }

      // Total Days calculation
      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      // Precise Calendar Breakdown in Brasília Timezone (UTC-3)
      const getBrasiliaParts = (date: Date) => {
        try {
          const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: "America/Sao_Paulo",
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false
          });
          const parts = formatter.formatToParts(date);
          const getVal = (type: string) => parseInt(parts.find(p => p.type === type)?.value || "0", 10);
          return {
            year: getVal("year"),
            month: getVal("month"),
            day: getVal("day"),
            hour: getVal("hour"),
            minute: getVal("minute"),
            second: getVal("second")
          };
        } catch (e) {
          // Safe fallback to manual UTC-3 shift
          const utc = date.getTime() + date.getTimezoneOffset() * 60000;
          const brTime = new Date(utc - 3600000 * 3);
          return {
            year: brTime.getUTCFullYear(),
            month: brTime.getUTCMonth() + 1,
            day: brTime.getUTCDate(),
            hour: brTime.getUTCHours(),
            minute: brTime.getUTCMinutes(),
            second: brTime.getUTCSeconds()
          };
        }
      };

      const startParts = getBrasiliaParts(start);
      const nowParts = getBrasiliaParts(now);

      let years = nowParts.year - startParts.year;
      let months = nowParts.month - startParts.month;
      let days = nowParts.day - startParts.day;
      let hours = nowParts.hour - startParts.hour;
      let minutes = nowParts.minute - startParts.minute;
      let seconds = nowParts.second - startParts.second;

      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        // Days in the previous month of nowParts
        const prevMonth = nowParts.month === 1 ? 12 : nowParts.month - 1;
        const prevYear = nowParts.month === 1 ? nowParts.year - 1 : nowParts.year;
        const daysInPrevMonth = new Date(prevYear, prevMonth, 0).getDate();
        days += daysInPrevMonth;
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      setTimePassed({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
        totalDays
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [startDateString]);

  const units = [
    { label: 'Anos', value: timePassed.years },
    { label: 'Meses', value: timePassed.months },
    { label: 'Dias', value: timePassed.days },
    { label: 'Horas', value: timePassed.hours },
    { label: 'Minutos', value: timePassed.minutes },
    { label: 'Segundos', value: timePassed.seconds }
  ];

  return (
    <div id="live-countdown-container" className="flex flex-col items-center">
      {/* Total Days Tag */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D9383A]/5 border border-[#D9383A]/20 text-[#D9383A] text-xs font-mono mb-8 uppercase tracking-widest font-semibold"
      >
        <Calendar className="w-4 h-4" />
        <span>{timePassed.totalDays.toLocaleString()} Dias Juntos e Contando...</span>
      </motion.div>

      {/* Grid boxes for units */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 w-full max-w-4xl">
        {units.map((unit, idx) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="flex flex-col items-center p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-[0_10px_30px_rgba(28,26,23,0.03)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-300"
          >
            <motion.span
              key={unit.value}
              initial={{ scale: 0.85, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="text-3xl sm:text-4xl font-serif font-bold text-[#C49A6C]"
            >
              {String(unit.value).padStart(2, '0')}
            </motion.span>
            <span className="text-[10px] text-stone-400 dark:text-stone-500 font-mono uppercase tracking-widest mt-2 font-medium transition-colors">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Secondary micro text */}
      <div className="mt-8 flex items-center gap-1.5 text-[10px] text-stone-400 font-mono tracking-widest uppercase">
        <Clock className="w-3.5 h-3.5 animate-spin text-[#C49A6C]" style={{ animationDuration: '4s' }} />
        <span>Tempo atualizado em tempo real</span>
      </div>
    </div>
  );
}
