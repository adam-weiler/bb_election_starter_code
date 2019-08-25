document.addEventListener("DOMContentLoaded", function() {
    const url = "https://bb-election-api.herokuapp.com/";  // This endpoint is now working.
    // const url = 'https://eric-deploy-test.herokuapp.com/bb';  // Eric's API endpoint.
    const request = axios.get(url);
    const allCandidatesList = document.querySelector('#all_candidates');

    request.then((response) => {
        console.log('-- Received response.');

        redrawPage(response.data);

        const refreshPage = document.getElementById('refresh_page');
        // console.log(refreshPage);

        refreshPage.addEventListener('click', e => {  // The user is clicking on Refresh.
            e.preventDefault();

            const request = axios.get(url);
            request.then((response) => {
                console.log('-- Refreshing the page.');
                redrawPage(response.data);
            })
            .catch((error) => {
                console.log('-- Refresh error.');
            });
        });
    })
    .catch((error) => {
        console.log('-- Loading error.');
        console.log(error);

        let dataElem = document.createElement('li');
        dataElem.innerHTML = `${error}<br/>So sorry for the inconvenience!`;

        allCandidatesList.appendChild(dataElem);
    })
    .then(() => {
        console.log('-- Request is over regardless if it worked or not.');
        console.log('Hey, the request finished!');
    });

    function redrawPage(ourCandidates) {
        // console.log(ourCandidates);
        allCandidatesList.innerHTML = '';

        ourCandidates['candidates'].forEach((element) => {
            console.log(element);

            let dataElem = document.createElement('li');
            dataElem.innerHTML = `${element.name} got ${element.votes} votes - ${element.id}.
            <form id="${element.id}" method="POST" action="https://bb-election-api.herokuapp.com/vote?id=">
                <input type="hidden" name="id" value="${element.id}">
                <input type="submit" value="Vote!" />
            </form>`;

            allCandidatesList.append(dataElem);

            dataElem.addEventListener('submit', e => {  // The user is clicking on Vote.
                e.preventDefault();
                let form = e.target
                // console.log('Voting', e.target, form, form.id, form.id.value, form.votes.value);
                // let candidate_id = form.querySelector('input[type=hidden]').value;

                axios.post(form.action, {
                    id: form.id.value,
                    // id: form.querySelector('input[type=hidden]').value,
                })
                .then((response) => {
                    console.log('-- Voting success.');
                    console.log(response.status);
                })
                .catch((error) => {
                    console.log('-- Voting error.');
                    console.log(error);
                })
            })
        });
    };
});