const { app, BrowserWindow, nativeImage } = require("electron");
const path = require("path");
const os = require("os");

let ppapiFlashPath;
if (os.platform() == "linux") {
	ppapiFlashPath = path.resolve(
		__dirname,
		"PepperFlash-31.0.0.108-linux/libpepflashplayer.so"
	);
} else if (os.platform() == "darwin") {
	ppapiFlashPath = path.resolve(
		__dirname,
		"PepperFlash-29.0.0.171-mac/PepperFlashPlayer.plugin/Contents/MacOS/PepperFlashPlayer"
	);
} else if (os.platform() == "win32") {
	ppapiFlashPath = path.resolve(
		__dirname,
		"PepperFlash-31.0.0.108-win/pepflashplayer.dll"
	);
} else {
	throw new Error("Operating system not supported");
}

app.commandLine.appendSwitch("ppapi-flash-path", ppapiFlashPath);
// app.commandLine.appendSwitch("ppapi-flash-version", "32.0.0.465");

let window;

const createWindow = () => {
	if (window != null) return;

	window = new BrowserWindow({
		width: 1280 + 128,
		height: 720,
		webPreferences: {
			plugins: true,
			nodeIntegration: false
		},
		autoHideMenuBar: true,
		icon: nativeImage.createFromPath(path.resolve(__dirname, "favicon.ico"))
	});
	window.loadURL("https://mobcpop.com");
};

app.on("ready", createWindow);

app.on("activate", () => {
	if (window == null) {
		createWindow();
	} else {
		window.show();
	}
});

app.on("window-all-closed", function () {
	app.quit();
});
