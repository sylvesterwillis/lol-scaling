/*eslint no-unused-vars:0*/
var ChampionInfo = (function () {
    "use strict";

    return React.createClass({
        displayName: "ChampionInfo",

        propTypes: {
            champKey: React.PropTypes.string,
            version: React.PropTypes.string
        },

        getInitialState: function () {
            return {
                championInfo: {}
            };
        },

        componentDidMount: function () {
        var champUrl = "http://ddragon.leagueoflegends.com/cdn/" +
                       this.props.version +
                       "/data/en_US/champion/" + this.props.champKey + ".json";

            $.get(champUrl, function (response) {
                if (this.isMounted()) {
                    this.setState({
                        championInfo: response.data[this.props.champKey]
                    });
                }
            }.bind(this));
        },

        render: function() {
            if (this.state.championInfo) {
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
    });
})();

module.exports = ChampionInfo;
