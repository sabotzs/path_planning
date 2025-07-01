# path_planning
Project for the path planning course. This project contains implementation of the visibility graph path planning.

## Requrements
To run this project you must have `node.js` on your machine.

## Running
Clone this repository: 
`git@github.com:sabotzs/path_planning.git`

When you've cloned the repository go to its folder.
```
cd path_planning
```

From there install all the  needed dependencies.
```
npm install
```

When everything's ready run a server for the project.
```
npx vite
```

Click `Ctrl+O` to open diretcly in your browser, or open your browser and go to `localhost:5173`

## Play around with the project
To start creating objects, you have to click one of the buttons on the sidebar. The objects you create must be convex polygons with at least 3 vertices. To finish creating an object, you could either click again on the button, or click on the first point of the polygon.

To move to the next step, both character and target must be created.

All the following steps only visualise the steps of the path planning and don't allow interaction.