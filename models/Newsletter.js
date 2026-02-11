import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Email is required'],
  },
  category:{
    type:String,
    enum:[
      "General",
      "Updates",
      "Promotions",
      "News"
    ],
    default:"General"
  },

subject:{
  type:String
},

newsletterContent:{
  type:String
},

scheduleForLater:{
  type:Date,
  default:null
},
  status: {
        type: String,
        enum: [
            "Sent",
            "Draft",
            "Scheduled",
        ]

    },

  isActive: {
    type: Boolean,
    default: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  unsubscribedAt: {
    type: Date,
    default: null
  },
  source: {
    type: String,
    default: 'website',
    enum: ['website', 'admin', 'api']
  }
}, {
  timestamps: true
});

// Index for better query performance
// Email index is automatically created by unique: true constraint
newsletterSchema.index({ isActive: 1 });
newsletterSchema.index({ subscribedAt: -1 });

// Virtual for subscription status
newsletterSchema.virtual('subscriptionStatus').get(function() {
  return this.isActive ? 'active' : 'unsubscribed';
});

// Method to unsubscribe
newsletterSchema.methods.unsubscribe = function() {
  this.isActive = false;
  this.unsubscribedAt = new Date();
  return this.save();
};

// Method to resubscribe
newsletterSchema.methods.resubscribe = function() {
  this.isActive = true;
  this.unsubscribedAt = null;
  return this.save();
};

// Static method to get active subscribers
newsletterSchema.statics.getActiveSubscribers = function() {
  return this.find({ isActive: true }).sort({ subscribedAt: -1 });
};

// Static method to get subscriber count
newsletterSchema.statics.getSubscriberCount = function() {
  return this.countDocuments({ isActive: true });
};

export default mongoose.model('Newsletter', newsletterSchema);
