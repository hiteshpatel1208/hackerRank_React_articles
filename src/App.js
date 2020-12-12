import React, { useEffect, useState } from 'react';
import './App.css';
import 'h8k-components';

import Articles from './components/Articles';

const title = "Sorting Articles";

function App({articles}) {

    const [sortedArticles, setSortedArticles] = useState(articles);
    const [mounted, setMounted] = useState(false);

    const sortByMostUpvoted = () => {
        let sortedList = [];
        Object.assign(sortedList, sortedArticles);
        sortedList.sort((a,b) => {
            if(a.upvotes > b.upvotes) {
                return -1;
            }
            if(a.upvotes < b.upvotes) {
                return 1;
            }
            return 0;
        });
        setSortedArticles(sortedList);
    }

    const sortByMostRecent = () => {
        let sortedList = [];
        Object.assign(sortedList, sortedArticles);
        sortedList.sort((a,b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if(dateA > dateB) {
                return -1;
            }
            if(dateA < dateB) {
                return 1;
            }
            return 0;
        });
        setSortedArticles(sortedList);
    }

    if(!mounted) {
        articles.sort((a,b) => {
            if(a.upvotes > b.upvotes) {
                return -1;
            }
            if(a.upvotes < b.upvotes) {
                return 1;
            }
            return 0;
        });
    }

    useEffect(() => {
        setMounted(true);
    },[])

    return (
        <div className="App">
            <h8k-navbar header={title}></h8k-navbar>
            <div className="layout-row align-items-center justify-content-center my-20 navigation">
                <label className="form-hint mb-0 text-uppercase font-weight-light">Sort By</label>
                <button data-testid="most-upvoted-link" onClick={() => sortByMostUpvoted()} className="small">Most Upvoted</button>
                <button data-testid="most-recent-link" onClick={() => sortByMostRecent()} className="small">Most Recent</button>
            </div>
            <Articles articles={sortedArticles}/>
        </div>
    );

}

export default App;
