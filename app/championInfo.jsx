/*eslint no-unused-vars:0*/
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
            return (
                <div>
                    <h1>
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
