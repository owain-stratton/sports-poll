# Sports Poll App

## Screenshot
![Sports poll app UI](https://drive.google.com/uc?export=view&id=0B6IVyE8wPQroSlprbHpnZ0NnT1U)

## Instructions
To download and install the project on your machine please follow the instructions below:
```
# clone the repository
git clone https://github.com/geoshepherds/sports-poll.git
cd <this-repo>

# install node dependencies
npm install

# install mongoDB
run mongod from your CLI
```

## Developing
Probably in your worthwhile to install some popular node tools if you're going to play and to help with development
```
npm install --save-dev nodemon
```

## Notes
I have developed an app with the MEAN Stack. On the backend there is an Express REST API serving the sport event data for this project. The project runs on the NodeJS environment with MongoDB as the database. The front-end uses AngularJS to interact with API and gets a random event on page load. A user can place a vote on the outcome of the event which is then stored in local storage in the clients browser. The UI is responsive and I have used Sass as my CSS preprocessor to achieve this. The page UI is also dynamic based on the data loaded e.g. A tennis match will load with a background picture of a tennis arena within the country the match is taking place. Also the state of the event is rendered with amber, green or red for indication whether it is in not started, in progress and finished respectively.

The project took me two working days to complete and is currently in a state of work-in-progress. The REST API serves the data to the front-end and loads another random even upon casting a vote. There is some user interaction styling on the page but this is minimal.

As mentioned the tools used in this project have been MongoDB, ExpressJS, AngularJS, NodeJS and Sass. I used GulpJS as my task runner, concatenating js files as well as compiling scss files and use browserify to bundle up dependencies whilst I was developing. I use Atom as my text editor.

# Challenges Faced
Some challenges I faced was integrating the front-end with the backend, especially for some reason the route for the initial GET request. Another challenge was structuring the page and trying to think about a clean and simple UI without having much in the way of mockups or sketches. (Free flowing design)!

# Things to Iterate/Improve
Added control for the user to navigate the events. Maybe ability to view votes cast. Also perhaps to change the votes once cast.

Improve some small details in the UI such as color combinations and adding smooth transitions to animations and interactions.

I would like to add some automated tests, probably using MochaJS. However I didn't approach the project with TDD so it may take some time to unbraid some code and apply unit tests.

# Thanks!
