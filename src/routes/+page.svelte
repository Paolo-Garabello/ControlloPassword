<script>
    let brute = $state();
    let dictionary = $state();
    let pwd = $state();

async function check() {
    const response = await fetch('/', {
        method: "POST",
        body: JSON.stringify({pwd:pwd})
    });
    let res = await response.json();
    brute = res.brute;
    dictionary = res.dictionary;
}
</script>

<main>
    <section>
        <h1>Password Security Verifier</h1>
        <p>Questo tool server per calcolare la forza della password inserita contro attacchi di tipo
            BruteForce e Dictionary
        </p>
        <label>
            Password
            <input name="pwd" type="password" bind:value={pwd}>
            <button onclick={check}>Check Password</button>
        </label>

        {#if brute != undefined}
        <article>
            BruteForce<br>
            tempo impiegato per craccare: {brute} anni
            <div class="bar {brute >= 100 ? "green" : brute >= 10 ? "yellow" : "red"}">password {brute >= 100 ? "molto forte" : brute >= 10 ? "forte" : "debole"}</div>
        </article>

        <article>
            Dictionary attack<br>
            ricorrenze nel dizionario: {dictionary}
            <div class="bar {dictionary == 0 ? "green" : dictionary < 5 ? "yellow" : "red"}">password {dictionary == 0 ? "molto forte" : dictionary < 5 ? "forte" : "debole"}</div>
        </article>
        {/if}
    </section>
</main>


<style lang="scss">
    main {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    section {
        background-color: azure;
        width: 40vw;
        height: 60vh;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    p {
        max-width: 80%;
    }
    .bar {
        width: 25vw;
        height: 3vh;
        border: 2px solid black;
        border-radius: 20px;
        align-items: center;
        justify-content: center;
        display: flex;
    }
    .green {
        background-color: green;
    }

    .yellow {
        background-color: yellow;
    }

    .red {
        background-color: red;
    }
    input {
        height: 3vh;
        border-radius: 5px;
        font-size: large;
    }
    button {
        background-color: white;
        height: 3vh;
        border-radius: 5px;
    }
</style>