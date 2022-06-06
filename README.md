# Drag and Drop Dashboard in React (with state persistance)

This dashboard app can be used to create dynamic lists with a title. In each list, cards with their own title and text can be added dynamically.
Furthermore, any card can be dragged from one list and dropped into another list(Similar to a JIRA board).

To create this app, I have used __react(18.1.0)__ library for UI, __redux(8.0.2)__ library for managing and centralizing application state,__redux-persist(6.0.0)__ package to persist state and __HTML-5 Drag & Drop API__ to implement DnD functionality.

### Features
- Add lists dynamically in the dashboard with desired title
- Add cards in a list with desired title and text
- Delete/remove a list
- Delete/remove a card 
- Reorder cards in list[s] via Drag & drop 


## Installation

- Clone the repo
- Install the required dependencies using the below command
```bash
yarn install
```
- Run the app locally using the below command
```bash
yarn start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.