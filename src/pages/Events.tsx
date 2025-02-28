import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Search, X, Plus, Trash2, Edit } from 'lucide-react';
import { eventApi } from '../lib/api';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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

// Sample upcoming events with images (will be replaced with API data)
const sampleEvents = [
  {
    _id: '7',
    title: 'AI & Machine Learning Summit',
    description: 'Join leading AI researchers and practitioners to explore the latest advancements in machine learning and artificial intelligence.',
    date: '2024-07-15',
    time: '10:00 AM',
    location: 'Boston, MA',
    attendees: Array(80).fill(null),
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    creator: {
      _id: '65f1a2b3c4d5e6f7a8b9c0d1',
      name: 'John Doe'
    }
  },
  {
    _id: '8',
    title: 'Summer Music Festival',
    description: 'A three-day celebration of music featuring top artists from around the world across multiple stages.',
    date: '2024-08-20',
    time: '02:00 PM',
    location: 'Los Angeles, CA',
    attendees: Array(350).fill(null),
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    creator: {
      _id: '65f1a2b3c4d5e6f7a8b9c0d1',
      name: 'John Doe'
    }
  },
  {
    _id: '9',
    title: 'Startup Pitch Competition',
    description: 'Entrepreneurs pitch their innovative ideas to a panel of investors and industry experts for funding and mentorship.',
    date: '2024-09-05',
    time: '09:00 AM',
    location: 'San Jose, CA',
    attendees: Array(120).fill(null),
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    creator: {
      _id: '65f1a2b3c4d5e6f7a8b9c0d2',
      name: 'Jane Smith'
    }
  },
  {
    _id: '10',
    title: 'Wellness Retreat',
    description: 'A weekend of mindfulness, yoga, and wellness workshops in a beautiful natural setting.',
    date: '2024-10-12',
    time: '08:00 AM',
    location: 'Sedona, AZ',
    attendees: Array(50).fill(null),
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    creator: {
      _id: '65f1a2b3c4d5e6f7a8b9c0d2',
      name: 'Jane Smith'
    }
  },
  {
    _id: '11',
    title: 'Photography Workshop',
    description: 'Learn advanced photography techniques from professional photographers in stunning locations.',
    date: '2024-11-08',
    time: '10:00 AM',
    location: 'Portland, OR',
    attendees: Array(30).fill(null),
    imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    creator: {
      _id: '65f1a2b3c4d5e6f7a8b9c0d1',
      name: 'John Doe'
    }
  },
  {
    _id: '12',
    title: 'Winter Tech Conference',
    description: 'The premier winter gathering for technology professionals featuring keynotes, workshops, and networking.',
    date: '2024-12-15',
    time: '09:30 AM',
    location: 'Denver, CO',
    attendees: Array(200).fill(null),
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    creator: {
      _id: '65f1a2b3c4d5e6f7a8b9c0d1',
      name: 'John Doe'
    }
  }
];

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // In a real app, this would be replaced with actual API data
        // const data = await eventApi.getAll();
        // For demo purposes, we'll use sample data
        
        // Check if there's a new event in localStorage (from CreateEvent page)
        const newEventJson = localStorage.getItem('newEvent');
        if (newEventJson) {
          const newEvent = JSON.parse(newEventJson);
          // Add the new event to the sample events
          setEvents([newEvent, ...sampleEvents]);
          // Clear the localStorage
          localStorage.removeItem('newEvent');
        } else {
          setEvents(sampleEvents);
        }
        
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

  // Filter events based on search term and category
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // For demo purposes, we're not actually filtering by category since our model doesn't have categories
    return matchesSearch;
  });

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    
    try {
      setDeleting(true);
      // In a real app, this would call the API
      // await eventApi.delete(deleteId);
      
      // For demo purposes, we'll just filter the events
      setEvents(events.filter(event => event._id !== deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (err) {
      console.error('Failed to delete event:', err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">All Events</h1>
          <p className="text-gray-400 mt-1">Browse upcoming and past events</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
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
          <Link 
            to="/create-event"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Create Event</span>
          </Link>
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
          <h3 className="text-xl font-semibold mb-2">No events found</h3>
          <p className="text-gray-400">Try adjusting your search or check back later for new events.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur border border-gray-700/50 hover:border-blue-500/50 transition-all shadow-lg hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.imageUrl || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                {user && user.id === event.creator._id && (
                  <div className="absolute top-0 right-0 p-3 flex gap-2">
                    <button 
                      onClick={() => handleDeleteClick(event._id)}
                      className="p-1.5 rounded-full bg-red-600/80 hover:bg-red-700/80 backdrop-blur-sm transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <Link 
                      to={`/edit-event/${event._id}`}
                      className="p-1.5 rounded-full bg-blue-600/80 hover:bg-blue-700/80 backdrop-blur-sm transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                  </div>
                )}
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
                    <span className="text-sm">{event.attendees.length} attending</span>
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-4">Delete Event</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this event? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors flex items-center gap-2"
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Events;