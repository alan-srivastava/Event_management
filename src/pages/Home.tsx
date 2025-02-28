import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Globe, ArrowRight, LogIn, UserPlus, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, guestLogin } = useAuth();

  return (
    <div className="space-y-20">
      <section className="relative">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-60 -left-20 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500"
          >
            Create Unforgettable Events
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Your all-in-one platform for creating, managing, and discovering amazing events.
            Connect with attendees in real-time and make every moment count.
          </motion.p>

          {!user ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link to="/login" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 flex items-center justify-center gap-2">
                <LogIn className="h-5 w-5" />
                <span className="font-medium">Login</span>
                <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
              <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 flex items-center justify-center gap-2">
                <UserPlus className="h-5 w-5" />
                <span className="font-medium">Register</span>
              </Link>
              <button 
                onClick={guestLogin}
                className="px-8 py-4 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
              >
                <User className="h-5 w-5" />
                <span className="font-medium">Continue as Guest</span>
              </button>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-4"
            >
              {user.isGuest ? (
                <Link to="/past-events" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 flex items-center justify-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span className="font-medium">Browse Past Events</span>
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              ) : (
                <>
                  <Link to="/events" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 flex items-center justify-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span className="font-medium">Browse Events</span>
                    <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                  <Link to="/create-event" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 flex items-center justify-center gap-2">
                    <Users className="h-5 w-5" />
                    <span className="font-medium">Create Event</span>
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <Calendar className="h-10 w-10 text-blue-500" />,
            title: "Easy Event Creation",
            description: "Create and manage events with our intuitive tools. Set up registration, track attendance, and more."
          },
          {
            icon: <Users className="h-10 w-10 text-purple-500" />,
            title: "Real-time Updates",
            description: "Stay connected with attendees through live updates. Send notifications and get instant feedback."
          },
          {
            icon: <Globe className="h-10 w-10 text-pink-500" />,
            title: "Global Reach",
            description: "Share your events with people around the world. Our platform makes it easy to connect with audiences everywhere."
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
            className="p-8 rounded-2xl bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur border border-gray-700/50 hover:border-gray-600/50 transition-all shadow-lg hover:shadow-xl group"
          >
            <div className="p-4 rounded-xl bg-gray-800/50 w-fit mb-4 group-hover:bg-gray-700/50 transition-colors">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-semibold mt-4">{feature.title}</h3>
            <p className="text-gray-400 mt-2">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-gray-700/50">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to create your next amazing event?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of event organizers who trust our platform for their events.
          </p>
          {!user ? (
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 flex items-center justify-center gap-2">
                <UserPlus className="h-5 w-5" />
                <span className="font-medium">Get Started</span>
              </Link>
              <button 
                onClick={guestLogin}
                className="px-8 py-4 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
              >
                <User className="h-5 w-5" />
                <span className="font-medium">Continue as Guest</span>
              </button>
            </div>
          ) : (
            <div className="flex justify-center gap-4">
              {user.isGuest ? (
                <Link to="/past-events" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 flex items-center justify-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span className="font-medium">Browse Past Events</span>
                </Link>
              ) : (
                <Link to="/create-event" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 flex items-center justify-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span className="font-medium">Create Your Event</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;