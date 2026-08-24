import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// ---------------- REGISTER ----------------

export async function registerForPushNotifications() {
  if (!Device.isDevice) {
    return;
  }

  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } =
      await Notifications.requestPermissionsAsync();

    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    return;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(
      "default",
      {
        name: "default",
        importance:
          Notifications.AndroidImportance.MAX,
      }
    );
  }
}

// ---------------- SEND NOW ----------------

export async function sendNotification(
  title,
  body
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
    },
    trigger: null,
  });
}

// ---------------- DEADLINE CHECKER ----------------

export async function checkDeadlines(
  universities,
  bursaries
) {
  const today = new Date();

  const notifyDays = [
    30,
    14,
    7,
    3,
    1,
  ];

  const allItems = [
    ...universities,
    ...bursaries,
  ];

  for (const item of allItems) {
    if (
      !item.closingDate ||
      item.status !== "Open"
    ) {
      continue;
    }

    const closingDate =
      new Date(item.closingDate);

    const diff =
      closingDate.getTime() -
      today.getTime();

    const daysLeft =
      Math.ceil(
        diff / (1000 * 60 * 60 * 24)
      );

    if (notifyDays.includes(daysLeft)) {
      await sendNotification(
        "Application Deadline",
        `${item.name} closes in ${daysLeft} day${
          daysLeft === 1 ? "" : "s"
        }.`
      );
    }
  }
}