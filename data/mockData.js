// Mock data for development when MongoDB is not available
let messages = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello! I love your portfolio. Can we connect?',
    read: false,
    createdAt: new Date('2024-01-15T10:30:00Z')
  },
  {
    _id: '2',
    name: 'Sarah Smith',
    email: 'sarah@company.com',
    message: 'Interested in your IoT projects. Would love to discuss collaboration opportunities.',
    read: true,
    createdAt: new Date('2024-01-14T15:45:00Z')
  },
  {
    _id: '3',
    name: 'Mike Johnson',
    email: 'mike@startup.com',
    message: 'Your SMART AGROSENSE project is impressive! Are you available for freelance work?',
    read: false,
    createdAt: new Date('2024-01-13T09:20:00Z')
  },
  {
    _id: '4',
    name: 'Emily Chen',
    email: 'emily@tech.com',
    message: 'Saw your StreamFlix project. The UI is amazing! What technologies did you use?',
    read: false,
    createdAt: new Date('2024-01-12T14:10:00Z')
  },
  {
    _id: '5',
    name: 'David Wilson',
    email: 'david@innovation.com',
    message: 'Your College Grievance App could be useful for our institution. Can we schedule a demo?',
    read: true,
    createdAt: new Date('2024-01-11T11:55:00Z')
  }
];

export const mockDatabase = {
  // Get all messages
  getAllMessages: () => {
    return [...messages].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  // Add new message
  addMessage: (messageData) => {
    const newMessage = {
      _id: (messages.length + 1).toString(),
      ...messageData,
      read: false,
      createdAt: new Date()
    };
    messages.push(newMessage);
    return newMessage;
  },

  // Mark message as read
  markAsRead: (id) => {
    const messageIndex = messages.findIndex(msg => msg._id === id);
    if (messageIndex !== -1) {
      messages[messageIndex].read = true;
      return messages[messageIndex];
    }
    return null;
  },

  // Delete message
  deleteMessage: (id) => {
    const messageIndex = messages.findIndex(msg => msg._id === id);
    if (messageIndex !== -1) {
      const deletedMessage = messages[messageIndex];
      messages.splice(messageIndex, 1);
      return deletedMessage;
    }
    return null;
  },

  // Get message by ID
  getMessageById: (id) => {
    return messages.find(msg => msg._id === id);
  }
};

export default mockDatabase;
