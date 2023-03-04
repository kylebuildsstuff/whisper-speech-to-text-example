<script lang="ts">
  import { onMount } from 'svelte';

  let files;

  $: {
    console.log('files: ', files);
  }
  // onMount(async () => {
  //   await handleTranscription();
  // });

  // const handleTranscription = async () => {
  //   const response = await fetch('/api/transcription', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ files })
  //   }).then((res) => res.json());

  //   console.log('response: ', response);

  //   return response;
  // };

  const handleTranscription = async () => {
    const formData = new FormData();
    formData.append('file', files[0]);

    const response = await fetch('/api/transcription', {
      method: 'POST',
      body: formData
    }).then((res) => res.json());

    console.log('response: ', response);

    return response;
  };
</script>

<input type="file" bind:files />

<button type="submit" on:click={handleTranscription}>Submit</button>
