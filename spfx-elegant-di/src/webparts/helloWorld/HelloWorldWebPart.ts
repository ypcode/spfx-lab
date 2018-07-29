import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
	BaseClientSideWebPart,
	IPropertyPaneConfiguration,
	PropertyPaneTextField,
	PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';

import * as strings from 'HelloWorldWebPartStrings';
import HelloWorld from './components/HelloWorld';
import { IHelloWorldProps } from './components/IHelloWorldProps';
import Dependencies from '../../di/DependenciesManager';
import { GreetingsServiceKey } from '../../../lib/services/GreetingsService';
import { AltGreetingsService } from '../../services/AltGreetingsService';

export interface IHelloWorldWebPartProps {
	description: string;
	config: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {
	public onInit(): Promise<any> {
		console.log('ON INIT');
		return (
			super
				.onInit()
				// Set the global configuration of the application
				// This is where we will define the proper services according to the context (Local, Test, Prod,...)
				// or according to specific settings
				.then(() => {
					return Dependencies.configure(this.context.serviceScope, (rootServiceScope) => {
						return new Promise((resolve, reject) => {
							let usedScope = rootServiceScope;
							if (this.properties.config) {
								switch (this.properties.config) {
									case 'config2':
										let childScope = rootServiceScope.startNewChild();
										childScope.createAndProvide(GreetingsServiceKey, AltGreetingsService);
										childScope.finish();
										usedScope = childScope;
										break;
									case 'config1':
									default:
										break;
								}
							}

							usedScope.whenFinished(() => {
								resolve(usedScope);
							});
						});
					});
				})
		);
	}

	public render(): void {
		const element: React.ReactElement<IHelloWorldProps> = React.createElement(HelloWorld, {
			description: this.properties.description
		});

		ReactDom.render(element, this.domElement);
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse('1.0');
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription
					},
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField('description', {
									label: strings.DescriptionFieldLabel
								}),
								PropertyPaneDropdown('config', {
									label: 'Configuration',
									options: [
										{
											key: 'config1',
											text: 'Config 1'
										},
										{ key: 'config2', text: 'Config 2' }
									]
								})
							]
						}
					]
				}
			]
		};
	}
}
