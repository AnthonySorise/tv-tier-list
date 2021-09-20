import { useState, useEffect, useMemo } from 'react'

function useAPI(url) {
    const [episodeData, setEpisodeData] = useState(null)
    const [isEpisodeDataLoaded, setIsEpisodeDataLoaded] = useState(false)

    useEffect(() => {
        if (url == -1) {
            setEpisodeData(null);
            setIsEpisodeDataLoaded(false);
            return
        }
        else{
            fetch(url)
            .then(resp => resp.json())
            .then((data) => {
                let episodeData = {};
                data.forEach(episode => {
                    episodeData[episode.id.toString()] = episode;
                });
                setEpisodeData(episodeData);
                setIsEpisodeDataLoaded(true);
            })
        }


    }, [url]);

    return {
        episodeData,
        isEpisodeDataLoaded,
    }
}

export default useAPI;