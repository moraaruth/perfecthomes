import { Schema, model, models } from 'mongoose';

const instagramPostSchema = new Schema(
  {
    instagramPostId: {
      type: String,
      required: true,
      unique: true,
    },
    caption: {
      type: String,
      default: '',
    },
    mediaType: {
      type: String,
      required: true,
    },
    mediaUrl: {
      type: String,
      default: '',
    },
    thumbnailUrl: {
      type: String,
      default: '',
    },
    permalink: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
    syncedAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: false }
);

export default models.InstagramPost || model('InstagramPost', instagramPostSchema);
