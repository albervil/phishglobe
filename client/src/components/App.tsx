import * as React from "react"
import { PhishList } from "./PhishList";

export interface AppProps { }
export interface AppState {
    phishlist: Array<any>
}

export class App extends React.Component<AppProps, AppState> {
    constructor() {
        super();
        this.state = {
            phishlist: []
        };
    }

    public componentDidMount(): void {
        this.getPhishes();
    }

    private getPhishes(): void {
        // fetch('/api')
        //     .then(res => res.json())
        //     .then(phishes => this.setState({phishlist: phishes}));
        this.setState(
            {
                phishlist: [
                    { phish_id: 1, url: 'http://fakeurl.com' },
                    { phish_id: 2, url: 'http://irobyou.com' },
                    { phish_id: 3, url: 'http://secretscam.com' },
                ] 
            }
        )
    }

    public render() {
        return <PhishList phishlist={this.state.phishlist} />
    }
}