(function () {
    "use strict";

    var Champions = React.createClass({
        displayName: "Champions",

        getInitialState: function () {
            return {
                championList: []
            };
        },

        componentDidMount: function () {
            $.get("/championlist", function (response) {
                if (this.isMounted()) {
                    this.setState({
                        championList: response
                    });
                }
            }.bind(this));
        },

        render: function () {
            var content = (
                        <span>
                            There was an error retriving the list of champions.
                        </span>
            );


            var latestVersion = this.state.championList.version;
            var sortedChampKeys = _.sortBy(_.keys(this.state.championList.champs));

            var championNodes = _.map(sortedChampKeys, function (champKey) {
                var champUrl = "http://ddragon.leagueoflegends.com/cdn/" +
                                latestVersion +
                                "/img/champion/" + champKey + ".png";
                return (
                    <img alt={champKey} className="champ-square" src={champUrl}></img>
                );
            });

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
    });

    React.render(
        <Champions />,
        document.getElementById("content")
    );
}());
