/*eslint no-unused-vars:0*/
import {Champions} from "./championList";

export class ChampionInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            championInfo: {}
        };
    }

    componentDidMount() {
        var champUrl = "http://ddragon.leagueoflegends.com/cdn/" +
                       this.props.version +
                       "/data/en_US/champion/" + this.props.champKey + ".json";

        $.get(champUrl, function (response) {
            this.setState({
                championInfo: response.data[this.props.champKey]
            });
        }.bind(this));
    }

    render() {
        if (this.state && this.state.championInfo) {
            $("#back-to-champ-list").show();
            $("#back-to-champ-list").click(function () {
                React.render(
                    <Champions />,
                    document.getElementById("content")
                );
            });

            return (
                <div className="champion-info">
                    <h1 className="champion-info-name">
                        {this.state.championInfo.name}: {this.state.championInfo.title}
                    </h1>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
}

ChampionInfo.displayName = "ChampionInfo";

ChampionInfo.propTypes = {
    champKey: React.PropTypes.string,
    version: React.PropTypes.string
};
