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
  * [x] multer
  * [x] Prettier
  * [x] TypeScript
  * [x] validatorjs
* [-] Implement basic API routes
  * [-] /stations
    * [x] Controller
    * [-] Service
      * [x] GET all
      * [x] POST one
  * [ ] /stations/[station]
    * [ ] Controller
    * [ ] Service
  * [-] /journeys
    * [x] Controller
    * [-] Service
      * [x] GET all
      * [ ] POST one
      * [x] POST many
  * [ ] /journeys/[journey]
    * [ ] Controller
    * [ ] Service
  * [-] /upload
* [ ] Add support for pagination query parameters (?limit, ?page etc)
* [x] Write mongoose schemas
  * [x] Journey schema
  * [x] Station schema
* [ ] Implement basic validationjs code (check if file exists, if file is not empty etc)
* [x] Implement file handling code with multer

## Common

* [x] Write types (see notes for boilerplates)
  * [x] Journey
  * [x] Station

## Production

* [ ] Deploy to Cyclic
* [ ] Package into Docker containers
* [ ] Combine into one Docker Compose project
* [ ] Deploy to Azure Web App instance instead of Cyclic?
