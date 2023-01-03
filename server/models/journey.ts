import mongoose, { model, Schema, Types } from 'mongoose';

interface IJourney extends Document {
  departureTime: Date;
  returnTime: Date;
  distanceCoveredInMeters: number;
  durationSeconds: number;
  departureStation: Types.ObjectId;
  returnStation: Types.ObjectId;
}

const journeySchema: Schema = new Schema<IJourney>({
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
});

journeySchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

journeySchema.statics = {
  valueExists(query) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.findOne(query).then((result: any) => result);
  }
};

export default mongoose.models.Journey ||
  model<IJourney>('Journey', journeySchema);
