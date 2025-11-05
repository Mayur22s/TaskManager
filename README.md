# TaskManager
Task manager react native app

Tech Stack
    framework: react-native-expo
    local storage: redux-persist
    state management: react-redux
    middleware: redux-saga

Setup
# Clone repo
   git clone https://github.com/Mayur22s/TaskManager.git
    cd TaskManager
# Install dependencies
    npm install
# Run project
    npx expo start 
        => to run project
        => i: to run simulator (iOS)
        => a: to run emulator (android)
    npm run android or npm run ios to run emulator or simulator

# release android apk
    npm run build:android-release

# approach
    - created screen Tasks for tasks listing and AddEditTask for adding/updating task
    - use Flatlist to render task lists. Initially no tasks are added so showing message and it is handled by **ListEmptyComponent** of a Flatlist.
    - Tasks screen, you can Add Task, Sync tasks or search the tasks.
    - Add Task will navigate you to the AddEdit Task screen. Screen Name is handled dynamically. Once you Save Task => it will navigate you to same Task List screen while Updating the task. To delete task confirm and proceed.

    Redux Flow
    - action constants to map actions, reducer and saga
    - actions: Trigger task operations like add, update, delete, sync
    - reducers : Maintain task list, sync status, and navigation flags and integrated with Redux-Persist for local storage
    - sagas: handle async logic — like fetching tasks from API, syncing



    - dark and light theme is controlled by device theme value.
    - Atomic design: shared UI elements (Button, Input, Label) reused across screens for continuity




# Known Issues
    : in app theme manual control is missing
    : when offline, there is no toaster on press sync now button.