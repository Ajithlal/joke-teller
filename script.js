const audioElement = document.getElementById('audio');
const button = document.getElementById('button');
//Disable/Enable button
 function toggleButton() {
     button.disabled = !button.disabled;
 }
 function tellMe(joke) {
    VoiceRSS.speech({
        key: '51469ffabc69461eb870b8c0efff9cd5',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
 }

// Get joke from joke api
async function getJoke() {
    let joke = '';
    const apiurl = 'https://sv443.net/jokeapi/v2/joke/Dark';
    try {
        const repsonse = await fetch(apiurl);
        const data = await repsonse.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-speech
        tellMe(joke);
        toggleButton();
    }catch(error) {
        // Catch errors
        console.log('whoops', error);
    }

    return joke;
}
button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);