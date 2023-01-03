export type Journey = {
  departureStationId: string;
  returnStationId: string;
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
