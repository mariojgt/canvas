<x-canvas::layout.main>

    <div class="bg-gray-800 pt-3">
        <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
            <h3 class="font-bold pl-2">Analytics</h3>
        </div>
    </div>

    <div class="flex flex-row flex-wrap flex-grow mt-2">

        <div class="w-full">
            <!--Graph Card-->
            <div class="bg-white border-transparent rounded-lg shadow-xl">
                <div class="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                    <h5 class="font-bold uppercase text-gray-600">Model Creator</h5>
                </div>
                <div class="p-5">
                    {{-- Create model  --}}
                    <x-canvas::form.form action="{{ route('model-flow.store') }}" method="post" >
                        <x-canvas::form.text name="name" label="name" />
                        <x-canvas::form.submit name="create" />
                    </x-canvas::form.form>


                    {{-- Model table --}}
                    <table class="rounded-t-lg m-5 w-5/6 mx-auto text-gray-100 bg-gradient-to-l from-indigo-500 to-indigo-800">
                        <tbody><tr class="text-left border-b-2 border-indigo-300">
                          <th class="px-4 py-3">Model</th>
                          <th class="px-4 py-3"> </th>
                        </tr>
                        @foreach ($flow as $item)
                            <tr class="border-b border-indigo-400">
                            <td class="px-4 py-3">{{ $item->name }}</td>
                            <td class="px-4 py-3">
                                <div class="w-full text-center mx-auto">
                                    <a href="{{ route('model-flow.edit', $item->id) }}" class="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline">
                                      Edit
                                    </a>
                                </div>
                            </td>
                            </tr>
                        @endforeach

                      </tbody></table>
                </div>
            </div>
            <!--/Graph Card-->
        </div>
    </div>
</x-canvas::layout.main>
