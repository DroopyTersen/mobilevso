var SETTINGS_KEY = "mobilevso-settings";
var cache = window.localStorage;

export function getSettings() {
	var settings = cache.getItem(SETTINGS_KEY);
	if (!settings) {
		settings = {
			"host": "skyline.visualstudio.com",
			projectHistory: {},
			project: { name: "" }
		}
	} else {
		settings = JSON.parse(settings);
	}
	ensureProject(settings);
	console.log(settings);
	return settings;
}

var ensureProject = function(settings) {
	var project = settings.project;
	//If project is invalid  check history for a host match
	if (!project || !project.name || !project.host || project.host !== settings.host) {
		settings.project = { name: "" };
		if (settings.projectHistory[settings.host]) {
			settings.project = settings.projectHistory[settings.host];
		}
	}
};

export function updateSettings(updates) {
	var settings = getSettings();
	var updatedSettings = Object.assign({}, settings, updates);
	cache.setItem(SETTINGS_KEY, JSON.stringify(updatedSettings));
	return getSettings();
}

export function updateProject(project) {
	var settings = getSettings();
	project.host = settings.host;

	// store it in history
	var projectHistory = settings.projectHistory;
	projectHistory[settings.host] = project;

	updateSettings({ project, projectHistory });
	return getSettings();
}