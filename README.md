# TaskPlanner - Mobile Task Management App

## Project Overview

### App Concept

TaskPlanner is a React Native mobile application designed to help users efficiently manage and organize their tasks with advanced filtering, sorting, and notification capabilities. The app supports both local storage and cloud-based data synchronization via Firebase.

### Problem Addressed

Users often struggle with task organization across multiple devices and need timely reminders for upcoming deadlines. TaskPlanner solves this by providing:

-   **Flexible task storage** (local or cloud-based)
-   **Automatic reminders** with customizable advance notice
-   **Smart sorting and filtering** by due date, completion status, category, and recurrence
-   **Dark mode support** for comfortable all-day usage

### Target User

-   Students and professionals managing daily tasks
-   Users who prefer simple, intuitive interfaces
-   Power users who want advanced filtering and recurring task management
-   Users who value both offline availability (local storage) and cloud synchronization options

### Key Features

-   **Task Management**: Create, edit, delete, and mark tasks as complete
-   **Recurring Tasks**: Set up tasks that repeat daily, weekly, monthly, or yearly with custom intervals
-   **Smart Notifications**: Configurable push notifications (1–30 days in advance)
-   **Dual Storage Modes**: Local AsyncStorage or cloud Firebase Firestore
-   **Advanced Filtering**: Sort by All, Due Date, Completed, Category, or Repeating status
-   **Search Functionality**: Quick search across task titles and categories
-   ✅ **Dark Mode**: Theme toggle with persistent preference storage
-   ✅ **Date Picker UI**: Native date pickers for iOS and Android

---

## Mobile App Architecture

### Folder Structure

```
TaskPlanner/├── components/│   ├── SearchBar.js                    # Search input component│   ├── TaskManagement/│   │   ├── AddTaskButton.js           # Floating action button│   │   ├── AddTaskModal.js            # New task creation modal│   │   ├── EditTaskModal.js           # Task editing modal│   │   ├── RepeatingModal.js          # Recurring task configuration│   │   └── TaskItem.js                # Individual task display card│   └── UI/│       ├── Button.js                   # Reusable button component│       ├── DatePickerButton.js        # Date picker wrapper│       ├── InputField.js              # Text input wrapper│       ├── InputPasswordField.js      # Secure password input│       └── LabeledInput.js            # Labeled input with date picker├── context/│   └── ThemeContext.js                # Global theme (dark/light mode)├── hooks/│   ├── useModalDimensions.js          # Modal sizing logic│   ├── useNotifications.js            # Push notification management│   ├── useNotificationPreference.js   # Notification settings│   ├── useLogout.js                   # Logout state and navigation│   ├── useSignup.js                   # Registration logic│   ├── useSortAndFilter.js            # Task sorting/filtering│   ├── useStorageMethod.js            # Storage method selection (local vs cloud)│   ├── useTaskForm.js                 # Task form state management│   └── useTasks.js                    # Core task CRUD operations├── screens/│   ├── FirstTimeScreen.js             # App initialization/onboarding│   ├── LoginScreen.js                 # User authentication│   ├── MainScreen.js                  # Primary task list view│   ├── SettingScreen.js               # Settings (theme, notifications, logout)│   ├── SignupScreen.js                # User registration│   └── UserInfoScreen.js              # User profile management├── services/│   └── NotificationService.js         # Expo Notifications API wrapper├── util/│   ├── appUtil.js                     # App-level utilities (userId, reset)│   ├── dateUtil.js                    # Date formatting and validation│   ├── notificationUtil.js            # Notification preference persistence│   └── taskUtil.js                    # Task sorting/filtering logic├── assets/│   └── images/                        # App images and icons├── App.js                             # App entry point with ThemeProvider├── app.config.js                      # Expo configuration├── app.json                           # App metadata├── firebaseConfig.js                  # Firebase initialization├── google-services.json               # Android Firebase config├── index.js                           # React Native entry point├── package.json                       # Dependencies and scripts└── README.md                          # This file
```

### Major Technologies & Libraries

Technology

Version

Purpose

**React Native**

0.81.4

Core mobile app framework

**Expo**

~54.0.10

Development platform and build tools

**React Navigation**

^7.1.17

Screen navigation and routing

**Firebase**

^12.5.0

Cloud authentication, Firestore database, real-time sync

**AsyncStorage**

^2.2.0

Local data persistence

**Expo Notifications**

^0.28.0

Push notifications and scheduling

**Expo Device**

^6.0.2

Device capability detection

**React Native Modal**

^14.0.0-rc.1

Modal dialogs

**React Native DateTimePicker**

8.4.4

Native date/time selection

**React Native Vector Icons**

^10.3.0

Icon library (Ionicons)

**Dotenv**

^17.2.3

Environment variable management

---

## Local Setup Instructions

### Prerequisites

-   **Node.js** (v16 or higher) – [Download](https://nodejs.org/)
-   **npm** (comes with Node.js)
-   **Expo CLI** – Install globally: `npm install -g expo-cli`
-   **EAS CLI** (for building) – `npm install -g eas-cli`
-   **Android Studio** or **Xcode** (for emulators)
    -   **Android**: Install Android Studio and create an AVD (Android Virtual Device)
    -   **iOS** (macOS only): Install Xcode from App Store, then run `xcode-select --install`

### Installation Steps

1.  **Clone the repository** (or navigate to the project folder):
    
    ```bash
    cd "path/to/TaskPlanner"
    ```
    
2.  **Install dependencies**:
    
    ```bash
    npm install
    ```
    
3.  **Set up environment variables**:
    
    -   Copy `.env.example` to `.env`:
        
        ```bash
        cp .env.example .env
        ```
        
    -   Update `.env` with your Firebase credentials (see [Backend / Cloud Setup](#backend--cloud-setup) below)
        
4.  **Verify installation**:
    
    ```bash
    npm list expoexpo whoami
    ```
    

### Running the App Locally

#### Option 1: Expo Go (Quickest for Testing)

1.  Install the **Expo Go** app on your physical iOS/Android device
    
2.  Start the development server:
    
    ```bash
    npm start
    ```
    
3.  Scan the QR code with your device camera or Expo Go app
    

#### Option 2: Android Emulator

1.  Open Android Studio and launch an AVD
    
2.  Run:
    
    ```bash
    npm run android
    ```
    

#### Option 3: iOS Simulator (macOS only)

1.  Start the development server:
    
    ```bash
    npm start
    ```
    
2.  Press `i` in the terminal, or run:
    
    ```bash
    npm run ios
    ```
    

#### Option 4: Web (Limited Functionality)

```bash
npm run web
```

*Note: Some native features (notifications, device APIs) won't work in web.*

### Environment Variables

Create a `.env` file at the project root with the following structure:

```env
# Firebase ConfigurationEXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_hereEXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.comEXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_idEXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.comEXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_idEXPO_PUBLIC_FIREBASE_APP_ID=your_app_idEXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

Refer to `.env.example` in the repo for a complete template.

---

## Backend / Cloud Setup

### Firebase Configuration

TaskPlanner uses **Firebase** for cloud storage and authentication. Follow these steps to set up your Firebase project:

#### 1. Create a Firebase Project

-   Go to [Firebase Console](https://console.firebase.google.com/)
-   Click "Add Project"
-   Enter project name and enable/disable analytics as desired
-   Create the project

#### 2. Set Up Firebase Authentication

-   In Firebase Console, go to **Build** > **Authentication**
-   Click "Get Started"
-   Enable **Email/Password** authentication method:
    -   Enable "Email/Password"
    -   Save

#### 3. Set Up Firestore Database

-   Go to **Build** > **Firestore Database**
-   Click "Create Database"
-   Choose region (e.g., `us-central1`)
-   Select "Start in test mode" (for development; use security rules for production)
-   Create database

#### 4. Create Collections

The following collections are used in TaskPlanner:

**Collection: `tasks`**

```javascript
{  id: "doc_id",  userId: "user_uid",  title: "Task name",  category: "Work/Personal/etc",  completed: false,  dueBy: "2025-12-25T00:00:00.000Z",  // ISO string  repeating: {    type: "Day/Week/Month/Year",    interval: 1,    startDate: Timestamp,    endDate: Timestamp  // null if no end date  },  createdAt: Timestamp}
```

**Collection: `users` (optional, for profile data)**

```javascript
{  uid: "user_uid",  email: "user@example.com",  displayName: "User Name",  createdAt: Timestamp}
```

#### 5. Configure Security Rules

Replace the default security rules with:

```javascript
rules_version = '2';service cloud.firestore {  match /databases/{database}/documents {    // Allow read/write for tasks owned by authenticated users    match /tasks/{document=**} {      allow read, write: if request.auth != null &&                             request.resource.data.userId == request.auth.uid;    }        // Allow read/write for user's own profile    match /users/{uid} {      allow read, write: if request.auth != null &&                            request.auth.uid == uid;    }  }}
```

#### 6. Get Firebase Config

-   Go to **Project Settings** > **Your Apps**
-   Select your app or create a new one
-   Copy the config object
-   Add values to your `.env` file

#### 7. Android Setup (Google Services)

-   Download `google-services.json` from Firebase Console
-   Place it in the project root: `google-services.json`

---

## API Documentation

### Internal APIs / Hooks

#### **useTasks.js** - Core Task Management

Manages all task CRUD operations with dual storage (local + Firebase).

##### `handleAddTask(task)`

-   **Method**: POST (conceptually)
    
-   **Parameters**:
    
    ```javascript
    {  title: string,  category: string,  completed: boolean,  dueBy: ISO string | null,  repeating: { type, interval, startDate, endDate } | null}
    ```
    
-   **Response**: Adds task to state and storage; returns void
    
-   **Example Usage**:
    
    ```javascript
    const { handleAddTask } = useTasks(userId);handleAddTask({  title: "Buy groceries",  category: "Personal",  completed: false,  dueBy: "2025-12-20T00:00:00.000Z",  repeating: null});
    ```
    

##### `handleSaveTask(updatedTask)`

-   **Method**: PUT (conceptually)
    
-   **Parameters**: Complete task object with `id`
    
-   **Response**: Updates task in state and storage
    
-   **Example Usage**:
    
    ```javascript
    handleSaveTask({  id: "task_123",  title: "Updated task",  category: "Work",  completed: true,  dueBy: null,  repeating: null,  userId: "user_uid"});
    ```
    

##### `handleDeleteTask(taskToDelete)`

-   **Method**: DELETE (conceptually)
    
-   **Parameters**: Task object with `id` and `userId`
    
-   **Response**: Boolean (true = success, false = failure)
    
-   **Error Handling**: Logs errors to console; returns false on failure
    
-   **Example Usage**:
    
    ```javascript
    const success = await handleDeleteTask(taskObject);if (success) console.log("Task deleted");
    ```
    

#### **useNotifications.js** - Push Notifications

Manages scheduling and rescheduling notifications.

##### `scheduleNotifications()`

-   **Method**: Async function
-   **Parameters**: None (uses internal tasks state)
-   **Response**: Returns void; schedules notifications via Expo Notifications API
-   **Error Handling**: Catches and logs errors
-   **Triggered on**: App load, task changes, notification preference changes

##### `updateNotificationPreference(daysInAdvance)`

-   **Method**: Async function
    
-   **Parameters**: `daysInAdvance` (1–30)
    
-   **Response**: Cancels all notifications and reschedules with new preference
    
-   **Example Usage**:
    
    ```javascript
    const { updateNotificationPreference } = useNotifications(tasks);await updateNotificationPreference(5);  // Notify 5 days before
    ```
    

#### **useSortAndFilter.js** - Task Organization

Filters and sorts tasks based on selected criteria.

##### `handleSortToggle()`

-   **Method**: Cycles through sort criteria
-   **Criteria Order**: All → Due Date → Completed → Category → Repeating → All
-   **Returns**: void; updates internal state

##### `filteredTasks`

-   **Type**: Array of tasks
    
-   **Filtering**: Combines sort criteria + search query
    
-   **Example Response**:
    
    ```javascript
    [  {    id: "task_1",    title: "Buy milk",    category: "Shopping",    completed: false,    dueBy: "2025-12-10T00:00:00.000Z",    repeating: null  }]
    ```
    

### Firestore APIs (via Firebase SDK)

#### **Add Task to Firestore**

```javascript
import { addDoc, collection, Timestamp } from "firebase/firestore";import { db } from "./firebaseConfig";const docRef = await addDoc(collection(db, "tasks"), {  userId: "user_uid",  title: "New Task",  category: "Work",  completed: false,  dueBy: "2025-12-20T00:00:00.000Z",  repeating: {    type: "Day",    interval: 1,    startDate: Timestamp.now(),    endDate: null  },  createdAt: Timestamp.now()});console.log("Task added with ID:", docRef.id);
```

#### **Fetch Tasks from Firestore**

```javascript
import { getDocs, collection, query, where } from "firebase/firestore";const q = query(collection(db, "tasks"), where("userId", "==", "user_uid"));const snapshot = await getDocs(q);const tasks = snapshot.docs.map(doc => ({  id: doc.id,  ...doc.data()}));
```

#### **Update Task in Firestore**

```javascript
import { doc, updateDoc } from "firebase/firestore";const taskRef = doc(db, "tasks", "task_123");await updateDoc(taskRef, {  title: "Updated title",  completed: true});
```

#### **Delete Task from Firestore**

```javascript
import { doc, deleteDoc } from "firebase/firestore";const taskRef = doc(db, "tasks", "task_123");await deleteDoc(taskRef);
```

---

## Native Device Features Used

### 1. Push Notifications (Expo Notifications)

**Purpose**: Notify users of upcoming task deadlines

**Implementation**:

-   **File**: `services/NotificationService.js`, `hooks/useNotifications.js`
-   **Libraries**: `expo-notifications`, `expo-device`
-   **Features**:
    -   Request user notification permissions
    -   Schedule notifications at specific times (8 AM on notification day)
    -   Cancel individual or all notifications
    -   Retrieve list of scheduled notifications

**Integration Steps**:

1.  Request notification permissions on first app load
2.  When a task is created/updated, schedule notification using `scheduleNotification()`
3.  When notification preference changes, reschedule all notifications
4.  When task is marked complete or deleted, cancel its notification

**Testing**:

-   **iOS**: Use Xcode Simulator → Debug → Simulate Background Fetch
-   **Android**: Use ADB to send test notifications or use logcat
-   **Real Device**: Install app, create task with due date, wait for scheduled time

**Limitations**:

-   Background notifications only work on physical devices (not simulators in some cases)
-   iOS requires user to enable notifications in system settings
-   Android 12+ requires app-specific permission

### 2. Date/Time Picker (React Native DateTimePicker)

**Purpose**: Allow users to select dates for tasks and recurring patterns

**Implementation**:

-   **File**: `components/UI/DatePickerButton.js`, `components/UI/LabeledInput.js`
-   **Library**: `@react-native-community/datetimepicker`
-   **Features**:
    -   Native iOS spinner and Android calendar UI
    -   Configurable date range
    -   Automatic timezone handling

**Integration**:

-   Used in AddTaskModal, EditTaskModal, and RepeatingModal
-   Displays formatted date string on button
-   On selection, calls `onChange()` callback with selected Date object

**Testing**:

-   iOS Simulator: Tap date field → spinner appears
-   Android Emulator: Tap date field → calendar appears
-   Verify selected date is formatted and displayed correctly

### 3. AsyncStorage (Local Data Persistence)

**Purpose**: Store tasks and settings locally without internet

**Implementation**:

-   **File**: `hooks/useTasks.js`, `hooks/useTheme.js`, various utility files
-   **Library**: `@react-native-async-storage/async-storage`
-   **Stored Data**:
    -   `tasks` - JSON array of task objects
    -   `darkMode` - Boolean theme preference
    -   `userChoice` - Storage method preference ("local" or "cloud")
    -   `notificationPreference` - Days in advance for notifications
    -   Various authentication tokens

**Integration**:

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';// Saveawait AsyncStorage.setItem('tasks', JSON.stringify(taskArray));// Loadconst storedTasks = await AsyncStorage.getItem('tasks');const parsedTasks = JSON.parse(storedTasks);
```

**Testing**:

-   Create/edit tasks in local storage mode
-   Restart app → data persists
-   Check device file system or Android Studio's Device File Explorer

### 4. Theme System (Dark Mode)

**Purpose**: Provide comfortable viewing in low-light environments

**Implementation**:

-   **File**: `context/ThemeContext.js`
-   **Features**:
    -   Toggle between light and dark modes
    -   Persistent theme preference
    -   Global color scheme (background, text, surface, border colors)

**Integration**:

-   ThemeProvider wraps entire app in `App.js`
-   All components use `useTheme()` hook for color values
-   Theme persists via AsyncStorage

**Testing**:

-   Toggle dark mode in Settings screen
-   Verify all UI elements change color appropriately
-   Restart app → theme preference maintained

### 5. Device Information (Expo Device)

**Purpose**: Detect device capabilities (e.g., whether notifications work)

**Implementation**:

-   **File**: `services/NotificationService.js`
-   **Library**: `expo-device`
-   **Usage**: Check if running on physical device vs simulator

**Example**:

```javascript
import * as Device from 'expo-device';if (!Device.isDevice) {  console.log('Notifications only work on physical devices');  return false;}
```

### 6. System Navigation & Back Button

**Purpose**: Handle Android back button and screen transitions

**Implementation**:

-   **Library**: `@react-navigation/native`
-   **File**: All screen components
-   **Features**:
    -   Stack navigation for screen transitions
    -   Android back button handling
    -   Gesture-based back on iOS

**Testing**:

-   Android: Press physical back button → previous screen
-   iOS: Swipe from left edge → previous screen