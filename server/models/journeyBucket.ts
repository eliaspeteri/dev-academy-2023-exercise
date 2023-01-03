import { Journey } from 'bike-app-common';
import mongoose, { model, Schema } from 'mongoose';

interface JourneyBucket extends Document {
  startDate: Date;
  endDate: Date;
  journeys: [Journey];
  count: number;
}

const journeyBucketSchema: Schema = new Schema<JourneyBucket>({
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  journeys: [
    {
      departureTime: {
        type: Date,
        required: true
      },
      returnTime: {
        type: Date,
        required: true
      },
      departureStation: {
        type: Schema.Types.ObjectId,
        ref: 'Station',
        required: true
      },
      returnStation: {
        type: Schema.Types.ObjectId,
        ref: 'Station',
        required: true
      },
      distanceCoveredInMeters: {
        type: Number,
        required: true
      },
      durationSeconds: {
        type: Number,
        required: true
      }
    }
  ],
  count: {
    type: Number,
    required: true
  }
});

journeyBucketSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

journeyBucketSchema.statics = {
  valueExists(query) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.findOne(query).then((result: any) => result);
  }
};

export default mongoose.models.JourneyBucket ||
  model<JourneyBucket>('JourneyBucket', journeyBucketSchema, 'journeys');
