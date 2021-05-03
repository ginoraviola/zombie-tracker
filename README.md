# zombie-tracker
---
We've got the zombies under control, but we need to keep track of them. That's where you come in. We need you to build an app for us. A Zombie Manager.

We can quarantine zombies in three locations: the hospital, the school, and the warehouse. We need the app to keep track of where each zombie is being held, how many zombies are in each location, and we need to be able to move zombies between the locations.

This needs to be a fully-functional app with a separate front-end and back-end. The front-end should communicate with the back-end via an API.


### Installation
#### Backend
:bulb: This part is not really necessary , since the API is being hosted in Heroku at https://zombietrack.herokuapp.com/ 

``cd backend/ && yarn install``

``yarn start``

#### Frontend

``cd frontend/ && yarn install``

#### Android
``yarn android``

#### iOS
``cd ios/ && pod install``

``cd .. && yarn ios``

---------

#### Known issues
- When you initially move a zombie, it gets reset to the initial position. After the first move, it works properly.

- When a zombie is clicked, the dialog gets triggered. The parent view gets re-rendered, which is causing some animation issues.

### Screenshots
<img src="./rooms.jpeg" width="250" height="400">
<img src="./room.jpeg" width="250" height="400">
<img src="./dialog.jpeg" width="250" height="400">
