import * as React from "react";
import { PhishList } from "./PhishList";
import { PhishMap } from "./PhishMap";
import * as moment from "moment";
import { orderBy, isEmpty, find } from "lodash";

export interface AppProps { }
export interface AppState {
    time: string;
    phishlist: Array<any>;
    showInMap: Array<any>;
}

export class App extends React.Component<AppProps, AppState> {
    constructor() {
        super();
        this.state = {
            time: '',
            phishlist: [],
            showInMap: []
        };

        this.onListItemHover = this.onListItemHover.bind(this);
        this.onListItemMouseOut = this.onListItemMouseOut.bind(this);
    }

    public componentDidMount(): void {
        this.getPhishes();

        setInterval(() => {
            console.log("Calling API");
            this.getPhishes();
        }, 60000)
    }

    public onListItemHover(item_id: number): void {
        this.setState(
            { showInMap: [find(this.state.phishlist, { "phish_id": item_id })] }
        )
    }

    public onListItemMouseOut(item_id: number): void {
        this.setState(
            { showInMap: this.state.phishlist }
        )
    }

    private getPhishes(): void {
        fetch('/api')
            .then(res => res.json())
            .then(phishes => this.setState(
                {
                    time: moment().format('HH:mm'),
                    phishlist: orderBy(phishes, ['submission_time'], ['desc']),
                    showInMap: (isEmpty(this.state.showInMap) ? phishes : this.state.showInMap)
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
                    <PhishMap phishlist={this.state.showInMap} />
                </div>
                <div className="list col col-md-3">
                    <PhishList phishlist={this.state.phishlist}
                        onItemHover={this.onListItemHover}
                        onItemMouseOut={this.onListItemMouseOut}
                    />
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