<script lang="ts">
  let files;

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
