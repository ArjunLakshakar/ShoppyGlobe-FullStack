import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

const sharedStyles = {
    root: " bg-gradient-to-r from-pink-200 via-purple-200 to-purple-300 border border-purple-400 shadow-md text-gray-800 p-4 mb-4  ",
    title: "font-semibold text-xl text-purple-800",
    message: "text-sm text-purple-700"
};

const successNotification = (title, message) => {
    notifications.show({
        title,
        message,
        withCloseButton: true,
        position: "top-center",
        icon: <IconCheck size={24} style={{ color: "white" }} />, // Deep purple
        color: "violet",
        withBorder: true,
        classNames: sharedStyles,
        radius: "md",
        autoClose: 4000,
        // unstyled: true,
    });
};

const errorNotification = (title, message) => {
    notifications.show({
        title,
        message,
        withCloseButton: true,
        position: "top-center",
        icon: <IconX size={24} style={{ color: "white" }} />, // Rose red
        color: "pink",
        withBorder: true,
        classNames: sharedStyles,
        radius: "md",
        autoClose: 3000,
        // unstyled: true,
    });
};


export { successNotification, errorNotification };