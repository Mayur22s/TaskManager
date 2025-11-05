export default {
    expo: {
        name: "TaskManager",
        slug: "TaskManager",
        icon: "./src/assets/png/appIcon.png",

        ios: {
            icon: "./src/assets/png/appIcon.png",
            bundleIdentifier: "com.mayurl.taskmanager",
        },

        android: {
            adaptiveIcon: {
                foregroundImage: "./src/assets/png/appIcon.png",
                backgroundColor: "#FFFFFF",
            },
            package: "com.mayurl.taskmanager",
        },
    },
};