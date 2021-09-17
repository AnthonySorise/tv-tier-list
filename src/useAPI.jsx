import {useState, useEffect, useMemo} from 'react'

function useAPI(url){
    const [episodeData, setEpisodeData] = useState(null)
    const [isEpisodeDataLoaded, setIsEpisodeDataLoaded] = useState(false)

    useEffect(() =>{
        fetch(url)
            .then(resp => resp.json())
            .then((d) =>{
                setEpisodeData(d);
                setIsEpisodeDataLoaded(true);
            })
    }, [url]);

    return {
        episodeData,
        isEpisodeDataLoaded,
    }
}

export default useAPI;