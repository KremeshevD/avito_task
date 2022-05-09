const api = {
    getNewsList: async() => {
        const responce = await fetch('https://hacker-news.firebaseio.com//v0/newstories.json')
        const data = await responce.json();
        return data
    },
    getNewsDetails: async(id) => {
        const responce = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        const data = await responce.json();
        return data
     },
    getComment: async(id) => {
        const responce = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        const data = await responce.json();
        return data
    }
}

export default api