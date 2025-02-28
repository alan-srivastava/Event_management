import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ArrowLeft, Share2, Heart, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';

// Sample event data (would be fetched from API in a real app)
const eventData = {
  _id: '7',
  title: 'AI & Machine Learning Summit',
  description: 'Join leading AI researchers and practitioners to explore the latest advancements in machine learning and artificial intelligence. This summit will feature keynote presentations, panel discussions, and hands-on workshops covering topics such as deep learning, natural language processing, computer vision, and ethical AI.\n\nNetwork with industry leaders and academic experts while gaining insights into cutting-edge AI technologies and their real-world applications. Whether you\'re a seasoned AI professional or just starting your journey in machine learning, this event offers valuable learning and networking opportunities.',
  date: '2024-07-15',
  time: '10:00 AM',
  location: 'Boston Convention Center, 415 Summer St, Boston, MA 02210',
  maxAttendees: 500,
  attendees: Array(80).fill(null),
  imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  creator: {
    _id: '65f1a2b3c4d5e6f7a8b9c0d1',
    name: 'John Doe'
  },
  agenda: [
    { time: '10:00 AM', title: 'Registration & Welcome Coffee' },
    { time: '10:30 AM', title: 'Opening Keynote: The Future of AI' },
    { time: '11:30 AM', title: 'Panel Discussion: Ethical Considerations in AI' },
    { time: '12:30 PM', title: 'Lunch Break & Networking' },
    { time: '1:30 PM', title: 'Workshop: Practical Applications of Machine Learning' },
    { time: '3:00 PM', title: 'Coffee Break' },
    { time: '3:30 PM', title: 'Technical Deep Dive: Neural Networks' },
    { time: '4:30 PM', title: 'Closing Remarks & Networking Reception' }
  ],
  speakers: [
    { name: 'Dr. Sarah Johnson', role: 'AI Research Director, Tech University', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
    { name: 'Michael Chen', role: 'Chief Data Scientist, AI Innovations', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
    { name: 'Dr. James Wilson', role: 'Professor of Computer Science', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' }
  ]
};

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState(eventData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  
  const { user } = useAuth();
  
  useEffect(() => {
    // In a real app, this would fetch the event data from the API
    // For demo purposes, we're using the sample data
    setLoading(false);
  }, [id]);
  
  const handleRegister = async () => {
    if (!user) return;
    
    try {
      setRegistering(true);
      // In a real app, this would call the API
      // await eventApi.register(id, user.id);
      
      // For demo purposes, we'll just set registered to true
      setTimeout(() => {
        setRegistered(true);
        setRegistering(false);
      }, 1000);
    } catch (err) {
      console.error('Failed to register for event:', err);
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-xl bg-red-900/30 border border-red-700 text-center">
        <p>{error}</p>
        <Link 
          to="/events" 
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <Link 
          to="/events" 
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/70 hover:bg-gray-700/70 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>
        
        {user && user.id === event.creator._id && (
          <div className="flex gap-2">
            <Link 
              to={`/edit-event/${event._id}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600/80 hover:bg-blue-700/80 transition-colors"
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Link>
            <button 
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-700/80 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
      
      <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{event.title}</h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              <span>{format(new Date(event.date), 'MMMM dd, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-400" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-400" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-xl bg-gray-800/50 backdrop-blur border border-gray-700/50"
          >
            <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
            <div className="text-gray-300 space-y-4">
              {event.description.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-xl bg-gray-800/50 backdrop-blur border border-gray-700/50"
          >
            <h2 className="text-2xl font-semibold mb-4">Event Schedule</h2>
            <div className="space-y-4">
              {event.agenda.map((item, index) => (
                <div 
                  key={index}
                  className="flex gap-4 p-4 rounded-lg bg-gray-800/70 hover:bg-gray-700/70 transition-colors"
                >
                  <div className="w-24 flex-shrink-0 font-medium text-blue-400">{item.time}</div>
                  <div>{item.title}</div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-xl bg-gray-800/50 backdrop-blur border border-gray-700/50"
          >
            <h2 className="text-2xl font-semibold mb-4">Speakers</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {event.speakers.map((speaker, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-800/70"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
                    <img 
                      src={speaker.image} 
                      alt={speaker.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold">{speaker.name}</h3>
                  <p className="text-sm text-gray-400">{speaker.role}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-gray-800/50 backdrop-blur border border-gray-700/50 sticky top-24"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                <span>{event.attendees.length} attending</span>
              </div>
              <div className="text-sm text-gray-400">
                {event.maxAttendees - event.attendees.length} spots left
              </div>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${(event.attendees.length / event.maxAttendees) * 100}%` }}
              ></div>
            </div>
            
            {user ? (
              registered ? (
                <button
                  className="w-full py-3 rounded-lg bg-green-600 text-white font-medium flex items-center justify-center gap-2 cursor-default"
                >
                  <Calendar className="h-5 w-5" />
                  You're Registered
                </button>
              ) : (
                <button
                  onClick={handleRegister}
                  disabled={registering}
                  className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {registering ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Registering...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="h-5 w-5" />
                      <span>Register for Event</span>
                    </>
                  )}
                </button>
              )
            ) : (
              <Link
                to="/login"
                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Calendar className="h-5 w-5" />
                <span>Login to Register</span>
              </Link>
            )}
            
            <div className="flex mt-4 gap-2">
              <button className="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
                <Heart className="h-4 w-4" />
                <span>Save</span>
              </button>
              <button className="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h3 className="font-medium mb-3">Organized by</h3>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">{event.creator.name}</div>
                  <div className="text-sm text-gray-400">Event Organizer</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;