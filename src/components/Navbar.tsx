import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, User, LogIn, LogOut, Menu, X, Plus, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gray-800/30 backdrop-blur-xl border-b border-gray-700/50 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">EventHub</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {user && !user.isGuest ? (
              <>
                <Link 
                  to="/events" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  All Events
                </Link>
                <Link 
                  to="/create-event" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Create Event
                </Link>
              </>
            ) : (
              <Link 
                to="/past-events" 
                className="text-gray-300 hover:text-white transition-colors flex items-center gap-1"
              >
                <Clock className="h-4 w-4" />
                Past Events
              </Link>
            )}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                  {user.isGuest && <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700">Guest</span>}
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/register" 
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-700/50"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-800/90 backdrop-blur-xl border-b border-gray-700/50"
          >
            <div className="px-4 py-3 space-y-3">
              {user && !user.isGuest ? (
                <>
                  <Link 
                    to="/events" 
                    className="block px-3 py-2 rounded-lg hover:bg-gray-700/50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    All Events
                  </Link>
                  <Link 
                    to="/create-event" 
                    className="block px-3 py-2 rounded-lg hover:bg-gray-700/50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Create Event
                  </Link>
                </>
              ) : (
                <Link 
                  to="/past-events" 
                  className="block px-3 py-2 rounded-lg hover:bg-gray-700/50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Past Events
                </Link>
              )}
              
              {user ? (
                <>
                  <div className="px-3 py-2 flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">{user.name}</span>
                    {user.isGuest && <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700">Guest</span>}
                  </div>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-1 px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link 
                    to="/login" 
                    className="block w-full text-center px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block w-full text-center px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;