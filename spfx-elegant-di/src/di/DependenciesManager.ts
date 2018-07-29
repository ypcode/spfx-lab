import { ServiceScope, ServiceKey } from '../../node_modules/@microsoft/sp-core-library';

interface IDepReference {
    obj: any;
    property: string;
    serviceKey: ServiceKey<any>;
}

export class DependenciesManager {
    private serviceScope: ServiceScope;
    private references: IDepReference[] = [];

	public configure(
		rootServiceScope: ServiceScope,
		serviceScopeConfiguration: (rootServiceScope: ServiceScope) => Promise<ServiceScope>
	): Promise<any> {
		return new Promise((resolve, reject) => {
			serviceScopeConfiguration(rootServiceScope)
				.then((usedScope) => {
					console.log('DependenciesManager configured serviceScope: ', usedScope);
                    this.serviceScope = usedScope;
                    this.serviceScope.whenFinished(() => {
                        // Inject all the already known dependency references
                        this.references.forEach(r => {
                            r.obj[r.property] = this.serviceScope.consume(r.serviceKey);
                        });
                        this.references = [];
                    });
					resolve();
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	public inject<TService>(target:any, property:string, serviceKey: ServiceKey<TService>): void {
		if (this.serviceScope) {
			target[property] =  this.serviceScope.consume(serviceKey);
		} else {
            this.references.push({
                obj: target,
                property: property,
                serviceKey: serviceKey
            });
		}
	}
}

const Dependencies: DependenciesManager = new DependenciesManager();
export default Dependencies;

export const inject = (service: ServiceKey<any>) => {
	return (target: any, propertyKey: string): void => {
		Dependencies.inject(target, propertyKey, service);
	};
};
