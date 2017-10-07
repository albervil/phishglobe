import * as React from "react"
import { PhishList } from "./PhishList";
import { PhishMap } from "./PhishMap";

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
        fetch('/api')
            .then(res => res.json())
            .then(phishes => this.setState({phishlist: phishes}));
    }

    public render() {
        return (
            <div className="app col col-md-12">
                <div className="col col-md-9">
                    <PhishMap phishlist={this.state.phishlist} />
                </div>
                <div className="col col-md-3">
                    <PhishList phishlist={this.state.phishlist} />
                </div>
            </div>
        )
    }
}