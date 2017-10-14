import * as React from "react"
import { Phish } from "./Phish";

export interface PhishListProps {
    phishlist: Array<any>
}

export class PhishList extends React.Component<PhishListProps, any> {
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