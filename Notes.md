# Dev Academy 2023 exercise

## Stack

|Frontend?|Backend|
|-|-|
|TypeScript|TypeScript|
|Node.js|Node.js|
|Prettier|Prettier|
|ESLint|ESLint|
|Next.js|express.js|
|React|multer-js|
|validatorjs|validatorjs|
|Semantic UI React|mongoose|
|axios|MongoDB|
||Docker?|

## Data Import

Data is in CSV-format and must be read into the backend in order to be served out. The data format is

|Departure|Return|Departure station id|Departure station name|Return station id|Return station name|Covered distance (m)|Duration (sec.)|
|-|-|-|-|-|-|-|-|
|2021-05-31T23:57:25|2021-06-01T00:05:46|94|Laajalahden aukio|100|Teljäntie|2043|500|
|2021-05-31T23:56:59|2021-06-01T00:07:14|82|Töölöntulli|113|Pasilan asema|1870|611|
|...|...|...|...|...|...|...|...|

1. Import data files with multer-js
2. Validate the data with validatorjs
    1. Validator fails if data does not exist
    2. Filter out the failed entries in the data
    3. If valid, push the data into a MongoDB instance

## Journey list view

* List all the journeys

For each journey we only care about departure and return stations, covered distance in kilometers and the duration in minutes (simple calculation here) so there should be a frontend type for it.

Journey type could look something like this:

```ts
type Journey = {
    departureStation = string;
    returnStation = string;
    distanceCoveredInMeters = number;
    durationSeconds = number;
}
```

The related mongoose schema would look something like:

```ts
const journeySchema: Schema = new Schema <Journey>({
    departureTime: {
        type: Date,
        required: true,
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
})
```

It would make sense to use bucket pattern here. Thus the journeys could be bundled by date to bring the count of documents down. The schema for it would look something like this:

```ts
interface JourneyBucket extends Document {
  startDate: Date;
  endDate: Date;
  journeys: [Journey];
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
  ]
});
```

The problem with a bucket pattern is that being grouped by date means some users would pick up a bike, say, 23:59, ride it over midnight and then return it. This entry would either be recorded in two buckets (as user departed on one date and arrived on another) or it may be lost to the ether and not recorded at all.

_Alternatively_ the data could be posted to the database as normal but the database itself would have Time-Series collection which is ideal for timestamped measurements. The problem here is identifying a good way to store the data. Time-Series collection only accepts one timestamped so we should pick between using the departure or the return time.

Pagination should be used on the frontend here (most likely an infinite scroller) and **especially** on the backend.

### Additional features for journey list view

* Pagination
* Ordering per column (only on the frontend)
* Searching; either by statically on the queries in frontend or a dynamic and updating query on the backend
* Filtering
  
  * By departure date
  * By return date
  * By departure station name
  * By return station name

## Station list view

* List all the stations

For this to work, we could tally up number of unique station entries in the data, then aggregate entries based on it and serve the stations on their own endpoints, as well as an endpoint for all stations.

### Additional features for station list view

* Pagination
* Searching

## Single station view

For the single station view, we care about four things:

* Station name
* Station address
* Total number of journeys starting from the station
* Total number of journeys ending at the station

Thus, the type for a single station could look something like this:

```ts
type Station = {
    stationId = number;
    stationName = string;
    stationAddress = string;
    departingJourneys = [Journey];
    returningJourneys = [Journey];
}
```

Related mongoose schema would look something like this:

```ts
const stationSchema: Schema = new Schema<Station>({
    stationId: {
        type: Number,
        required: true
    },
    stationName: {
        type: String,
        required: true
    },
    stationAddress: {
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
})
```

### Additional features for single station view

* Station location on the map (find a solution for this)
* Average journey distance to and from station
* Top 5 most popular return stations for journeys originating from the station
* Top 5 most popular departure stations for journeys returning at the station
* Filter calculations per month (June, July, August etc)

## Additional personal ideas

* Counters on the frontend
  * total number of entries
  * total distance covered
  * total duration (in hours and minutes, decide on granularity based on amount of data)
  * Busiest days (total number of entries for a given day)
  * Quietest days (the days with a least number of entries)

## Questions

Files are **big**. Should some sort of matching be done in the backend to find existing entries and save computing power/memory?

Which type of pagination pattern to use?

Testing? API testing with superagent? Cypress? RF?
Unit tests?
