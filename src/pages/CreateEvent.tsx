import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Image as ImageIcon, Check, ArrowLeft, Upload, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { eventApi } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import worldLocations from '../data/worldLocations';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    maxAttendees: 50,
    imageUrl: ''
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [locationQuery, setLocationQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  useEffect(() => {
    if (locationQuery) {
      const filtered = worldLocations.filter(location => 
        location.toLowerCase().includes(locationQuery.toLowerCase())
      ).slice(0, 10); // Limit to 10 results for better performance
      setFilteredLocations(filtered);
      setShowLocationSuggestions(filtered.length > 0);
    } else {
      setFilteredLocations([]);
      setShowLocationSuggestions(false);
    }
  }, [locationQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'location') {
      setLocationQuery(value);
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLocationSelect = (location: string) => {
    setFormData(prev => ({ ...prev, location }));
    setLocationQuery(location);
    setShowLocationSuggestions(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'image/heic'];
      if (!validTypes.includes(file.type)) {
        setError('Please upload only JPG, PNG, or HEIC images.');
        return;
      }
      
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      // In a real app, you would upload the file to a server and get a URL back
      // For demo purposes, we'll just use the preview URL
      setFormData(prev => ({ ...prev, imageUrl: previewUrl }));
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'image/heic'];
      if (!validTypes.includes(file.type)) {
        setError('Please upload only JPG, PNG, or HEIC images.');
        return;
      }
      
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      // In a real app, you would upload the file to a server and get a URL back
      // For demo purposes, we'll just use the preview URL
      setFormData(prev => ({ ...prev, imageUrl: previewUrl }));
      setError(null);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, imageUrl: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, you'd get the creator ID from auth context
      const eventData = {
        ...formData,
        creator: user?.id || '65f1a2b3c4d5e6f7a8b9c0d1', // Use user ID if available
        _id: `new-${Date.now()}`, // Generate a temporary ID for the new event
        attendees: [], // Initialize with empty attendees array
        creator: {
          _id: user?.id || '65f1a2b3c4d5e6f7a8b9c0d1',
          name: user?.name || 'Current User'
        }
      };
      
      // In a real app, this would call the API
      // await eventApi.create(eventData);
      
      // For demo purposes, we'll store the new event in localStorage
      localStorage.setItem('newEvent', JSON.stringify(eventData));
      
      setSuccess(true);
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/events');
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || 'Failed to create event. Please try again.');
      console.error('Create event error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex items-center gap-4">
          <Link 
            to="/events" 
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/70 hover:bg-gray-700/70 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Create New Event</h1>
        </div>
        
        {success ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-xl bg-green-900/30 border border-green-700 text-center"
          >
            <Check className="h-16 w-16 mx-auto mb-4 text-green-500" />
            <h2 className="text-2xl font-semibold mb-2">Event Created Successfully!</h2>
            <p className="text-gray-300">Redirecting to events page...</p>
          </motion.div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 rounded-lg bg-red-900/30 border border-red-700">
                <p className="text-red-300">{error}</p>
              </div>
            )}
            
            <div className="space-y-4">
              <label className="block">
                <span className="text-lg font-medium">Event Title</span>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-3 rounded-lg bg-gray-800/70 border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Enter event title"
                  required
                />
              </label>

              <label className="block">
                <span className="text-lg font-medium">Description</span>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-3 rounded-lg bg-gray-800/70 border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  rows={4}
                  placeholder="Describe your event"
                  required
                />
              </label>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="block relative">
                  <span className="text-lg font-medium">Date</span>
                  <div className="mt-1 relative">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      onClick={() => setShowCalendar(true)}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800/70 border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      required
                    />
                    <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </label>

                <label className="block">
                  <span className="text-lg font-medium">Time</span>
                  <div className="mt-1 relative">
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800/70 border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      required
                    />
                    <Clock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </label>
              </div>

              <label className="block relative">
                <span className="text-lg font-medium">Location</span>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="location"
                    value={locationQuery}
                    onChange={handleChange}
                    onFocus={() => setShowLocationSuggestions(true)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/70 border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Enter event location"
                    required
                  />
                  <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  
                  {/* Location suggestions dropdown */}
                  {showLocationSuggestions && (
                    <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredLocations.map((location, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                          onClick={() => handleLocationSelect(location)}
                        >
                          {location}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </label>

              <label className="block">
                <span className="text-lg font-medium">Maximum Attendees</span>
                <div className="mt-1 relative">
                  <input
                    type="number"
                    name="maxAttendees"
                    value={formData.maxAttendees}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/70 border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Enter maximum number of attendees"
                    required
                  />
                  <Users className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </label>

              <div className="block">
                <span className="text-lg font-medium">Event Image</span>
                <div 
                  className={`mt-1 border-2 border-dashed rounded-lg p-6 transition-colors ${
                    isDragging 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : imagePreview 
                        ? 'border-green-500 bg-green-500/10' 
                        : 'border-gray-700 hover:border-gray-600'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Event preview" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="h-12 w-12 mx-auto mb-2 text-gray-500" />
                      <p className="text-gray-400 mb-2">Drag and drop an image here, or click to select</p>
                      <p className="text-sm text-gray-500">JPG, PNG, or HEIC (max 5MB)</p>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-4 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Select Image
                      </button>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/heic"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Creating Event...</span>
                </div>
              ) : (
                'Create Event'
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default CreateEvent;