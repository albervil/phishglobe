import * as React from "react"

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
                {phishes}
            </div>
        )
    }
}