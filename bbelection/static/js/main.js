document.addEventListener("DOMContentLoaded", function() {
    const url = "https://bb-election-api.herokuapp.com/";  // This endpoint is now working.
    // const url = 'https://eric-deploy-test.herokuapp.com/bb';  // Eric's API endpoint.
    const request = axios.get(url);
    const allCandidatesList = document.querySelector('#all_candidates');

    request.then((response) => {
        console.log('-- Received response.');

        ourCandidates = response.data
        console.log(ourCandidates);

        ourCandidates['candidates'].forEach((element) => {
            console.log(element);

            let dataElem = document.createElement('li');
            dataElem.innerHTML = `${element.name} got ${element.votes} votes - ${element.id}.
            <form method="POST" action="https://bb-election-api.herokuapp.com/vote?id=">
                <input type="hidden" name="id" value="${element.id}">    
                <input type="submit" />
            </form>`;

            allCandidatesList.append(dataElem);
        });
    })
    .catch((error) => {
        console.log('-- Received error.');
        console.log(error);

        let dataElem = document.createElement('li');
        dataElem.innerHTML = `${error}<br/>So sorry for the inconvenience!`;

        allCandidatesList.appendChild(dataElem);
    })
    .then(() => {
        console.log('-- Request is over regardless if it worked or not.');
        console.log('Hey, the request finished!');
    })
});
