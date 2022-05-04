# Next.JS Assignment
## Students: Sherefat and Eduard

### Get Started:

 - run `git clone https://github.com/drag0022/mad9135-c4-react-nest`
 - `yarn install` or `npm -i`
 - To start the server run `yarn dev` or `npm run dev`

### How to push your changes and create a pull request (PR):

- Before you start working, make sure your code is up to date. Run `git pull origin main`
- Create a new branch which will include only the code from a specific task. Run `git checkout -b <branchName>`, where `branchName` is the name of your new branch. Example: `git checkout -b theme-setup`
- Make commits to the branch you just created as you work towards completing the task using `git add` and `git commit`
- When you're ready to create a pull request, send your branch to the repo using `git push origin <branchName>`
- Head over to GitHub, and select your branch. You will see a section to create a PR.


### Feature Requirements:
- ~~Update the `/datasource/data.js` file to create your own data for the website. Your objects need a minimum of an id plus three other properties. One of those three properties should be an image filename.~~ ✅
- ~~There will be an image for each of your data objects. Store these images inside `/public/images/`. We are putting them here to simplify the loading of the images.~~ ✅
- Update the `/styles/theme.js` to create your own theme. You can use the default theme or one of the other demo themes and build on top of that to create your theme, or you can just define your own theme entirely yourself.
- Use the `sx` props to style all your app elements.
- ~~Put your data into global state by using the `Context API`.~~ ✅
- ~~Your Context object will make the initial fetch call, to the API defined in your `/pages/api/` folder, and provide the object to any page that needs access.~~ ✅
- Provide CRUD features in your app to allow the user to `add`, `edit`, and `delete` items.
- When doing a `Create`, `Update`, or `Delete` operation, the page should make an appropriate call to your Context object to carry out the operation.
- ~~The set operation call to your Context object should accept an object that contains an action and the data payload. See below for an example of two objects that could be passed to the Context set method. The function inside your Context object that does the updating of state would use a switch case to look at the action property and then make the appropriate API call. If the API call is successful then the state value (with your data) inside of Context will be updated.~~ ✅

``` 
let newState1 = {
  action: 'DELETE',
  payload: { id: 17 },
};
//delete only needs an id (we are assuming our users are authorized)
let newState2 = {
  action: 'UPDATE',
  payload: { id: 43, title: 'Yes is More', author: 'Bjarke Engels' },
};
//update has an id plus values for other props to change
let newState3 = {
  action: 'INSERT',
  payload: { title: 'Shogun', author: 'James Clavell' },
};
//insert has no id
```

- Your app should have a `Home/welcome` page, a page that shows a list of all your item titles, a page that shows the details and image for one item, and a page that lets you add a new item.
- The ability to delete or edit an item should be contained within the edit page.
- All pages should be designed as mobile-first and responsive.
- Good design practices should be followed. (Accessible colours, alignment, spacing, typographic hierarchy, etc.)
