import {ChampionInfo} from "./championInfo";

    class Champions extends React.Component {
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
                    <img alt={champKey} className="champ-square" key={champKey}
                         onClick={this.handleClick.bind(this, champKey, latestVersion)}
                         src={champUrl}></img>
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
