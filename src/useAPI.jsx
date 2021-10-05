import { useState, useEffect, useMemo } from 'react'

function useAPI(url) {
    const [episodeData, setEpisodeData] = useState(null)
    const [numberOfSeasons, setNumberOfSeasons] = useState(0)
    const [isEpisodeDataLoaded, setIsEpisodeDataLoaded] = useState(false)

    useEffect(() => {
        if (url == "https://api.tvmaze.com/shows/-1/episodes") {
            setEpisodeData(null);
            setNumberOfSeasons(0);
            setIsEpisodeDataLoaded(false);
            return
        }
        else {
            fetch(url)
                .then(resp => resp.json())
                .then((data) => {
                    let episodeData = {};

                    data.forEach(episode => {
                        episodeData[episode.id.toString()] = episode;
                    });
                    setEpisodeData(episodeData);

                    if(data && data.length && data[data.length-1].season){
                        setNumberOfSeasons(data[data.length-1].season);
                    }
                    setIsEpisodeDataLoaded(true);
                })
        }


    }, [url]);

    return {
        episodeData,
        numberOfSeasons,
        isEpisodeDataLoaded,
    }
}

export default useAPI;