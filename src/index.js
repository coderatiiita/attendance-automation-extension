import schedule from 'node-schedule';
import axios from "axios";

const API_ENDPOINT = 'https://gommt.darwinbox.in/attendance/attendance/log?'
const user = '5ffef5e80e46d';
const keyName = 'pbqBeYWPUn';
const keyVal = 'e4e1fee25297ca378085e338cf6344f7ceaf4b74';

const headers = {
    //"cookie" : "SimpleSAMLSessionID=938aa842f7b0db901b5751ba3acfe3f7; authSource=602e6d79ec45e; PHPSESSID=ln7jrohe369otp00fo1l1753d6; ab805d4a680a53f51e16ffb2737d0dc5=229846614e0e6e55c03c8743ec5e9ac0e8457b89a%3A4%3A%7Bi%3A0%3Bs%3A6%3A%22578594%22%3Bi%3A1%3Bs%3A20%3A%22shubham.vashishtha%40g%22%3Bi%3A2%3Bi%3A604800%3Bi%3A3%3Ba%3A15%3A%7Bs%3A18%3A%22userSessionTimeout%22%3Bi%3A1624816470%3Bs%3A9%3A%22plan_name%22%3Bs%3A0%3A%22%22%3Bs%3A13%3A%22monthly_spend%22%3Bi%3A0%3Bs%3A14%3A%22account_status%22%3Bi%3A2%3Bs%3A7%3A%22is_paid%22%3Bi%3A0%3Bs%3A15%3A%22financial_cycle%22%3Bs%3A1%3A%221%22%3Bs%3A26%3A%22no_of_employees_on_payment%22%3Bi%3A0%3Bs%3A18%3A%22account_created_on%22%3Bi%3A1594709492%3Bs%3A31%3A%22changed_from_trial_to_active_on%22%3Bi%3A0%3Bs%3A12%3A%22mod_is_leave%22%3Bi%3A1%3Bs%3A17%3A%22mod_is_attendance%22%3Bi%3A1%3Bs%3A13%3A%22mod_is_stream%22%3Bi%3A0%3Bs%3A20%3A%22mod_is_reimbursement%22%3Bi%3A0%3Bs%3A14%3A%22mod_is_payroll%22%3Bi%3A0%3Bs%3A9%3A%22expire_on%22%3Bi%3A2199465000%3B%7D%7D; pbqBeYWPUn=e4e1fee25297ca378085e338cf6344f7ceaf4b74",
    //"referer" : "referer",
    //"user-agent" : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
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
    let notifOptions = {
        type: "basic",
        title: "Starting punching...",
        iconUrl: "icon48.png",
        message: "Initiating API call.."
    }
    chrome.notifications.create('APICallInit', notifOptions);
    punchAttendance();
});

