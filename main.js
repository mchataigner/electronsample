const { app, BrowserView, BrowserWindow } = require('electron')

function createWindow () {
	const win = new BrowserWindow({
		width: 1200,
		height: 800,
		minWidth: 800,
		minHeight: 500,
		useContentSize: true
	})

	const view = new BrowserView()
	const margin = 150
	win.setBrowserView(view)
	view.setBounds({ x: 0, y: margin, width: 1200, height: 800 - margin })
	view.webContents.loadURL('https://electronjs.org')
	
	win.on('resize', () => {
		const { width, height } = win.getContentBounds()
		view.setBounds({x:0, y:margin, width: width, height: height - margin})
	})
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})
