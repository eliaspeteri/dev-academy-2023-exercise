# TODO

## Frontend

* [x] Scaffold the Next.js project
* [-] Install planned dependencies
  * [ ] axios
  * [ ] ESLint
  * [ ] Prettier
  * [ ] Semantic UI React
  * [x] TypeScript
  * [ ] validatorjs
* [ ] Implement basic UI pages with Semantic UI React
  * [ ] Homepage
  * [ ] Journeys list view
  * [ ] Stations list view
  * [ ] Single station view
  * [ ] Data upload page
  * Components
    * [ ] Navbar
    * [ ] File upload
    * [ ] List
    * [ ] List header
    * [ ] List item
    * [ ] Search input

## Backend

* [x] Scaffold the Express.js project
* [x] Install planned dependencies
  * [x] ESLint
  * [x] express.js
  * [x] mongoose
  * [x] multer-js
  * [x] Prettier
  * [x] TypeScript
  * [x] validatorjs
* [-] Implement basic API routes
  * [-] /stations
    * [x] Controller
    * [ ] Service
  * [ ] /stations/[station]
    * [ ] Controller
    * [ ] Service
  * [ ] /journeys
    * [ ] Controller
    * [ ] Service
  * [ ] /journeys/[journey]
    * [ ] Controller
    * [ ] Service
  * [ ] /upload
* [ ] Add support for pagination query parameters (?limit, ?page etc)
* [ ] Write mongoose schemas
  * [ ] Journey schema
  * [ ] Station schema
* [ ] Implement basic validationjs code (check if file exists, if file is not empty etc)
* [ ] Implement file handling code with multer

## Common

* [ ] Write types (see notes for boilerplates)
  * [ ] Journey
  * [ ] Station

## Production

* [ ] Deploy to Cyclic
* [ ] Package into Docker containers
* [ ] Combine into one Docker Compose project
* [ ] Deploy to Azure Web App instance instead of Cyclic?
