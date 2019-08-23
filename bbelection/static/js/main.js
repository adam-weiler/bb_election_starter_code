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
            <form id="${element.id}" method="POST" action="https://bb-election-api.herokuapp.com/vote?id=">
                <input type="hidden" name="id" value="${element.id}">
                <input type="submit" value="Vote!" />
            </form>`;

            //<input type="hidden" name="votes" value="${element.votes}">

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


            // handleFormSubmit();
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


    // function handleFormSubmit(id) {
    //     console.log('handleFormSubmit')
    //     // console.log(`${e} e`)

    //     let form = document.getElementById(id);
    //     console.log(form);

    //     form.addEventListener('submit', e => {
    //         e.preventDefault();
    //         console.log('Voting');
    //     })

    // }
});
