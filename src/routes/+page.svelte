<script lang="ts">
  import { onMount } from 'svelte';

  onMount(async () => {
    await handleTranscription();
  });

  const handleTranscription = async () => {
    const response = await fetch('/api/transcription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    }).then((res) => res.json());

    console.log('response: ', response);

    return response;
  };
</script>

hello motto
