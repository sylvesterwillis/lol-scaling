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

            var championNodes = _.map(this.state.championList.champs, function (champion) {
                var champUrl = "http://ddragon.leagueoflegends.com/cdn/" +
                                latestVersion +
                                "/img/champion/" + champion.key + ".png";
                return <img className="champ-square" src={champUrl}></img>;
            });

            if (championNodes.length) {
                content = championNodes;
            }

            return <div>{content}</div>;
        }
    });

    React.render(
        <Champions />,
        document.getElementById("content")
    );
}());
