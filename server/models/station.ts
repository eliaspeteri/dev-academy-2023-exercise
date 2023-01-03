import mongoose, { model, Schema, Types } from 'mongoose';

interface IStation extends Document {
  stationId: number;
  stationName: string;
  stationAddress: string;
  departingJourneys: [Types.ObjectId?];
  returningJourneys: [Types.ObjectId?];
}

const stationSchema: Schema = new Schema<IStation>({
  stationId: {
    type: Number,
    required: true
  },
  stationName: {
    type: String,
    required: true
  },
  departingJourneys: {
    type: [Schema.Types.ObjectId],
    ref: 'Journey',
    required: true
  },
  returningJourneys: {
    type: [Schema.Types.ObjectId],
    ref: 'Journey',
    required: true
  }
});

stationSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

stationSchema.statics = {
  valueExists(query) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.findOne(query).then((result: any) => result);
  }
};

export default mongoose.models.Station ||
  model<IStation>('Station', stationSchema);
