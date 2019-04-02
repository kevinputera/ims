# IMS __Work-in-progress__
An Inventory Management System built using React with Express back-end in an Electron container.

## Current functionalities
- Store data in IndexedDB.
- The main renderer service(User side) can perform CRUD operations through RESTful HTTP requests to the headless renderer service(server).
- Functional Sidebar with choice states(able to store the current chosen option in a React state).

## TODO
- Construct HTML tables to display data.
- Add HTML Forms + Form Validation.
- Expand current HTTP requests to account for more operations + exceptions.
- Move from IndexedDB to either MongoDB or PostgreSQL.
