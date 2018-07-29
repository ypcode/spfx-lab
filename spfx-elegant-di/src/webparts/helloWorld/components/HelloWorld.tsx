import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IGreetingsService, GreetingsServiceKey } from '../../../services/GreetingsService';
import { inject } from '../../../di/DependenciesManager';
import AnotherComponent from './AnotherComponent';

export interface IHelloWorldState {
	newComponent: boolean;
}

export default class HelloWorld extends React.Component<IHelloWorldProps, IHelloWorldState> {
	constructor(props: IHelloWorldProps) {
		super(props);
		this.state = {
			newComponent: false
		};
  }
  
  @inject(GreetingsServiceKey) private greetingsService: IGreetingsService;

	public render(): React.ReactElement<IHelloWorldProps> {
		let hello = this.greetingsService.sayHello('Yannick');
		let bgColor = this.greetingsService.getBackgroundColor();

		return (
			<div className={styles.helloWorld}>
				<div className={styles.container}>
					<div className={styles.row}>
						<div className={styles.column}>
							<span className={styles.title}>Welcome to Dependency Injection!</span>
							<p style={{ 'backgroundColor': bgColor }} className={styles.subTitle}>
								Result from service: {hello}.
							</p>
							<DefaultButton onClick={() => this._onNewComponentRequested()} />
              {this.state.newComponent && <AnotherComponent />}
						</div>
					</div>
				</div>
			</div>
		);
  }
  
  
  private _onNewComponentRequested() {
    this.setState({
      newComponent: true
    });
  }
}
