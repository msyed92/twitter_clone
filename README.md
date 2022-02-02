# Twitter Clone
The goal of this project is to create a Twitter clone with basical functionality. So far I have created:
* sign-in
* sign-out
* home page with a "timeline" of tweets (this is only the tweets of everyone you follow in chronological order)
* submitting a tweet
* following/unfollowing a user
* liking a tweet
* retweeting

Currently working on:
* implementing an "edit" button

Currenty, Twitter does not have an edit button. I wanted to make a (simple) clone that had this feature. At first I thought about solving the problem with having "edit versions", but since Twitter is a microblogging platform, it seemed clumsy. Since I am studying machine learning (ML) and natural language processing (NLP), I am researching NLP techniques that can be used to determine if two pieces of text are semantically similar. The edit button will allow a user to edit a tweet, if the original and edited version meet a certain thershold for semantic similarity, then the edit will be allowed to pass through.

Next I plan on including:
* commenting on a tweet
* getting notifications

This project was created with Node.js to interact with the database (Postgres) and Svelte/kit on the front end to interact with the Node.js server. I plan on developing the ML/NLP model in Python.
