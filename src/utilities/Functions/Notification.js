import {
    notification,
} from 'antd';

const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
        message: title,
        description: message
    });
};
export default function notif (type, title, message) {
    openNotificationWithIcon(type, title, message)
}