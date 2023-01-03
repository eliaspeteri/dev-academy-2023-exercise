export type Journey = {
  departureStation: string;
  returnStation: string;
  distanceCoveredInMeters: number;
  durationSeconds: number;
};

export type Station = {
  stationId: number;
  stationName: string;
  stationAddress: string;
  departingJourneys: [Journey?];
  returningJourneys: [Journey?];
};
