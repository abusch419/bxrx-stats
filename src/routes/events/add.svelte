<script>
  import { DateInput } from 'date-picker-svelte'
  let date = new Date()
  import { setlistPlaceholder } from '../../helpers/setlistPlaceholder.js'
  import { addEvent, getFirstSetString } from "../../stores/eventStore.js"

  async function onSubmit(e) {
    const formData = new FormData(e.target);

    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    console.log(data)
    // await addEvent(data)
    const firstSet = getFirstSetString(data.setlist.toLowerCase(), 'set 1: ', ' set 2:')
    console.log(firstSet)
  }
</script>

<div class="bg-white">
  <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">

      <form on:submit|preventDefault={onSubmit} class="space-y-8 divide-y divide-gray-200">
        <div class="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">Add an event</h3>
            </div>

            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-4">
                <label for="date" class="block text-sm font-medium text-gray-700"> Date </label>
                <div class="flex">
                  <DateInput bind:value={date} format={"yyyy-MM-dd"} />
                  <svg style="margin-left: -40px; z-index: 5;" class="h-8 w-8 text-gray-400" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0
                      00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <div class="sm:col-span-4">
                <label for="venue" class="block text-sm font-medium text-gray-700"> Venue </label>
                <div class="mt-1">
                  <input type="text" name="venue" id="venue"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                </div>
              </div>

              <div class="sm:col-span-4">
                <label for="city" class="block text-sm font-medium text-gray-700"> City </label>
                <div class="mt-1">
                  <input type="text" name="city" id="state"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                </div>
              </div>

              <div class="sm:col-span-4">
                <label for="state" class="block text-sm font-medium text-gray-700"> State </label>
                <div class="mt-1">
                  <input type="text" name="state" id="state" placeholder="Use GA for Georgia"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                </div>
              </div>

              <div class="sm:col-span-6">
                <label for="setlist" class="block text-sm font-medium text-gray-700"> Setlist </label>
                <div class="mt-1">
                  <textarea id="setlist" name="setlist" rows="3" placeholder={setlistPlaceholder}
                    style="min-height: 400px;"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"></textarea>
                </div>
                <p class="mt-2 text-sm text-gray-500">Paste or write the setlist here</p>
              </div>

            </div>
          </div>
        </div>

        <div class="pt-5">
          <div class="flex justify-end">
            <button type="button"
              class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
            <button type="submit"
              class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
          </div>
        </div>

      </form>

    </div>
  </div>
</div>