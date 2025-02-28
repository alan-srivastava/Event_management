import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Search, X, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: any[];
  imageUrl?: string;
  creator: {
    _id: string;
    name: string;
  };
}

// Sample past events with images
const samplePastEvents = [
  {
    _id: '1',
    title: 'Web Development Conference',
    description: 'A conference for web developers to learn about the latest technologies and best practices.',
    date: '2023-11-15',
    time: '09:00 AM',
    location: 'San Francisco, CA',
    attendees: Array(120).fill(null),
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    creator: {
      _id: '65f1a2b3c4d5e6f7a8b9c0d1',
      name: 'John Doe'
    }
  },
  {
    _id: '2',
    title: 'Digital Marketing Summit',
    description: 'Learn from industry experts about the latest digital marketing strategies and tools.',
    date: '2023-12-05',
    time: '10:00 AM',
    location: 'New York, NY',
    attendees: Array(200).fill(null),
    imageUrl: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    creator: {
      _id: '65f1a2b3c4d5e6f7a8b9c0d2',
      name: 'Jane Smith'
    }
  },
  {
    _id: '3',
    title: 'Startup Networking Event',
    description: 'Connect with founders, investors, and industry professionals in the startup ecosystem.',
    date: '2024-01-20',
    time: '06:00 PM',
    location: 'Austin, TX',
    attendees: Array(150).fill(null),
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    creator: {
      _id: '65f1a2b3c4d5e6f7a8b9c0d1',
      name: 'John Doe'
    }
  },
  {
    _id: '4',
    title: 'Data Science Workshop',
    description: 'Hands-on workshop covering data analysis, machine learning, and AI applications.',
    date: '2024-02-10',
    time: '09:30 AM',
    location: 'Seattle, WA',
    attendees: Array(80).fill(null),
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    creator: {
      _id: '65f1a2b3c4d5e6f7a8b9c0d2',
      name: 'Jane Smith'
    }
  },
  {
    _id: '5',
    title: 'UX/UI Design Conference',
    description: 'Explore the latest trends and techniques in user experience and interface design.',
    date: '2024-03-15',
    time: '10:00 AM',
    location: 'Chicago, IL',
    attendees: Array(100).fill(null),
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    creator: {
      _id: '65f1a2b3c4d5e6f7a8b9c0d1',
      name: 'John Doe'
    }
  },
  {
    _id: '6',
    title: 'Blockchain & Cryptocurrency Summit',
    description: 'Dive into the world of blockchain technology and cryptocurrency with industry leaders.',
    date: '2024-04-05',
    time: '11:00 AM',
    location: 'Miami, FL',
    attendees: Array(180).fill(null),
    imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    creator: {
      _id: '65f1a2b3c4d5e6f7a8b9c0d2',
      name: 'Jane Smith'
    }
  }
];

const PastEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // In a real app, this would be replaced with actual API data
        // For demo purposes, we'll use sample data
        setEvents(samplePastEvents);
        setError(null);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on search term
  const filteredEvents = events.filter(event => {
    return event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           event.location.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Past Events</h1>
          <p className="text-gray-400 mt-1">Browse our previous successful events</p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search past events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10 py-2.5 rounded-lg bg-gray-800/70 border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors w-full"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-3"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-300" />
            </button>
          )}
        </div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="p-6 rounded-xl bg-red-900/30 border border-red-700 text-center">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="p-8 rounded-xl bg-gray-800/50 backdrop-blur border border-gray-700 text-center">
          <h3 className="text-xl font-semibold mb-2">No past events found</h3>
          <p className="text-gray-400">Try adjusting your search or check back later.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur border border-gray-700/50 hover:border-gray-600/50 transition-all shadow-lg hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.imageUrl || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              </div>
              <div className="p-6 flex-grow">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">{event.title}</h2>
                <p className="text-gray-400 mb-4 line-clamp-2">{event.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{format(new Date(event.date), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <span className="text-sm truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">{event.attendees.length} attended</span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <Link 
                  to={`/events/${event._id}`}
                  className="block w-full py-2 text-center rounded-lg bg-gray-700 hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PastEvents;