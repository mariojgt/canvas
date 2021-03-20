<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $title ?? 'Todo Manager' }}</title>
    <link href="{{ asset('vendor/Canvas/css/app.css') }}" rel="stylesheet">
    @stack('css')
</head>
<body class="bg-gray-800 font-sans leading-normal tracking-normal mt-12" >
    <x-canvas::layout.navbar />

    <x-canvas::layout.flash />
    <div id="app" class="flex flex-col md:flex-row">
        <x-canvas::layout.sidebar />
        <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">

            {{ $slot }}
        </div>
    </div>
    <script src="{{ asset('vendor/Canvas/js/main.js') }}"></script>
    <script src="{{ asset('vendor/Canvas/js/app.js') }}"></script>
    <script>
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
            });
    </script>
    @stack('js')
</body>
</html>
