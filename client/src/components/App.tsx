import * as React from "react";
import { PhishList } from "./PhishList";
import { PhishMap } from "./PhishMap";
import * as moment from "moment";
import { orderBy, isEmpty, find, filter } from "lodash";

export interface AppProps { }
export interface AppState {
    time: string;
    phishlist: Array<any>;
    countryFilter: string;
    targetFilter: string;
    showInMap: Array<any>;
    hoveredItem: boolean;
}

export class App extends React.Component<AppProps, AppState> {
    constructor() {
        super();
        this.state = {
            time: '',
            phishlist: [],
            countryFilter: '',
            targetFilter: '',
            showInMap: [],
            hoveredItem: false
        };

        this.onListItemHover = this.onListItemHover.bind(this);
        this.onListItemMouseOut = this.onListItemMouseOut.bind(this);
        this.onListCountryClick = this.onListCountryClick.bind(this);
        this.onListTargetClick = this.onListTargetClick.bind(this);
        this.filterPhishList = this.filterPhishList.bind(this);
    }

    public componentDidMount(): void {
        this.getPhishes();

        setInterval(() => {
            console.log("Calling API");
            this.getPhishes();
        }, 60000)
    }

    public onListItemHover(item_id: number): void {
        this.setState({
            showInMap: [find(this.state.phishlist, { "phish_id": item_id })],
            hoveredItem: true
        })
    }

    public onListItemMouseOut(item_id: number): void {
        this.setState({
            showInMap: this.filterPhishList(),
            hoveredItem: false
        })
    }

    public onListCountryClick(country: string): void {
        this.setState({
            countryFilter: country
        })        
    }

    public onListTargetClick(target: string): void {
        this.setState({
            targetFilter: target
        })        
    }

    public filterPhishList(): Array<Object> {
        let filteredPhishList = this.state.phishlist;
        let country = this.state.countryFilter;
        let target = this.state.targetFilter;

        if (this.state.countryFilter !== '') {
            filteredPhishList = filter(filteredPhishList, { "country": this.state.countryFilter })
        }
        
        if (this.state.targetFilter !== '') {
            filteredPhishList = filter(filteredPhishList, { "target": this.state.targetFilter })
        }
        
        return filteredPhishList;
    }

    private getPhishes(): void {
        fetch('/api')
            .then(res => res.json())
            .then(phishes => {
                let filteredPhishList = phishes;
                
                if (this.state.countryFilter !== '') {
                    filteredPhishList = filter(filteredPhishList, { "country": this.state.countryFilter })
                }
                
                if (this.state.targetFilter !== '') {
                    filteredPhishList = filter(filteredPhishList, { "target": this.state.targetFilter })
                }

                this.setState(
                    {
                        time: moment().format('HH:mm'),
                        phishlist: orderBy(phishes, ['submission_time'], ['desc']),
                        showInMap: this.state.hoveredItem ? this.state.showInMap : filteredPhishList
                    })
                }
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
                    <PhishList phishlist={this.filterPhishList()}
                        onItemHover={this.onListItemHover}
                        onItemMouseOut={this.onListItemMouseOut}
                        onItemCountryClick={this.onListCountryClick}
                        onItemTargetClick={this.onListTargetClick}
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