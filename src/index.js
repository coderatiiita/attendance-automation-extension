import schedule from 'node-schedule';
import axios from "axios";

const API_ENDPOINT = 'https://gommt.darwinbox.in/attendance/attendance/log?'
const user = '5ffef5e80e46d';
const keyName = 'pbqBeYWPUn';
const keyVal = 'e4e1fee25297ca378085e338cf6344f7ceaf4b74';

const headers = {
    "authority" : "gommt.darwinbox.in",
    "accept" : "application/json, text/javascript, */*; q=0.01",
    "dn1" : 1,
    "x-requested-with" : "XMLHttpRequest",
    "accept-language" : "en-US,en;q=0.9,hi;q=0.8"
};

function punchAttendance() {
    try {
        axios.get(`${API_ENDPOINT}user=${user}&${keyName}=${keyVal}`, {
            headers
        }).then(response => {
            let notifOptions = {
                type: "basic",
                title: "Attendance Punched",
                iconUrl: "icon48.png",
                message: "Your attendance has been punched."
            }
            chrome.notifications.create('attendanceNotifSuccess', notifOptions);
        }).catch(err => {
            let notifOptions = {
                type: "basic",
                title: "Punch failed",
                iconUrl: "icon48.png",
                message: "Punching failed!"
            }
            chrome.notifications.create('attendanceNotifFail', notifOptions);
        });
    } catch (error) {
        let notifOptions = {
            type: "basic",
            title: "API call failed",
            iconUrl: "icon48.png",
            message: "API call failed!"
        }
        chrome.notifications.create('APIFail', notifOptions);
    }

}

const form = document.querySelector(".form-data");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("event triggered");
    punchAttendance();
});

const login = schedule.scheduleJob('30 9 * * 1-5', () => {
    console.log('job started');
    punchAttendance();    
});

const logout = schedule.scheduleJob('30 18 * * 1-5', () => {
    console.log('job started');
    punchAttendance();
});

console.log('i ran!');


