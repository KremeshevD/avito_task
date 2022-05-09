
export const whatNew = (newPost, prevPost) => {
    const lastId = prevPost[0]
    const index = newPost.indexOf(lastId)
    let different = []
    if(index) {
        different = newPost.slice(0, index)
    }    
    return different
}

export const fetchingPostDetail = (postsId) => {
    try {
        const result = Promise.all(postsId.map(
            async  (postId) => {
              let post = await fetch(`https://hacker-news.firebaseio.com/v0/item/${postId}.json`)
              if(!post.ok) {
                throw new Error('Severe error!')
                }
              post = await post.json()
              return post
            })) 
          return result       
    } catch (error) {
        return error.message
    }   
}

export const loadKids = async (kidsList, all) => {
  let result = await fetchingPostDetail(kidsList)
  result = await Promise.all(result.map( async item => {
    const newItem = {...item}
    if (item.kids && all){
      newItem.kids = await loadKids(item.kids, all)
    }
    return newItem
  }))
  result = result.filter((item)=> !item.deleted && !item.dead)
  return result
}