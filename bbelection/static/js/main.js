document.addEventListener("DOMContentLoaded", function() {
    // const url = "https://bb-election-api.herokuapp.com/";  // This endpoint is not working.
    const url = 'https://eric-deploy-test.herokuapp.com/bb';  // Eric's API endpoint.
    const request = axios.get(url);
    const allCandidatesList = document.querySelector('#all_candidates');

    request.then((response) => {
        // console.log('-- Received response.');

        ourCandidates = response.data
        // console.log(ourCandidates);

        // ourResponse = {
        //   "candidates": [
        //     {
        //       "id": "577805c3e30089e66c1ede16",
        //       "name": "Spongebob",
        //       "votes": 2
        //     },
        //     {
        //       "id": "577805c3e30089e66c1ede18",
        //       "name": "Squidward",
        //       "votes": 1
        //     },
        //     {
        //       "id": "577805c3e30089e66c1ede19",
        //       "name": "Sandy",
        //       "votes": 0
        //     },
        //     {
        //       "id": "577805c3e30089e66c1ede17",
        //       "name": "Patrick",
        //       "votes": 0
        //     },
        //     {
        //       "id": "577805c3e30089e66c1ede1a",
        //       "name": "Gary",
        //       "votes": 1
        //     }
        //   ]
        // }

        ourCandidates['candidates'].forEach((element) => {
            // console.log(element);

            let dataElem = document.createElement('li');
            dataElem.innerHTML = `${element.name} got ${element.votes} votes.`;

            allCandidatesList.append(dataElem);
        });
    })
    .catch((error) => {
        // console.log('-- Received error.');
        // console.log(error);

        let dataElem = document.createElement('li');
        dataElem.innerHTML = `${error}<br/>So sorry for the inconvenience!`;

        allCandidatesList.appendChild(dataElem);
    })
    .then(() => {
        // console.log('-- Request is over regardless if it worked or not.');
        // console.log('Hey, the request finished!');
    })
});
