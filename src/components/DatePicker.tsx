import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface DatePickerProps {
    selectedDates: string[];
    onDatesChange: (dates: string[]) => void;
}

export default function DatePicker({ selectedDates, onDatesChange }: DatePickerProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const formatDate = (year: number, month: number, day: number): string => {
        const m = String(month + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        return `${year}-${m}-${d}`;
    };

    const formatDisplayDate = (dateStr: string): string => {
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const isPastDate = (year: number, month: number, day: number): boolean => {
        const date = new Date(year, month, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const handleDateClick = (dateStr: string, isPast: boolean) => {
        if (isPast) return;

        if (selectedDates.includes(dateStr)) {
            // Remove date if already selected
            onDatesChange(selectedDates.filter(d => d !== dateStr));
        } else {
            // Add date to selection
            onDatesChange([...selectedDates, dateStr].sort());
        }
    };

    const removeDate = (dateStr: string) => {
        onDatesChange(selectedDates.filter(d => d !== dateStr));
    };

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);

        const days = [];

        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(
                <div key={`empty-${i}`} className="aspect-square p-2" />
            );
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = formatDate(year, month, day);
            const isPast = isPastDate(year, month, day);
            const isSelected = selectedDates.includes(dateStr);

            let bgClass = 'bg-card hover:bg-secondary/50';
            let textClass = 'text-foreground';
            let cursorClass = 'cursor-pointer';
            let borderClass = 'border border-border';

            if (isPast) {
                bgClass = 'bg-muted/30';
                textClass = 'text-muted-foreground/40';
                cursorClass = 'cursor-not-allowed';
            } else if (isSelected) {
                bgClass = 'bg-cyan-400 text-white';
                textClass = 'text-white font-semibold';
                borderClass = 'border-2 border-cyan-400';
            }

            days.push(
                <div
                    key={day}
                    onClick={() => handleDateClick(dateStr, isPast)}
                    className={`aspect-square p-2 rounded-lg transition-all ${bgClass} ${borderClass} ${cursorClass}`}
                >
                    <div className={`text-sm ${textClass} text-center`}>
                        {day}
                    </div>
                </div>
            );
        }

        return days;
    };

    return (
        <div className="relative">
            {/* Selected Dates Display */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm cursor-pointer hover:border-cyan-400 transition-colors"
            >
                {selectedDates.length === 0 ? (
                    <span className="text-muted-foreground">Select date(s)</span>
                ) : (
                    <div className="flex flex-wrap gap-1 overflow-hidden">
                        {selectedDates.slice(0, 2).map((date) => (
                            <span
                                key={date}
                                className="inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-400/10 text-cyan-400 rounded text-xs"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeDate(date);
                                }}
                            >
                                {formatDisplayDate(date)}
                                <X size={12} className="hover:text-cyan-300" />
                            </span>
                        ))}
                        {selectedDates.length > 2 && (
                            <span className="text-xs text-muted-foreground self-center">
                                +{selectedDates.length - 2} more
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Calendar Dropdown */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Calendar */}
                    <div className="absolute top-full left-0 mt-2 z-50 bg-card border border-border rounded-xl shadow-2xl p-4 w-80">
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-4">
                            <button
                                type="button"
                                onClick={handlePrevMonth}
                                className="p-2 rounded-full hover:bg-secondary transition-colors"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            <h3 className="font-serif text-lg text-foreground">
                                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                            </h3>

                            <button
                                type="button"
                                onClick={handleNextMonth}
                                className="p-2 rounded-full hover:bg-secondary transition-colors"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>

                        {/* Days of week */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {daysOfWeek.map(day => (
                                <div key={day} className="text-center text-xs font-medium text-muted-foreground uppercase">
                                    {day.slice(0, 2)}
                                </div>
                            ))}
                        </div>

                        {/* Calendar grid */}
                        <div className="grid grid-cols-7 gap-1 mb-4">
                            {renderCalendar()}
                        </div>

                        {/* Selected Dates List */}
                        {selectedDates.length > 0 && (
                            <div className="pt-3 border-t border-border">
                                <p className="text-xs text-muted-foreground mb-2">Selected Dates:</p>
                                <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                                    {selectedDates.map((date) => (
                                        <span
                                            key={date}
                                            className="inline-flex items-center gap-1 px-2 py-1 bg-cyan-400/10 text-cyan-400 rounded text-xs"
                                        >
                                            {formatDisplayDate(date)}
                                            <button
                                                type="button"
                                                onClick={() => removeDate(date)}
                                                className="hover:text-cyan-300"
                                            >
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                            <button
                                type="button"
                                onClick={() => {
                                    onDatesChange([]);
                                }}
                                className="flex-1 px-3 py-2 text-xs border border-border rounded-lg hover:bg-secondary transition-colors"
                            >
                                Clear All
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="flex-1 px-3 py-2 text-xs bg-cyan-400 text-white rounded-lg hover:bg-cyan-500 transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
