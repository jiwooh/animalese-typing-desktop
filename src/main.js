//main.js
const { app, Tray, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadFile('src/index.html');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

//TODO
function createTrayIcon() {

}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});
