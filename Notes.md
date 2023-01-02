# Dev Academy 2023 exercise

## Stack

|Frontend?|Backend|
|-|-|
|TypeScript|TypeScript|
|Node.js|Node.js|
|Vite|express.js|
|Semantic UI React|multer-js|
|validatorjs|validatorjs|
||mongoose|
||MongoDB|
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
    distanceMeters = number;
    durationSeconds = number;
}
```

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
    stationName = string;
    stationAddress = string;
    totalNumberOfDepartures = number;
    totalNumberOfReturns = number;
}
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
