import * as React from "react";
import { PhishList } from "./PhishList";
import { PhishMap } from "./PhishMap";
import * as moment from "moment";
import { orderBy } from "lodash";

export interface AppProps { }
export interface AppState {
    time: string;
    phishlist: Array<any>
}

export class App extends React.Component<AppProps, AppState> {
    constructor() {
        super();
        this.state = {
            time: '',
            phishlist: []
        };
    }

    public componentDidMount(): void {
        this.getPhishes();

        setInterval(() => {
            console.log("Calling API");
            this.getPhishes();
        }, 60000)
    }

    private getPhishes(): void {
        fetch('/api')
            .then(res => res.json())
            .then(phishes => this.setState(
                {
                    time: moment().format('HH:mm'),
                    phishlist: orderBy(phishes, ['submission_time'], ['desc']) 
                })
            );
    }

    public render() {
        return (
            <div className="app col col-md-12">
                <div className="map col col-md-9">
                    <div className="header">
                        <h1 className="clock">{this.state.time}</h1>
                    </div>
                    <PhishMap phishlist={this.state.phishlist} />
                </div>
                <div className="list col col-md-3">
                    <PhishList phishlist={this.state.phishlist} />
                </div>
            </div>
        )
        // return (
        //     <div className="app col col-md12">
        //         <PhishMap phishlist={this.state.phishlist} />
        //     </div>
        // )
    }
}