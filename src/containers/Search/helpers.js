export const handleSearchResults = data => (data ? formatSearchResults(data.statuses) : {});

const formatSearchResults = (data) => {
  const resultsItems = [];

  data.map((element) => {
    resultsItems.push({
      date: element.created_at || undefined,
      content: element.text || undefined,
      retweetCount: element.retweet_count || undefined,
      likesCount: element.favorite_count || undefined,
      author: element.user ? element.user.name : undefined,
    });
  });

  return resultsItems;
};
