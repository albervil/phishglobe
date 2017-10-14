import * as React from "react"

export interface PhishProps {
    id: number;
    time: string;
    url: string;
    target: string;
    country: string;
}

export class Phish extends React.Component<PhishProps, any> {
    public render() {
        return (
            <div className="phish">
                <span className="phish_time">{this.props.time}</span><br />
                <span className="phish_url"><small><a href={this.props.url}>{this.props.url}</a></small></span><br />
                <span className="target"><small><strong>{this.props.target}</strong></small></span>
                <span className="country"><small><strong>{this.props.country}</strong></small></span>
            </div>
        )
    }
}