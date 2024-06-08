import { useState, useEffect } from 'react'

function useAPI(url) {
    const [episodeData, setEpisodeData] = useState(null)
    const [loadedURL, setLoadedURL] = useState("")

    useEffect(() => {
        if (url === "https://api.tvmaze.com/shows/-1/episodes") {
            setEpisodeData(null);
            setLoadedURL("");
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
                    setLoadedURL(url); // Set the loadedURL to match the url
                })
        }

    }, [url]);

    return {
        episodeData,
        loadedURL,
    }
}

export default useAPI;