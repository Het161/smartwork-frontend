"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, MapPin, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  duration: string;
  type: 'meeting' | 'deadline' | 'reminder';
  location?: string;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');

  // Create events for current month
  const today = new Date();
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Team Standup',
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      time: '10:00 AM',
      duration: '30 mins',
      type: 'meeting',
      location: 'Conference Room A',
    },
    {
      id: 2,
      title: 'Project Deadline',
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
      time: '05:00 PM',
      duration: 'All day',
      type: 'deadline',
    },
    {
      id: 3,
      title: 'Client Call',
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
      time: '02:00 PM',
      duration: '1 hour',
      type: 'meeting',
      location: 'Zoom',
    },
    {
      id: 4,
      title: 'Code Review Session',
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
      time: '11:00 AM',
      duration: '1.5 hours',
      type: 'meeting',
      location: 'Dev Room',
    },
  ]);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const hasEvent = (day: number) => {
    return events.some(event => {
      const eventDate = event.date;
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      return (
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
      );
    });
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'deadline':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'reminder':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleAddEvent = () => {
    if (!newEventTitle.trim()) {
      toast.error('Please enter event title');
      return;
    }

    if (!selectedDate) {
      toast.error('Please select a date first');
      return;
    }

    const newEvent: Event = {
      id: events.length + 1,
      title: newEventTitle,
      date: selectedDate,
      time: '09:00 AM',
      duration: '1 hour',
      type: 'meeting',
    };

    setEvents([...events, newEvent]);
    setNewEventTitle('');
    setShowAddEvent(false);
    toast.success('Event added successfully!');
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(e => e.id !== eventId));
    toast.success('Event deleted');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <CalendarIcon className="w-10 h-10 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">
            Calendar & Schedule
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevMonth}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentDate(new Date())}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-semibold text-sm"
                >
                  Today
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextMonth}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Day Headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}

              {/* Empty cells before first day */}
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square"></div>
              ))}

              {/* Calendar days */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                const isToday =
                  day === new Date().getDate() &&
                  currentDate.getMonth() === new Date().getMonth() &&
                  currentDate.getFullYear() === new Date().getFullYear();
                const hasEventToday = hasEvent(day);
                const isSelected = 
                  selectedDate &&
                  day === selectedDate.getDate() &&
                  currentDate.getMonth() === selectedDate.getMonth() &&
                  currentDate.getFullYear() === selectedDate.getFullYear();

                return (
                  <motion.button
                    key={day}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDate(dateObj)}
                    className={`aspect-square p-2 rounded-xl font-semibold transition-all relative ${
                      isToday
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : isSelected
                        ? 'bg-blue-200 text-blue-900 ring-2 ring-blue-400'
                        : hasEventToday
                        ? 'bg-blue-100 text-blue-900 hover:bg-blue-200'
                        : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {day}
                    {hasEventToday && !isToday && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Events Sidebar */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedDate ? selectedDate.toDateString() : 'All Events'}
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddEvent(!showAddEvent)}
                className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showAddEvent ? <X className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-white" />}
              </motion.button>
            </div>

            {/* Add Event Form */}
            {showAddEvent && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200"
              >
                <input
                  type="text"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddEvent()}
                  placeholder="Event title..."
                  className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none mb-2"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddEvent}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Add Event
                </motion.button>
              </motion.div>
            )}

            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {(selectedDate ? getEventsForDate(selectedDate) : events)
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-xl border-2 ${getEventColor(event.type)} relative group`}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteEvent(event.id)}
                    className="absolute top-2 right-2 p-1 bg-white/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </motion.button>
                  
                  <div className="flex items-start justify-between mb-2 pr-6">
                    <h3 className="font-bold">{event.title}</h3>
                    <span className="text-xs px-2 py-1 bg-white/50 rounded-full capitalize">
                      {event.type}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.time} • {event.duration}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {(selectedDate ? getEventsForDate(selectedDate) : events).length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 text-gray-500"
                >
                  <CalendarIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No events scheduled</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



