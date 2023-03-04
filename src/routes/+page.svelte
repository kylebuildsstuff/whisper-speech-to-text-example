<script lang="ts">
  let isLoading;

  let files;
  let transcribedText = '';

  $: fileName = files && files[0] && files[0].name;

  const handleTranscription = async () => {
    isLoading = true;

    const formData = new FormData();
    formData.append('file', files[0]);

    const response = await fetch('/api/transcription', {
      method: 'POST',
      body: formData
    }).then((res) => res.json());

    transcribedText =
      response?.transcribedText || 'Transcription could not be completed';

    isLoading = false;
    return response;
  };
</script>

<div class="grid grid-cols-1 items-start gap-4 pt-5">
  <!-- Upload -->
  <div class="mt-2 col-span-1 sm:mt-0">
    <div
      class="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"
    >
      <div class="space-y-1 text-center">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div class="flex justify-center text-sm text-gray-600">
          <label
            for="file-upload"
            class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            <span>Upload a file</span>
            <input
              bind:files
              id="file-upload"
              name="file-upload"
              type="file"
              class="sr-only"
            />
          </label>
        </div>
        <p class="text-xs text-gray-500">
          mp3, mp4, mpeg, mpga, m4a, wav, and webm up to 25MB
        </p>
      </div>
    </div>
  </div>

  <span class="text-gray-500">
    {fileName ? fileName : 'No file found'}
  </span>

  <!-- Transcribe -->
  {#if isLoading}
    <button
      on:click={handleTranscription}
      disabled
      class="w-1/2 opacity-50 rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >Transcribing...</button
    >
  {:else}
    <button
      on:click={handleTranscription}
      type="submit"
      class="w-1/2 rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >Transcribe</button
    >
  {/if}
</div>

<!-- Text -->
<section class="mt-5">{transcribedText}</section>
