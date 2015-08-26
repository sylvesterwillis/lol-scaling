import {ChampionInfo} from "./championInfo";

export class Champions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            championInfo: {}
        };
    }

    componentDidMount() {
        $.get("/championlist", function (response) {
            this.setState({
                championList: response
            });
        }.bind(this));
    }

    handleClick(championKey, version) {
        React.render(
            <ChampionInfo champKey={championKey} version={version}/>,
            document.getElementById("content")
        );
    }

    render() {
        if (!this.state.championList) {
            return false;
        }

        $("#back-to-champ-list").hide();

        var content = (
            <span>
                There was an error retrieving the list of champions.
            </span>
        );

        var latestVersion = this.state.championList.version;
        var sortedChampKeys = _.sortBy(_.keys(this.state.championList.champs));

        var championNodes = sortedChampKeys.map(function (champKey) {
            var champUrl = "http://ddragon.leagueoflegends.com/cdn/" +
                            latestVersion +
                            "/img/champion/" + champKey + ".png";
            return (
                <div className="champion-picture-wrapper" key={champKey + "-wrapper"}>
                    <img alt={champKey} className="champion-square material-shadow" key={champKey}
                         onClick={this.handleClick.bind(this, champKey, latestVersion)}
                         src={champUrl}></img>
                    <span className="champion-picture-name" key={champKey + "-name"}>
                        {this.state.championList.champs[champKey].name}
                    </span>
                </div>
            );
        }.bind(this));

        if (championNodes.length) {
            content = (
                <div>
                    <h1 className="champ-select-header">Select a champion:</h1>
                    <div>{championNodes}</div>
                </div>
            );
        }

        return content;
    }
}

Champions.displayName = "Champions";

React.render(
    <Champions />,
    document.getElementById("content")
);
