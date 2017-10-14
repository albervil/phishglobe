import * as React from "react"
import { Phish } from "./Phish";

export interface PhishListProps {
    phishlist: Array<any>;
    onItemHover: Function;
    onItemMouseOut: Function;
}

export class PhishList extends React.Component<PhishListProps, any> {
    constructor(props: PhishListProps) {
        super(props);
    }

    public render() {
        let phishes = this.props.phishlist.map(function (phish) {
            return (
                <table>
                    <tr>
                        <td>{phish.url}</td>
                    </tr>
                </table>
            )
        })

        let that = this;

        return (
            <div className="phishlist">
                <table className="table table-striped table-hover">
                    <thead>
                        <th>Phishing Attacks</th>
                    </thead>
                    <tbody>
                    {
                        this.props.phishlist.map(function (phish) {
                            return (
                                <tr><td>
                                    <Phish id={phish.phish_id}
                                        time={phish.submission_time}
                                        url={phish.url}
                                        target={phish.target}
                                        country={phish.country}
                                        onHover={that.props.onItemHover}
                                        onMouseOut={that.props.onItemMouseOut}
                                    />
                                </td></tr>
                            );
                        })
                    }
                    </tbody>
                </table>    
            </div>
        )
    }
}