var ChampionInfoPartial = function(championInfo, champImgUrl) {
    return (
        <div className="champion-info">
            <div className="championHeader">
                <h1 className="champion-info-name">
                    {championInfo.name}
                </h1>
                <img alt={championInfo.name} className="champion-info-img material-shadow" key={championInfo.name}
                         src={champImgUrl}></img>
                <br />
                <h2 className="champion-info-subtitle">
                    {championInfo.title}
                </h2>
            </div>
        </div>
    );
};
 
 var ChampionInfo = React.createClass({
    componentWillMount: function() {
        this.setState({
           championInfo: {}
        });
        
        var champUrl = "https://ddragon.leagueoflegends.com/cdn/" +
                       this.props.version +
                       "/data/en_US/champion/" + this.props.champKey + ".json";

        $.get(champUrl, function (response) {
            this.setState({
                championInfo: response.data[this.props.champKey]
            });
        }.bind(this));
    },

    render: function() {
        if (this.state && this.state.championInfo) {
            $("#back-to-champ-list").show();
            $("#back-to-champ-list").click(function () {
                ReactDOM.render(
                    <Champions />,
                    document.getElementById("content")
                );
            });

            return (
                ChampionInfoPartial(this.state.championInfo, this.props.champImgUrl)
            );
        }
        else {
            return (
                <div>Champion info could not be found.</div>
            );
        }
    },
    propTypes: {
        champKey: React.PropTypes.string,
        version: React.PropTypes.string,
        champImgUrl: React.PropTypes.string
    }
});

var Champions = React.createClass({
    componentWillMount : function() {
      this.setState({
            championInfo: {}
        });
        
        $.get("/championlist", function (response) {
            this.setState({
                championList: response
            });
        }.bind(this));
    },

    handleClick: function(championKey, version, champImgUrl) {
        ReactDOM.render(
            <ChampionInfo champKey={championKey} version={version} champImgUrl={champImgUrl}/>,
            document.getElementById("content")
        );
    },

    render: function() {
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
            var champImgUrl = "https://ddragon.leagueoflegends.com/cdn/" +
                            latestVersion +
                            "/img/champion/" + champKey + ".png";
            return (
                <div className="champion-picture-wrapper" key={champKey + "-wrapper"}>
                    <img alt={champKey} className="champion-square material-shadow" key={champKey}
                         onClick={this.handleClick.bind(this, champKey, latestVersion, champImgUrl)}
                         src={champImgUrl}></img>
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
});

ReactDOM.render(
    <Champions />,
    document.getElementById("content")
);