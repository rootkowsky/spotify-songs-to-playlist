export class Router {

	protected app;
	protected routePath;
	protected config;
	protected routes;

	constructor(routePath:string, app, config) {
		if (!app)
			throw new Error("Missing required App");

		this.app = app;
		this.routePath = routePath;
		this.config = config;
		this.routes = [];
		this.registerServices();
	}

	get services() {
		return {};
	}

	private registerServices() {
		var router_services = this.services;
		Object.keys(router_services).forEach(full_path => {
			var service_function = router_services[full_path];
			var path_items = full_path.split(' ');
			var verb = (path_items.length > 1 ? path_items[0] : 'get').toLowerCase();
			var path = this.routePath + (path_items.length > 1 ? path_items[1] : full_path);
			this.app[verb](path, this[service_function].bind(this));
		});
	}

}
