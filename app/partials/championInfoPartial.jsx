export function championContainer(championInfo) {
    return (
        <div className="champion-info">
            <div className="championHeader">
                <h1 className="champion-info-name">
                    {championInfo.name}
                </h1>
                <br />
                <h2 className="champion-info-subtitle">
                    {championInfo.title}
                </h2>
            </div>
        </div>

    );
}
