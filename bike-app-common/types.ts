export type Journey = {
  departureStationId: number;
  returnStationId: number;
  departureStationName: string;
  returnStationName: string;
  distanceCoveredInMeters: number;
  durationSeconds: number;
  departureTime: string;
  returnTime: string;
};

export type Station = {
  stationId: number;
  stationName: string;
};
