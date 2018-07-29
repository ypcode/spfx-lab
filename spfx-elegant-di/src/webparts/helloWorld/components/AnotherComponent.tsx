import * as React from 'react';
import { IGreetingsService, GreetingsServiceKey } from '../../../services/GreetingsService';
import { inject } from '../../../di/DependenciesManager';

export default class AnotherComponent extends React.Component<{}, {}> {
	@inject(GreetingsServiceKey) public greetingsService: IGreetingsService;

	public render(): React.ReactElement<{}> {
		let hello = this.greetingsService.sayHello('Yannick');
	
		return (
			<div>
				<h1>From another component</h1>
				{hello}
			</div>
		);
	}
}
