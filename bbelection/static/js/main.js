document.addEventListener("DOMContentLoaded", function() {
    // const proxyurl = "https://bb-election-api.herokuapp.com/";
    // const url = "https://example.com";

    // const url = 'https://bb-election-api.herokuapp.com/';
    // const url = 'http://bitmaker-monsters-api.herokuapp.com';


    const allCandidatesList = document.querySelector('#all_candidates');

    const url = 'https://eric-deploy-test.herokuapp.com/bb';




    // const request = axios.get(proxyurl + url);
    const request = axios.get(url);

    request.then((response) => {
        console.log('-- Received response.');

        ourCandidates = response.data
        console.log(ourCandidates);

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


        
  
        // const dataElem = document.createElement('span');
        // // dataElem.innerHTML = response.data;
        // dataElem.innerHTML = ourResponse
        // document.querySelector('#returnedData').appendChild(dataElem)
  
        // // console.log(typeof(ourResponse));

        ourCandidates['candidates'].forEach((element) => {
          console.log(element);

          let dataElem = document.createElement('li');
          dataElem.innerHTML = `${element.name} got ${element.votes} votes.`;

          allCandidatesList.append(dataElem);


        });

        // monsterDataElem.innerHTML = '';
  
        // monsterDataElem.appendChild(dataElem);
      })

});
