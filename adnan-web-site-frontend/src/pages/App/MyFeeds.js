import React, { useEffect, useContext, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import MyProfile from "../../components/MyProfile";
import FeedCard from "../../components/FeedCard";

import { AppContext } from "../../context/applicationContext";
import LoadingIndicator from "../../components/LoadingIndicator";

import { getMyFeedsApi } from "../../util/ApiUtil";

const MyFeeds = () => {
  //Here we declare state variables
  const appContext = useContext(AppContext);
  const token = appContext.getSession(); // get the token from cookies
  const userData = appContext.getUserData();

  const [feedsData, setFeedsData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); // holds the current page number (first page of feeds)
  const [hasMore, setHasMore] = useState(true);
  

  useEffect(() => {
    document.title = "My Feeds | Feed App";
    getMyFeeds(0);
  }, []);
  // Define the funciton that retrieves the feeds for the user
  // we have a similar function in the Dashboard.js component
  
  const getMyFeeds = async (loadPageNumber) => {
    if (loadPageNumber === 0) {
      setFeedsData([]);
    }

    const apiResponse = await getMyFeedsApi(token, loadPageNumber);
    if (apiResponse.status === 1) {
      let feedsDataNew = [];
      //it has more pages to load
      if (loadPageNumber !== 0) {
        // we store exsting data inte the feedsDataNew
        feedsDataNew = feedsData;
      }
      feedsDataNew.push(...apiResponse.payLoad.content); // we are the retreivin the new feeds and then pushing it into the
      setFeedsData(feedsDataNew); // we are uodating the state here

      setPageNumber(loadPageNumber + 1);

      if (loadPageNumber === apiResponse.payLoad.totalPages) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  };

  if (!userData) {
    return <LoadingIndicator />;
  }

  // Rendering the JSX
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-12 mx-0 md:mx-12 w-2xl container px-2 mx-auto">
      {/* {#MyProfile Component} */}
      <MyProfile />
      <article>
        {/* {#FeedCard Component} */}
        <InfiniteScroll
          dataLength={feedsData.length}
          next={() => getMyFeeds(pageNumber)}
          hasMore={hasMore}
          endMessage={
            <p className="text-center">
              <b>Yay! You have seen it all.</b>
            </p>
          }
          refreshFunction={() => getMyFeeds(0)}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 className="text-center">&#8595; Pull down to refresh</h3>
          }
          releaseToRefreshContent={
            <h3 className="text-center">&#8593; Release to refresh</h3>
          }
        >
          <div className="mt-3">
            {feedsData.map(
              ({ feedId, picture, content, createdOn, feedMetaData, user }) => (
                <FeedCard
                  key={feedId}
                  feedId={feedId}
                  picture={picture}
                  content={content}
                  createdOn={createdOn}
                  username={user.username}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  profilePicture={user.profile.picture}
                  feedMetaData={feedMetaData}
                  loadOnDelete={getMyFeeds}
                />
              )
            )}
          </div>
        </InfiniteScroll>
      </article>
    </main>
  );
};

export default MyFeeds;
